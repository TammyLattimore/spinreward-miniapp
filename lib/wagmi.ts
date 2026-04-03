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
    injected({
      target: {
        id: "okxWallet",
        name: "OKX Wallet",
        provider(window) {
          const w = window as Window & {
            okxwallet?: { ethereum?: unknown } & Record<string, unknown>;
            ethereum?: {
              isOkxWallet?: boolean;
              isOKExWallet?: boolean;
              providers?: Array<{ isOkxWallet?: boolean; isOKExWallet?: boolean }>;
            };
          };

          if (w.okxwallet?.ethereum) return w.okxwallet.ethereum;
          if (w.okxwallet) return w.okxwallet;

          const ethereum = w.ethereum;
          if (!ethereum) return undefined;
          if (ethereum.isOkxWallet || ethereum.isOKExWallet) return ethereum;
          if (Array.isArray(ethereum.providers)) {
            return ethereum.providers.find(
              (p: { isOkxWallet?: boolean; isOKExWallet?: boolean }) =>
                p?.isOkxWallet || p?.isOKExWallet,
            );
          }
          return undefined;
        },
      },
    }),
    coinbaseWallet({
      appName: "SpinReward",
    }),
    injected(),
  ],
  multiInjectedProviderDiscovery: true,
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
