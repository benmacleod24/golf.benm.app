import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface HandicapContainerProps {}

/**
 * @description Container for the handicap report.
 * @return {React.FC<HandicapContainer>}
 */
const HandicapContainer: React.FC<
	React.PropsWithChildren<HandicapContainerProps>
> = (props) => {
	const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
	return (
		<Flex
			border="1px solid"
			borderColor={borderColor}
			rounded={"lg"}
			overflow={"hidden"}
			flexDir={"column"}
		>
			{props.children}
		</Flex>
	);
};

export default HandicapContainer;
