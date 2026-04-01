import { coinbaseWallet, injected } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { Attribution } from "ox/erc8021";

export const BUILDER_CODE = "bc_2f3f0bxv";
export const ENCODED_DATA_SUFFIX =
  "0x62635f32663366306278760b0080218021802180218021802180218021";

const generatedDataSuffix = Attribution.toDataSuffix({
  codes: [BUILDER_CODE],
});

export const DATA_SUFFIX =
  generatedDataSuffix === ENCODED_DATA_SUFFIX
    ? ENCODED_DATA_SUFFIX
    : generatedDataSuffix;

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
