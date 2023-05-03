import React, { useState, useEffect } from "react";
import { Container, Handicap } from "~/client/components";

interface HandicapPageProps {}

/**
 * @description Handicap report page.
 * @return {React.FC<HandicapPage>}
 */
const HandicapPage: React.FC<HandicapPageProps> = (props) => {
	return (
		<Container.Main>
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
		</Container.Main>
	);
};

export default HandicapPage;
