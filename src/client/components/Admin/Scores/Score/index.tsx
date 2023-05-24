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
			w="full"
			p="3"
			border="1px solid"
			borderColor={"whiteAlpha.200"}
			rounded={"lg"}
			dropShadow={"base"}
			bg="whiteAlpha.50"
			flexDir="column"
			pos="relative"
		>
			<Text>
				<Text as="span" fontWeight={"semibold"} color="brand.700">
					Date:{" "}
				</Text>{" "}
				<Text as="span" color="gray.300" ml="1" fontSize={"sm"}>
					{dayjs(props.score.date).format("MM/DD/YYYY")}
				</Text>
			</Text>
			<Grid templateColumns={"repeat(2, 1fr)"}>
				<Text>
					<Text as="span" fontWeight={"semibold"} color="gray.500">
						Golfer:
					</Text>{" "}
					<Text as="span" color="gray.300" ml="1" fontSize={"sm"}>
						{props.score.teamMember.firstName} {props.score.teamMember.lastName}
					</Text>
				</Text>
				<Text>
					<Text as="span" fontWeight={"semibold"} color="gray.500">
						Score:{" "}
					</Text>{" "}
					<Text as="span" color="gray.300" ml="1" fontSize={"sm"}>
						{props.score.score}
					</Text>
				</Text>
			</Grid>
			<Menu>
				<MenuButton
					pos="absolute"
					top="2"
					right="2"
					as={IconButton}
					icon={<FiMoreVertical />}
					variant={"ghost"}
					rounded={"full"}
				/>
				<MenuList>
					<MenuItem icon={<MdEditNote />}>Edit Score</MenuItem>
					<MenuItem icon={<MdDelete />} color="red.300">
						Delete Score
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default ScoreContainer;
