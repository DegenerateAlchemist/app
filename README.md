# Whales of Wallstreet (WOW) - Marketing Site

The frontend marketing presence and client-side simulation workspace for the Whales of Wallstreet ecosystem. It contains interactive tools designed to demonstrate the pathfinding capabilities and Stellar anchor onboarding workflows of the **Wow Engine**.

## Features & Modules

### 1. Interactive Quoting Engine Calculator
Located at `#calculator`, this widget communicates directly with the local running instance of the Wow Engine (`http://127.0.0.1:8080/api/v1/quote`) to calculate pathfinding routes across Solana, Stellar, Arbitrum, and Ethereum.
- Toggles between native Circle CCTP routes (1:1 conversions) and deBridge DLN channels (0.1% protocol fee).
- Renders results sorted dynamically by maximum output followed by lowest fee.

### 2. Stellar Anchor Flow Simulator
Located at `#anchors`, this widget acts as a client dashboard simulating SEP-24 deposits (on-ramps) and withdrawals (off-ramps) with interactive callback handlers.
- Initiates transaction records on the Rust backend state tracker.
- Pulls transactional sessions to trigger anchor interactive customer verification links.

## Local Setup

### Installation
```bash
npm install
```

### Running Dev Server
```bash
npm run dev
```

### Running Unit Tests
```bash
npm run test
```
