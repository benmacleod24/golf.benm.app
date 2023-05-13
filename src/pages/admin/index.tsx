import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
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
	const { query } = useRouter();
	const tab = query.tab as string;
	return (
		<Container.Main title="Admin Portal | RGL">
			<Flex w="full">
				<Admin.Menu />
				<Flex w="full" maxW="75%" bg="red">
					{tab}
				</Flex>
			</Flex>
		</Container.Main>
	);
};

export default NatePage;
