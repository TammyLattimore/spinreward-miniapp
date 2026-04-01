import { coinbaseWallet, injected } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { Attribution } from "ox/erc8021";

// BUILDER_CODE_PLACEHOLDER: replace with your real Builder Code before production launch.
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["BUILDER_CODE_PLACEHOLDER"],
});

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "SpinReward",
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
