"use client";

import { useAccount, useReadContract } from "wagmi";

import { spinRewardContract } from "@/lib/contracts";

export function usePoints() {
  const { address, isConnected } = useAccount();

  const query = useReadContract({
    ...spinRewardContract,
    functionName: "getPoints",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isConnected),
    },
  });

  const points = query.data ? Number(query.data) : 0;

  return {
    address,
    points,
    isConnected,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
