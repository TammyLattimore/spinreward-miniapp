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

  const okxConnector = connectors.find(
    (item) =>
      item.id.toLowerCase().includes("okx") || item.name.toLowerCase().includes("okx"),
  );
  const coinbaseConnector = connectors.find((item) =>
    item.id.toLowerCase().includes("coinbase"),
  );
  const injectedConnector = connectors.find(
    (item) =>
      item.id === "injected" &&
      !(item.id.toLowerCase().includes("okx") || item.name.toLowerCase().includes("okx")),
  );

  return (
    <div className="wallet-group wallet-group-3">
      <button
        type="button"
        className="wallet-btn okx"
        disabled={!okxConnector || isPending}
        onClick={() => okxConnector && connect({ connector: okxConnector })}
      >
        {isPending ? "Connecting..." : "Connect OKX"}
      </button>
      <button
        type="button"
        className="wallet-btn alt"
        disabled={!coinbaseConnector || isPending}
        onClick={() => coinbaseConnector && connect({ connector: coinbaseConnector })}
      >
        Coinbase Wallet
      </button>
      <button
        type="button"
        className="wallet-btn"
        disabled={!injectedConnector || isPending}
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      >
        {isPending ? "Connecting..." : "Connect Injected"}
      </button>
    </div>
  );
}
