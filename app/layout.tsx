import type { ReactNode } from "react";

import { Providers } from "@/app/providers";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ccdb381aacdcc17b25517f" />
        <meta
          name="talentapp:project_verification"
          content="b36ba5c0fb7ad3f2ac775069396d62cbf1a43d3c85db9130b010f72cea6696bc016e73cef4e2b5b4fbe14cfe836a3a12d2be5c9564853b72d9ae45b6cef00205"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>SpinReward</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
