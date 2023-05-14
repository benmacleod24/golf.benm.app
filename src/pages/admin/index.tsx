import { Box, Button, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Container } from "~/client/components";
import { Admin } from "~/client/components/Admin";

interface NatePageProps {}

/**
 * @description
 * @return {React.FC<NatePage>}
 */
const NatePage: React.FC<NatePageProps> = (props) => {
	const { query, push } = useRouter();
	const tab = query.tab as string;

	useEffect(() => {
		if (!tab) push("/admin?tab=scores");
	}, [query, tab]);

	return (
		<Container.Main title="Admin Portal | RGL">
			<Flex flexDir={"column"} h="full">
				<Flex w="full">
					<Admin.Menu />

					<Flex w="full" maxW="75%">
						{tab === "scores" && <Admin.Scores />}
					</Flex>
				</Flex>
			</Flex>
		</Container.Main>
	);
};

export default NatePage;
