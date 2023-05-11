import {
	Flex,
	useColorModeValue,
	Text,
	TextProps,
	Accordion,
	AccordionItem,
	AccordionButton,
	Box,
	AccordionIcon,
	AccordionPanel,
	HStack,
	Stat,
	StatLabel,
	StatNumber,
	Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AsyncReturnType } from "~/pages/hndcp";
import { generateLeaderboard } from "~/server/db/generateLeaderboard";
import { BsTrophyFill } from "react-icons/bs";

interface TeamRankingProps {
	data: AsyncReturnType<typeof generateLeaderboard>[0];
	pos: number;
}

/**
 * @description Team Ranking Component
 * @return {React.FC<TeamRanking>}
 */
const TeamRanking: React.FC<TeamRankingProps> = (props) => {
	const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

	const getFontColor = (): TextProps => {
		switch (props.pos) {
			case 1:
				return {
					color: "gold",
				};
			case 2:
				return {
					bg: "linear-gradient(to right, #4D4D4D 0%, #D8D8D8 32%, #FFFFFF 52%, #D8D8D8 72%, #4D4D4D 100%);",
					backgroundClip: "text",
				};
			default:
				return {
					color: "gray.400",
				};
		}
	};

	return (
		<Accordion allowMultiple w="full">
			<AccordionItem
				w={"full"}
				border="1px solid"
				borderColor={borderColor}
				rounded={"lg"}
				overflow={"auto"}
			>
				{({ isExpanded }) => {
					return (
						<>
							{" "}
							<AccordionButton w="full" p="0" pr="4">
								<Flex w="full" align="center">
									<Flex
										bg="gray.900"
										w="12"
										mr="7"
										p="2"
										justify={"center"}
										align="center"
										roundedBottomRight={
											isExpanded ? "lg" : "none"
										}
										borderRight="1px solid"
										borderBottom={
											isExpanded ? "1px solid" : "none"
										}
										borderColor={borderColor}
										fontWeight={"bold"}
									>
										{props.pos === 1 ? (
											<Icon
												as={BsTrophyFill}
												color="gold"
											/>
										) : (
											<Text {...getFontColor()}>
												{props.pos}
											</Text>
										)}
									</Flex>
									<Text fontWeight={"semibold"}>
										{props.data.team.name}
									</Text>
								</Flex>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4} gap={5}>
								<HStack my="5">
									<Stat>
										<StatLabel color="blue.300">
											Player A&apos;s Points
										</StatLabel>
										<StatNumber>
											{props.data.A_B_scores.A}
										</StatNumber>
									</Stat>
									<Stat>
										<StatLabel color="blue.300">
											Player B&apos;s Points
										</StatLabel>
										<StatNumber>
											{props.data.A_B_scores.B}
										</StatNumber>
									</Stat>
									<Stat>
										<StatLabel color="whiteAlpha.600">
											Total Current Points
										</StatLabel>
										<StatNumber>
											{props.data.latestWeekTotal}
										</StatNumber>
									</Stat>
								</HStack>
								<HStack>
									<Stat>
										<StatLabel color="whiteAlpha.600">
											Prior Week Points
										</StatLabel>
										<StatNumber>
											{props.data.priorWeekTotal}
										</StatNumber>
									</Stat>
									<Stat>
										<StatLabel color="brand.700">
											Grand Total
										</StatLabel>
										<StatNumber>
											{props.data.grandTotal}
										</StatNumber>
									</Stat>
								</HStack>
							</AccordionPanel>
						</>
					);
				}}
			</AccordionItem>
		</Accordion>
	);
};

export default TeamRanking;

// <Flex
// 	w="full"
// 	border="1px solid"
// 	borderColor={borderColor}
// 	rounded={"lg"}
// 	overflow={"hidden"}
// 	align={"center"}
// 	gap={8}
// >
// 	<Flex
// 		p="2"
// 		w="12"
// 		justify={"center"}
// 		align="center"
// 		bg="gray.900"
// 		borderRight="1px solid"
// 		borderColor={borderColor}
// 	>
// 		<Text fontWeight={"bold"} color={getFontColor()}>
// 			{props.pos}
// 		</Text>
// 	</Flex>
// 	<Text>{props.data.team.name}</Text>
// </Flex>
