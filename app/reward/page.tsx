"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { BottomNav } from "@/components/BottomNav";
import { PointsBoard } from "@/components/PointsBoard";
import { RewardHeader } from "@/components/RewardHeader";
import { RewardRevealCard } from "@/components/RewardRevealCard";
import { StatusChip } from "@/components/StatusChip";
import { usePoints } from "@/hooks/usePoints";

const ALLOWED_REWARDS = new Set([10, 20, 30, 40, 50]);

function parseReward(raw: string | null) {
  if (!raw) return undefined;
  const value = Number(raw);
  if (!Number.isInteger(value)) return undefined;
  return ALLOWED_REWARDS.has(value) ? value : undefined;
}

function RewardPageContent() {
  const searchParams = useSearchParams();
  const reward = parseReward(searchParams.get("reward"));
  const tx = searchParams.get("tx") ?? undefined;
  const { points, isLoading, isConnected } = usePoints();

  return (
    <main className="app-shell">
      <div className="content-stack">
        <RewardHeader subtitle="Reward reveal from your latest spin." />
        {reward ? (
          <RewardRevealCard reward={reward} txHash={tx} />
        ) : (
          <StatusChip
            tone="warning"
            text="Missing or invalid reward query. Use /reward?reward=10|20|30|40|50"
          />
        )}
        <PointsBoard points={points} loading={isLoading} />
        {!isConnected ? (
          <StatusChip tone="neutral" text="Connect wallet on home page to load your latest total points." />
        ) : null}
        <div className="card actions">
          <Link className="action-link primary" href="/">
            Spin again
          </Link>
          <Link className="action-link" href="/">
            Back to home
          </Link>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

export default function RewardPage() {
  return (
    <Suspense fallback={<main className="app-shell">Loading reward...</main>}>
      <RewardPageContent />
    </Suspense>
  );
}
