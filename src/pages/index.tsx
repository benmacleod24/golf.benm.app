import { Flex, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
	const { data, status, update } = useSession();
	const isSessionLoaded = status === "authenticated";

	return (
		<Flex>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</Flex>
	);
};

export default Home;
