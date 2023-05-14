import React, { useState, useEffect } from "react";
import { Admin } from "../Admin";
import { Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import TeamRanking from "./TeamRanking";
import useSWR from "swr";
import { response } from "~/server/helpers";
import { generateLeaderboard } from "~/server/db/generateLeaderboard";
import { AsyncReturnType } from "~/pages/hndcp";

interface LeaderboardProps {}

/**
 * @description Leaderboard Root Component
 * @return {React.FC<Leaderboard>}
 */
const Leaderboard: React.FC<LeaderboardProps> = (props) => {
	const { data, isLoading } = useSWR<
		ReturnType<
			typeof response<AsyncReturnType<typeof generateLeaderboard>>
		>
	>("/api/v1/leaderboard");

	return (
		<Flex>
			<Flex
				w="full"
				justify={"center"}
				align="center"
				flexDir={"column"}
				gap={2}
			>
				{isLoading && <Spinner size="lg" color="brand.700" />}
				{data &&
					data.data &&
					data.data.map((team, index) => (
						<TeamRanking
							key={team.team.id}
							pos={index + 1}
							data={team}
						/>
					))}
			</Flex>
		</Flex>
	);
};

export default Leaderboard;
