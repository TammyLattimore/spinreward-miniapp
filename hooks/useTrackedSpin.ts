"use client";

import { useCallback } from "react";
import { parseEventLogs, type Hex } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";

import { spinRewardAbi } from "@/lib/abi/spinRewardAbi";
import { APP_ID, APP_NAME } from "@/lib/constants";
import { spinRewardContract } from "@/lib/contracts";
import { DATA_SUFFIX } from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";

type SpinTrackedResult = {
  txHash: Hex;
  reward?: number;
  player?: string;
};

export function useTrackedSpin() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();

  const spinTracked = useCallback(async (): Promise<SpinTrackedResult> => {
    if (!address) {
      throw new Error("Connect wallet to spin.");
    }

    const txHash = await writeContractAsync({
      ...spinRewardContract,
      functionName: "spin",
      args: [],
      dataSuffix: DATA_SUFFIX,
    });

    void trackTransaction(APP_ID, APP_NAME, address, txHash);

    let reward: number | undefined;
    let player: string | undefined;

    try {
      if (publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
        const logs = parseEventLogs({
          abi: spinRewardAbi,
          eventName: "Spinned",
          logs: receipt.logs,
          strict: false,
        });
        const matched = logs.find((log) => {
          const eventPlayer = log.args.player;
          return (
            typeof eventPlayer === "string" &&
            eventPlayer.toLowerCase() === address.toLowerCase()
          );
        });
        if (matched?.args.reward !== undefined) {
          reward = Number(matched.args.reward);
        }
        if (typeof matched?.args.player === "string") {
          player = matched.args.player;
        }
      }
    } catch {}

    return { txHash, reward, player };
  }, [address, publicClient, writeContractAsync]);

  return {
    spinTracked,
    isPending,
  };
}
