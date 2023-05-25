import { Flex, Text, Button, Icon, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import ModalContainer from "~/client/components_v2/ModalContainer";
import AddScores from "./AddScores";
import { Form } from "../../Form";

interface ScoresHeaderProps {}

/**
 * @description Header for scores tab
 * @return {React.FC<ScoresHeader>}
 */
const ScoresHeader: React.FC<ScoresHeaderProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex align="flex-end" mb="8" justify={"space-between"}>
			<Text fontSize={"2xl"} lineHeight={"none"} fontWeight={"semibold"} color="gray.400">
				Search all Scores
			</Text>
			<Button
				leftIcon={<Icon as={BiMessageSquareAdd} />}
				onClick={onOpen}
				size="sm"
				variant={"outline"}
			>
				Add Scores
			</Button>

			{/* Modal for Adding Scores */}
			<ModalContainer isOpen={isOpen} onClose={onClose}>
				<AddScores />
				<Form.Submit buttonProps={{ mt: "5" }}>Submit Scores</Form.Submit>
			</ModalContainer>
		</Flex>
	);
};

export default ScoresHeader;
