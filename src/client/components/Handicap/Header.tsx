import {
	Divider,
	Flex,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface HandicapHeaderProps {}

/**
 * @description Header for handicap component.
 * @return {React.FC<HandicapHeader>}
 */
const HandicapHeader: React.FC<
	React.PropsWithChildren<HandicapHeaderProps>
> = (props) => {
	const bg = useColorModeValue("gray.200", "gray.900");
	const dateColor = useColorModeValue("background.700", "whiteAlpha.600");

	return (
		<Flex p="3" bg={bg} w="full" align="cneter" px="5">
			<Flex>
				<Text fontWeight={"semibold"} color="brand.700">
					{props.children}
				</Text>
				<Divider
					orientation="vertical"
					mx="3"
					borderColor={dateColor}
				/>
				<Text fontWeight={"normal"} color={dateColor}>
					5/4/23
				</Text>
			</Flex>
		</Flex>
	);
};

export default HandicapHeader;
