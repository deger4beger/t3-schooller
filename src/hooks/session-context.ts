import { createContext, useContext } from "react";
import { AppRouterTypes } from "../utils/trpc";

type AuthOutput = AppRouterTypes["auth"]["signup"]["output"];

export const SessionContext = createContext<AuthOutput | null>(null);

export const useSession = () => useContext(SessionContext);
