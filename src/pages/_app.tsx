// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "../hooks/session-context";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
