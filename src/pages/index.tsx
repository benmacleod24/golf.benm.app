import { type NextPage } from "next";
import { Container } from "~/client/components";
import Announcements from "~/client/components/Announcements";

const Home: NextPage = () => {
	return (
		<Container.Main>
			<Announcements />
		</Container.Main>
	);
};

export default Home;
