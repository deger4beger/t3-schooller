// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { SessionContext } from "../hooks/session-context";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <SessionContext.Provider value={ null }>
    <Component {...pageProps} />
  </SessionContext.Provider>;
};

export default trpc.withTRPC(MyApp);
