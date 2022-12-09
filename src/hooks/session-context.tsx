import { createContext, useContext, useState } from "react";
import { AppRouterTypes } from "../utils/trpc";

type AuthOutput = AppRouterTypes["auth"]["signup"]["output"];

const SessionContext = createContext<{
	user: AuthOutput | null;
	setUser: (user: AuthOutput | null) => void;
} | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthOutput | null>(null);
	return (
		<SessionContext.Provider value={{ user, setUser }}>
			{ children }
		</SessionContext.Provider>
	)
}

export const useSession = () => useContext(SessionContext);