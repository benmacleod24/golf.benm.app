import { Box, Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useMemo } from "react";

import ScoresHeader from "./Header";
import ScoresSearchBar from "./SearchBar";
import { toQuery } from "~/client/helpers/toQuery";
import useSWR from "swr";

interface ScoresTabProps {}

/**
 * @description Admin Scores Tab
 * @return {React.FC<ScoresTab>}
 */
const ScoresTab: React.FC<ScoresTabProps> = (props) => {
	const [searchFilters, setSearchFilters] = useState<Record<string, any>>({});

	const { data, isLoading } = useSWR(`/api/v1/scorecard?${toQuery(searchFilters)}`);

	return (
		<Flex w="full" flexDir={"column"}>
			<ScoresHeader />
			<ScoresSearchBar setSearchFilters={setSearchFilters} />
			<pre>{data && JSON.stringify(data, null, 2)}</pre>
		</Flex>
	);
};

export default ScoresTab;
