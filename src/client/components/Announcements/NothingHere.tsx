import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { CgSmileSad } from "react-icons/cg";

interface NothingHereProps {}

/**
 * @description Nothing here component.
 * @return {React.FC<NothingHere>}
 */
const NothingHere: React.FC<NothingHereProps> = (props) => {
	return (
		<Flex
			flexDir={"column"}
			align={"center"}
			justify={"center"}
			color="gray.600"
			gap={1}
		>
			<Icon as={CgSmileSad} fontSize="6xl" />
			<Text fontWeight={"medium"} fontSize={"md"}>
				Nothing Here...
			</Text>
		</Flex>
	);
};

export default NothingHere;
