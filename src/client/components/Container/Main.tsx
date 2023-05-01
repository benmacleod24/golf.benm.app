import React, { useState, useEffect } from "react";
import { Container } from ".";
import Header from "../Header";
import { Flex } from "@chakra-ui/react";
import MetaTags from "../Meta";
import Head from "next/head";

interface ContainerMainProps {
	title?: string;
}

/**
 * @description The main container for the application.
 * @return {React.FC<ContainerMain>}
 */
const ContainerMain: React.FC<React.PropsWithChildren<ContainerMainProps>> = (
	props
) => {
	return (
		<Flex w="full" flexDir="column">
			<Header />
			<Container.Body title={props.title}>
				{props.children}
			</Container.Body>
		</Flex>
	);
};

export default ContainerMain;
