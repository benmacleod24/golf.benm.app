import { Td, Tr, Text } from "@chakra-ui/react";
import { A_or_B, Scorecard } from "@prisma/client";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

export type Player = {
	id: number;
	firstName: string;
	lastName: string;
	teamId: number;
	A_or_B: A_or_B;
	scorecards: Scorecard[];
	totalScore: number;
	handicap: number;
};

interface HandicapPlayerProps {
	player: Player;
}

/**
 * @description Player container for handicap report.
 * @return {React.FC<HandicapPlayer>}
 */
const HandicapPlayer: React.FC<HandicapPlayerProps> = (props) => {
	return (
		<React.Fragment>
			<Tr>
				<Td
					fontWeight={"bold"}
					pos="sticky"
					left="0"
					top="0"
					bg="#232934"
				>
					{props.player.firstName} {props.player.lastName}
				</Td>
				<Td></Td>
				{props.player.scorecards.map((c) => (
					<Td isNumeric color="gray.400" key={c.id}>
						<Text fontSize={"sm"}>{c.score}</Text>
						<Text
							fontSize="sm"
							color="gray.600"
							fontStyle={"italic"}
						>
							{dayjs(c.date).format("MM/DD/YYYY")}
						</Text>
					</Td>
				))}

				<Td isNumeric color="gray.400"></Td>
				<Td isNumeric fontWeight={"bold"}>
					{props.player.totalScore}
				</Td>
				<Td isNumeric color="brand.700" fontWeight={"bold"}>
					{props.player.handicap}
				</Td>
			</Tr>
		</React.Fragment>
	);
};

export default HandicapPlayer;
