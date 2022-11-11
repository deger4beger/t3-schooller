import { NextPage } from "next"
import PageShell from "../components/page-shell"

const Auth: NextPage = () => {
	return (
		<PageShell title="Вход">
			<div className="p-4 bg-zinc-300 rounded border flex flex-col border-zinc-700">
				<input className="m-4 h-10 bg-zinc-200 p-2 border rounded border-4 border-zinc-600" />
				<input className="m-4 h-10 bg-zinc-200 p-2 border rounded border-[1px] border-zinc-600" />
				<input className="m-4 h-10 bg-zinc-200 p-2 border rounded border-[1px] border-zinc-400" />
				<input className="m-4 h-10 bg-zinc-200 p-2 border rounded border-[1px] border-zinc-400" />
			</div>
		</PageShell>
	)
}

export default Auth