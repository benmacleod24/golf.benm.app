import { Box, Grid } from "@chakra-ui/react";
import Head from "next/head";
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
			<Head>
				<title>Nate's Section| RGL</title>
			</Head>
			<Admin.NewRound />
			<Grid
				my="8"
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
			<Grid
				my="8"
				templateColumns={[
					"repeat(1, 1fr)",
					null,
					null,
					"repeat(2, 1fr)",
				]}
				gap={[5, null, null, 14]}
			>
				<Admin.PostAnnouncement />
				<Admin.ResetPin />
			</Grid>
		</Container.Main>
	);
};

export default NatePage;
