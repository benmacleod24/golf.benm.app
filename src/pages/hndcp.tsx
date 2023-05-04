import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container, Handicap } from "~/client/components";

interface HandicapPageProps {}

/**
 * @description Handicap report page.
 * @return {React.FC<HandicapPage>}
 */
const HandicapPage: React.FC<HandicapPageProps> = (props) => {
	// const {} = useSWR("/");

	return (
		<Container.Main>
			<Flex gap={14} flexDir={"column"} pb="10">
				<Handicap.Container>
					<Handicap.Header>Flight A</Handicap.Header>
					<Handicap.Table>
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
					</Handicap.Table>
				</Handicap.Container>
				<Handicap.Container>
					<Handicap.Header>Flight B</Handicap.Header>
					<Handicap.Table>
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
						<Handicap.Player />
					</Handicap.Table>
				</Handicap.Container>
			</Flex>
		</Container.Main>
	);
};

export default HandicapPage;
