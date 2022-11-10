import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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
	const router = useRouter();

	if (
		privateRoutes
			.reduce((acc, route) => {
				acc.push(route[1]);
				return acc;
			}, [] as string[])
			.includes(router.pathname) &&
		router.pathname !== "/"
	)
		router.push("/signin");

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
						<h1
							className={
								"mr-2 cursor-pointer hover:bg-zinc-300 p-1 px-2" +
								(router.pathname === link ? " bg-zinc-300" : "")
							}
						>
							{route}
						</h1>
					</Link>
				))}
			</nav>
			<main className="min-w-max min-h-screen">
				<div className="m-auto w-7/12 pt-6 px-4">{children}</div>
			</main>
			<footer className="bg-zinc-200 p-3 text-zinc-900 text-sm flex justify-center bg-zinc-300 text-zinc-600">
				© schooller, 2022
			</footer>
		</>
	);
};

export default PageShell;
