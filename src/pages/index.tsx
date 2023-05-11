import { Grid } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { Container } from "~/client/components";
import Announcements from "~/client/components/Announcements";
import Leaderboard from "~/client/components/Leaderboard";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Riverview GL</title>
			</Head>
			<Container.Main>
				<Grid
					templateColumns={[null, null, null, "repeat(2, 1fr)"]}
					gap={8}
				>
					<Announcements />
					<Leaderboard />
				</Grid>
			</Container.Main>
		</>
	);
};

export default Home;
