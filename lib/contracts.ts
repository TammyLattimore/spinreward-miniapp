import type { Address } from "viem";

import { spinRewardAbi } from "@/lib/abi/spinRewardAbi";

export const SPIN_REWARD_CONTRACT_ADDRESS =
  "0x1d78cb4217E75D3c9BFb98b3867Be56e44e14417" as Address;

export const spinRewardContract = {
  address: SPIN_REWARD_CONTRACT_ADDRESS,
  abi: spinRewardAbi,
} as const;
