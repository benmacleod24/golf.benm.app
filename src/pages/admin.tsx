import { Box, Grid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container } from "~/client/components";
import { Admin } from "~/client/components/Admin";

interface NatePageProps {}

/**
 * @description
 * @return {React.FC<NatePage>}
 */
const NatePage: React.FC<NatePageProps> = (props) => {
	return (
		<Container.Main title="Admin Portal | RGL">
			<Grid
				mb="8"
				templateColumns={[
					"repeat(1, 1fr)",
					null,
					null,
					"repeat(2, 1fr)",
				]}
				gap={[5, null, null, 14]}
			>
				<Admin.CreatePlayer />
				<Admin.CreateTeam />
			</Grid>
			<Admin.NewRound />
		</Container.Main>
	);
};

export default NatePage;
