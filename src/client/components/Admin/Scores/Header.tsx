import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";

interface ScoresHeaderProps {}

/**
 * @description Header for scores tab
 * @return {React.FC<ScoresHeader>}
 */
const ScoresHeader: React.FC<ScoresHeaderProps> = (props) => {
	return (
		<Flex align="flex-end" mb="8" justify={"space-between"}>
			<Text
				fontSize={"2xl"}
				lineHeight={"none"}
				fontWeight={"semibold"}
				color="gray.400"
			>
				Search all Scores
			</Text>
			<Button
				leftIcon={<Icon as={BiMessageSquareAdd} />}
				size="sm"
				variant={"outline"}
			>
				Add Scores
			</Button>
		</Flex>
	);
};

export default ScoresHeader;
