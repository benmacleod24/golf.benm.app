import { Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface LabelProps {
	label: string;
	value: string;
}

/**
 * @description Label Component
 * @return {React.FC<Label>}
 */
const Label: React.FC<LabelProps> = (props) => {
	return (
		<Flex gap={1.5}>
			<Text color="gray.400" fontWeight={"semibold"}>
				{props.label}:
			</Text>
			<Text color="gray.200">{props.value}</Text>
		</Flex>
	);
};

export default Label;
