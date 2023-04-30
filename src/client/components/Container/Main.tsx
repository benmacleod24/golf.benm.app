import React, { useState, useEffect } from "react";
import { Container } from ".";
import Header from "../Header";
import { Flex } from "@chakra-ui/react";
import MetaTags from "../Meta";

interface ContainerMainProps {}

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
			<Container.Body>{props.children}</Container.Body>
		</Flex>
	);
};

export default ContainerMain;
