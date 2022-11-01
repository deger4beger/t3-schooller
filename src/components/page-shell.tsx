import Head from "next/head";
import Link from "next/link";
import { useSession } from "../hooks/session-context";
import { privateRoutes, publicRoutes } from "../utils/routes";

const PageShell = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) => {
	const session = useSession();

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={title} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<nav className="m-auto w-7/12 flex pt-10 pb-4 text-xl">
				{(!!session ? privateRoutes : publicRoutes).map(([route, link]) => (
					<Link href={link} key={route}>
						<h1 className="mr-4 cursor-pointer hover:underline">{route}</h1>
					</Link>
				))}
			</nav>
			<main className="min-w-max min-h-screen">
				<div className="m-auto w-7/12 pt-6">{children}</div>
			</main>
			<footer className="bg-zinc-200 p-3 text-zinc-900 text-sm flex justify-end pr-6">
				© here goes footer
			</footer>
		</>
	);
};

export default PageShell;
