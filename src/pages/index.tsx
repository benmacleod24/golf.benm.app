import { type NextPage } from "next";
import Head from "next/head";
import { Container } from "~/client/components";
import Announcements from "~/client/components/Announcements";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Riverview GL</title>
			</Head>
			<Container.Main>
				<Announcements />
			</Container.Main>
		</>
	);
};

export default Home;
