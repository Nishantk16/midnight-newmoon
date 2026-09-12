import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  secretNumber(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  salt(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  commitSecret(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revealSecret(context: __compactRuntime.CircuitContext<PS>, guess_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  commitSecret(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revealSecret(context: __compactRuntime.CircuitContext<PS>, guess_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  commitSecret(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  revealSecret(context: __compactRuntime.CircuitContext<PS>, guess_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  readonly commitment: Uint8Array;
  readonly isRevealed: boolean;
  readonly revealedNumber: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
