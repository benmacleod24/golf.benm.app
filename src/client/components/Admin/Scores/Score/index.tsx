import {
	Flex,
	Grid,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { Scorecard, Team_Member } from "@prisma/client";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Response } from "~/types/response";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdEditNote } from "react-icons/md";
import ScoreMenuOptions from "./Menu";
import Label from "./Label";

interface ScoreContainerProps {
	score: Scorecard & {
		teamMember: Team_Member;
	};
}

/**
 * @description Score container
 * @return {React.FC<ScoreContainer>}
 */
const ScoreContainer: React.FC<ScoreContainerProps> = (props) => {
	return (
		<Flex
			pos="relative"
			bg="whiteAlpha.50"
			border="1px solid"
			borderColor={"whiteAlpha.300"}
			rounded={"md"}
			p="1.5"
			pl="3.5"
			flexDir={"column"}
		>
			<Flex justifyContent={"space-between"} w="full" align={"center"}>
				<Flex gap={2}>
					<Text fontWeight={"semibold"} color="brand.700">
						Date:
					</Text>
					<Text color="gray.300">{dayjs(props.score.date).format("MM/DD/YYYY")}</Text>
				</Flex>
				<ScoreMenuOptions />
			</Flex>
			<Grid>
				<Label label="Score" value={`${props.score.score}`} />
				<Label
					label="Golfer"
					value={`${props.score.teamMember.firstName} ${props.score.teamMember.lastName}`}
				/>
			</Grid>
		</Flex>
	);
};

export default ScoreContainer;
