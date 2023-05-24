import { Box, Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useMemo } from "react";

import ScoresHeader from "./Header";
import ScoresSearchBar from "./SearchBar";
import { toQuery } from "~/client/helpers/toQuery";
import useSWR from "swr";
import { Response } from "~/types/response";
import { Scorecard, Team_Member } from "@prisma/client";
import ScoreContainer from "./Score";

interface ScoresTabProps {}

/**
 * @description Admin Scores Tab
 * @return {React.FC<ScoresTab>}
 */
const ScoresTab: React.FC<ScoresTabProps> = (props) => {
	const [searchFilters, setSearchFilters] = useState<Record<string, any>>({});

	const { data, isLoading } = useSWR<
		Response<
			(Scorecard & {
				teamMember: Team_Member;
			})[]
		>
	>(`/api/v1/scorecard?${toQuery(searchFilters)}`);

	return (
		<Flex w="full" flexDir={"column"}>
			<ScoresHeader />
			<ScoresSearchBar setSearchFilters={setSearchFilters} />
			<Grid templateColumns={"repeat(2, 1fr)"} gap={3} mt="5">
				{data && data.data && data.data.map((s) => <ScoreContainer key={s.id} score={s} />)}
			</Grid>
		</Flex>
	);
};

export default ScoresTab;
