"use client";

import { useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function formatConnectError(error: unknown) {
  if (!error) return "Wallet connection failed.";
  if (error instanceof Error) {
    const text = error.message;
    if (text.includes("User rejected")) return "Connection cancelled in wallet.";
    if (text.includes("Provider not found")) return "OKX provider not found in current browser.";
    if (text.includes("Connector not found")) return "Wallet connector is not available.";
    return text;
  }
  return "Wallet connection failed.";
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [errorText, setErrorText] = useState("");

  if (isConnected) {
    return (
      <button type="button" className="wallet-btn connected" onClick={() => disconnect()}>
        {address?.slice(0, 6)}...{address?.slice(-4)} · Disconnect
      </button>
    );
  }

  const okxConnector = connectors.find(
    (item) => item.id.toLowerCase().includes("okx") || item.name.toLowerCase().includes("okx"),
  );
  const coinbaseConnector = connectors.find((item) =>
    item.id.toLowerCase().includes("coinbase"),
  );
  const injectedConnector = connectors.find(
    (item) =>
      item.id === "injected" &&
      !(item.id.toLowerCase().includes("okx") || item.name.toLowerCase().includes("okx")),
  );

  const okxMissingHint = useMemo(
    () =>
      !okxConnector
        ? "OKX not detected. Install OKX extension or open this page in OKX Wallet dApp browser."
        : "",
    [okxConnector],
  );

  async function onConnect(target: typeof okxConnector) {
    if (!target) return;
    setErrorText("");
    try {
      await connectAsync({ connector: target });
    } catch (error) {
      setErrorText(formatConnectError(error));
    }
  }

  return (
    <div>
      <div className="wallet-group wallet-group-3">
        <button
          type="button"
          className="wallet-btn okx"
          disabled={!okxConnector || isPending}
          onClick={() => onConnect(okxConnector)}
        >
          {isPending ? "Connecting..." : "Connect OKX"}
        </button>
        <button
          type="button"
          className="wallet-btn alt"
          disabled={!coinbaseConnector || isPending}
          onClick={() => onConnect(coinbaseConnector)}
        >
          Coinbase Wallet
        </button>
        <button
          type="button"
          className="wallet-btn"
          disabled={!injectedConnector || isPending}
          onClick={() => onConnect(injectedConnector)}
        >
          {isPending ? "Connecting..." : "Connect Injected"}
        </button>
      </div>
      {okxMissingHint ? <p className="wallet-hint">{okxMissingHint}</p> : null}
      {errorText ? <p className="wallet-error">{errorText}</p> : null}
    </div>
  );
}
