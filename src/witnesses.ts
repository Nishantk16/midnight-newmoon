import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import type { Ledger } from '../contracts/managed/contract/index.js';

export type VaultPrivateState = {
  secretNumber: bigint;
  salt: Uint8Array;
};

export const createVaultPrivateState = (
  secretNumber: bigint,
  salt: Uint8Array
): VaultPrivateState => ({
  secretNumber,
  salt,
});

export const witnesses = {
  secretNumber: ({
    privateState,
  }: WitnessContext<Ledger, VaultPrivateState>): [VaultPrivateState, bigint] => [
    privateState,
    privateState.secretNumber,
  ],
  salt: ({
    privateState,
  }: WitnessContext<Ledger, VaultPrivateState>): [VaultPrivateState, Uint8Array] => [
    privateState,
    privateState.salt,
  ],
};
