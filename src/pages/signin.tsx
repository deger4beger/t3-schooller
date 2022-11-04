import { NextPage } from "next"
import Input from "../components/input"
import PageShell from "../components/page-shell"

const Auth: NextPage = () => {
	return (
		<PageShell title="Вход">
			<Input />
		</PageShell>
	)
}

export default Auth