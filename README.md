# Midnight New Moon Submission

## Level 1 – New Moon

This repository contains my Level 1 submission for the Midnight Network New Moon challenge.

## Project: Secret Vault

A simple privacy-focused Compact smart contract demonstrating a **commit-reveal scheme**:

- A user commits to a secret number by submitting a cryptographic hash of that number (combined with a private salt), without revealing the number itself.
- Later, the user can reveal the number. The contract verifies the revealed number against the stored commitment and only accepts it if it matches.
- This pattern is the building block for many privacy-preserving applications — sealed-bid auctions, hidden voting, fair random-number reveals, and more — where a value must be locked in before it is known publicly, and later proven honestly.

### Initial product idea

The commit-reveal pattern in this contract could be extended into a **sealed-bid auction platform** on Midnight: bidders commit to hidden bid amounts during a bidding window, and once the window closes, bids are revealed and verified on-chain. Because the bid amount stays private until reveal, no bidder can see or react to another's bid, which is otherwise impossible to guarantee on a fully public ledger without zero-knowledge techniques.

## Public state vs private witness

- **Public ledger state** (`commitment`, `isRevealed`, `revealedNumber`) lives on-chain and is visible to anyone. It only ever stores a hash (during commit) or a value the user has explicitly chosen to disclose (during reveal).
- **Private witnesses** (`secretNumber`, `salt`) never leave the user's own machine. They are supplied locally when a circuit runs, used inside the zero-knowledge proof, and are never transmitted or stored on-chain.
- The `disclose()` calls in the contract mark the exact points where a value deliberately crosses from private to public — this is the only way private witness data can influence public state, making every disclosure explicit and auditable in the contract source.

## Setup instructions (run locally)

### Prerequisites
- Node.js 22 (via `nvm`)
- Docker
- Compact CLI (`compact-installer.sh`)

### Compile the contract
```bash
compact compile contracts/vault.compact contracts/managed
```

### Run the test suite
```bash
npm install
npx vitest run
```

### Deploy to Preprod
See `deploy/` for the wallet funding and deployment scripts used in this attempt.

## Deployed contract

**Status: deployment attempted, not yet completed.**

The wallet was successfully funded with 1000 tNIGHT on Preprod (faucet tx confirmed), and DUST registration was submitted. However, full wallet synchronization against Preprod repeatedly took 60-90+ minutes on the available development hardware, and the final transaction submission step intermittently failed with a WebSocket disconnection from the Preprod RPC node (`disconnected from wss://rpc.preprod.midnight.network/: 1000: Normal Closure`) — a behavior that persisted across two independent implementations (a hand-rolled `@midnightntwrk/wallet-sdk` script and the official `create-mn-app` CLI tool). Preview network sync was fast (~15s) but its faucet rejected the generated address as invalid.

Given the time already invested in this attempt, deployment will be retried in a later submission window.

## Status

- [x] Toolchain installed
- [x] Contract compiled (`compact compile`)
- [x] Passing test suite
- [x] Generated `managed/` directory (circuits + keys)
- [x] Wallet funded on Preprod (1000 tNIGHT)
- [ ] Deployed to Preview/Preprod — blocked by RPC/sync issues described above
