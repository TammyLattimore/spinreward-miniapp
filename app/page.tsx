"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { BottomNav } from "@/components/BottomNav";
import { PointsBoard } from "@/components/PointsBoard";
import { RewardHeader } from "@/components/RewardHeader";
import { RewardRevealCard } from "@/components/RewardRevealCard";
import { SpinActionButton } from "@/components/SpinActionButton";
import { SpinWheelPanel } from "@/components/SpinWheelPanel";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { usePoints } from "@/hooks/usePoints";
import { useTrackedSpin } from "@/hooks/useTrackedSpin";

function shortHash(hash?: string) {
  if (!hash) return "";
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
}

function normalizeError(error: unknown) {
  if (!error) return "Spin failed. Please try again.";
  if (typeof error === "string") return error;
  if (error instanceof Error) {
    if (error.message.includes("User rejected")) {
      return "Transaction was cancelled in wallet.";
    }
    return error.message;
  }
  return "Spin failed. Please try again.";
}

export default function HomePage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { points, isLoading, refetch } = usePoints();
  const { spinTracked, isPending } = useTrackedSpin();

  const [reward, setReward] = useState<number | undefined>(undefined);
  const [txHash, setTxHash] = useState<string>("");
  const [statusText, setStatusText] = useState<string>("Connect wallet to start your free spin.");
  const [errorText, setErrorText] = useState<string>("");

  const spinDisabled = useMemo(() => !isConnected || isPending, [isConnected, isPending]);

  async function onSpin() {
    if (!isConnected) return;
    setErrorText("");
    setStatusText("Submitting spin transaction...");
    setReward(undefined);

    try {
      const result = await spinTracked();
      setTxHash(result.txHash);
      await refetch();

      if (typeof result.reward === "number") {
        setReward(result.reward);
        setStatusText(`Spin confirmed · ${shortHash(result.txHash)}`);
        router.push(`/reward?reward=${result.reward}&tx=${result.txHash}`);
      } else {
        setStatusText(`Spin submitted successfully · ${shortHash(result.txHash)}`);
      }
    } catch (error) {
      setErrorText(normalizeError(error));
      setStatusText("Spin failed.");
    }
  }

  return (
    <main className="app-shell">
      <div className="content-stack">
        <RewardHeader subtitle="Lucky capsule machine for free onchain points." />
        <WalletButton />
        <SpinWheelPanel isSpinning={isPending} />
        <SpinActionButton disabled={spinDisabled} pending={isPending} onClick={onSpin} />
        {!isConnected ? (
          <StatusChip tone="warning" text="Connect wallet to spin." />
        ) : (
          <StatusChip tone="success" text={statusText} />
        )}
        {errorText ? <StatusChip tone="error" text={errorText} /> : null}
        <PointsBoard points={points} loading={isLoading} />
        {(txHash || reward !== undefined) && (
          <RewardRevealCard
            reward={reward}
            txHash={shortHash(txHash)}
            fallbackMessage="Your onchain points have been refreshed."
          />
        )}
      </div>
      <BottomNav />
    </main>
  );
}
