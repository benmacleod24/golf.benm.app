import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface HandicapHeaderProps {}

/**
 * @description Header for handicap component.
 * @return {React.FC<HandicapHeader>}
 */
const HandicapHeader: React.FC<
	React.PropsWithChildren<HandicapHeaderProps>
> = (props) => {
	return (
		<Flex p="3" bg="gray.900" w="full" align="cneter" px="5">
			<Flex>
				<Text fontWeight={"semibold"} color="brand.700">
					{props.children}
				</Text>
				<Divider orientation="vertical" mx="3" />
				<Text fontWeight={"normal"} color="whiteAlpha.600">
					5/4/23
				</Text>
			</Flex>
		</Flex>
	);
};

export default HandicapHeader;
