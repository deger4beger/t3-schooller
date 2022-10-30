import Head from "next/head";

const PageShell = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) => {

	return (
		<>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ title } />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	      <nav>
	      	some nav here when logged in or not
	      </nav>
	      <main className="min-w-max min-h-screen bg-zinc-200 text-zinc-900">
	      	<div className="m-auto w-7/12 p-2 pt-6">
	        	{ children }
	        </div>
	      </main>
	      <footer className="bg-zinc-200 p-3 text-zinc-900 text-sm flex justify-end pr-6">
	      	© here goes footer
	      </footer>
    </>
	)
}

export default PageShell