import { NextPage } from "next"
import PageShell from "../components/page-shell"
import Template from "../features/auth/template"

const Auth: NextPage = () => {
	return (
		<PageShell title="Вход">
			<Template />
		</PageShell>
	)
}

export default Auth