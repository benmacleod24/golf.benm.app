import React, { useState, useEffect } from "react";
import { Form } from "../../Form";
import { Flex, Grid, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useTeamMembers } from "~/client/hooks/useTeamMembers";
import { sortIntoMemberGroup } from "~/client/helpers/sortIntoMemberGroup";
import { BiSearchAlt } from "react-icons/bi";
import { FormikHelpers } from "formik";

interface ScoresSearchBarProps {
	setSearchFilters: (v: Record<string, any>) => void;
}

/**
 * @description Search bar for scores
 * @return {React.FC<ScoresSearchBar>}
 */
const ScoresSearchBar: React.FC<ScoresSearchBarProps> = (props) => {
	const { data, isLoading } = useTeamMembers();

	const options = React.useMemo(() => {
		if (!data || !data.data) return [];
		return sortIntoMemberGroup(data.data);
	}, [data]);

	return (
		<Form.Wrapper
			initValue={{}}
			onSubmit={async (v: Record<string, any>, h: FormikHelpers<any>) => {
				h.setSubmitting(true);

				props.setSearchFilters(v);

				h.setSubmitting(false);
			}}
		>
			{(props) => {
				const formProps = {
					values: props.values,
					setValue: props.setFieldValue,
				};

				return (
					<Flex w="full" align="flex-end" gap={5}>
						<Grid templateColumns={"repeat(3, 1fr)"} gap={5} w="full">
							<Form.SearchSelect
								name="member"
								title="Pick a Golfer"
								options={options}
								isLoading={isLoading}
								formProps={formProps}
							/>
							<Form.Input
								title="Specific Score?"
								name="score"
								formProps={formProps}
								inputProps={{
									type: "number",
									min: "0",
								}}
							/>
							<Form.Input
								title="Know the Date?"
								name="date"
								formProps={formProps}
								inputProps={{
									placeholder: "MM/DD/YYYY",
								}}
							/>
						</Grid>

						<IconButton
							aria-label="search-scores"
							bg="brand.700"
							border={"1px solid"}
							borderColor={"whiteAlpha.200"}
							_hover={{}}
							_active={{}}
							type="submit"
							icon={<Icon as={BiSearchAlt} fontSize={"xl"} />}
						/>
					</Flex>
				);
			}}
		</Form.Wrapper>
	);
};

export default ScoresSearchBar;
