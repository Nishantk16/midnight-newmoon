import { describe, it, expect } from 'vitest';
import {
  createConstructorContext,
  createCircuitContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger } from '../contracts/managed/contract/index.js';
import { witnesses, createVaultPrivateState } from '../src/witnesses.js';

const coinPublicKey = new Uint8Array(32);
const contractAddress = sampleContractAddress();

async function createSimulator(secretNumber: bigint, salt: Uint8Array) {
  const privateState = createVaultPrivateState(secretNumber, salt);
  const contract = new Contract(witnesses);
  const constructorCtx = createConstructorContext(privateState, coinPublicKey);
  const { currentPrivateState, currentContractState, currentZswapLocalState } =
    await contract.initialState(constructorCtx);

  const circuitContext = createCircuitContext(
    'commitSecret',
    contractAddress,
    currentZswapLocalState,
    currentContractState,
    currentPrivateState
  );

  return { contract, circuitContext };
}

describe('vault contract', () => {
  it('commits and reveals a matching secret', async () => {
    let { contract, circuitContext } = await createSimulator(42n, new Uint8Array(32).fill(7));

    ({ context: circuitContext } = await contract.impureCircuits.commitSecret(circuitContext));
    ({ context: circuitContext } = await contract.impureCircuits.revealSecret(circuitContext, 42n));

    const state = ledger(circuitContext.callContext.currentQueryContext.state);
    expect(state.isRevealed).toBe(true);
    expect(state.revealedNumber).toBe(42n);
  });

  it('rejects a non-matching guess', async () => {
    let { contract, circuitContext } = await createSimulator(42n, new Uint8Array(32).fill(7));

    ({ context: circuitContext } = await contract.impureCircuits.commitSecret(circuitContext));

    await expect(
      contract.impureCircuits.revealSecret(circuitContext, 99n)
    ).rejects.toThrow();
  });
});
