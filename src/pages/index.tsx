import type { NextPage } from "next";
import PageShell from "../components/page-shell";

const Home: NextPage = () => {

  return (
    <PageShell title="Home">
      <h1 className="text-4xl">Home</h1>
    </PageShell>
  );
};

export default Home;
