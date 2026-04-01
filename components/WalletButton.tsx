"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button type="button" className="wallet-btn connected" onClick={() => disconnect()}>
        {address?.slice(0, 6)}...{address?.slice(-4)} · Disconnect
      </button>
    );
  }

  const injectedConnector = connectors.find((item) => item.id === "injected");
  const coinbaseConnector = connectors.find((item) =>
    item.id.toLowerCase().includes("coinbase"),
  );

  return (
    <div className="wallet-group">
      <button
        type="button"
        className="wallet-btn"
        disabled={!injectedConnector || isPending}
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      >
        {isPending ? "Connecting..." : "Connect Injected"}
      </button>
      <button
        type="button"
        className="wallet-btn alt"
        disabled={!coinbaseConnector || isPending}
        onClick={() => coinbaseConnector && connect({ connector: coinbaseConnector })}
      >
        Coinbase Wallet
      </button>
    </div>
  );
}
