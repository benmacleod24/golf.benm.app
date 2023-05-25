import {
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Icon,
	IconButton,
	Switch,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { FormikHelpers, FormikProps } from "formik";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Form } from "~/client/components/Form";
import { NewScoreType } from "~/types";

interface NewScoreContainerProps {
	removeScore: () => void;
	score: NewScoreType;
	updateValue: (id: any, key: string, value: any) => void;
}

/**
 * @description New Score Container
 * @return {React.FC<NewScoreContainer>}
 */
const NewScoreContainer: React.FC<NewScoreContainerProps> = (props) => {
	const { isOpen, onToggle } = useDisclosure();

	// Color Scheme Values
	const labelColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
	const helpTextColor = useColorModeValue("blackAlpha.600", "whiteAlpha.500");

	return (
		<Flex my="2" w="full" flexDir={"column"} gap={3}>
			<Grid templateColumns={"repeat(2, 1fr)"} gap="3" w="full">
				<Form.SearchSelect name="memberId" title="Select a Golfer" formProps={{}} />
				<Form.Input
					name="roundDate"
					title="When did this happen?"
					inputProps={{ placeholder: "MM/DD/YYYY" }}
					formProps={{}}
				/>
			</Grid>
			<Flex align={"flex-end"} gap={3}>
				<Form.Input name="roundScore" title="What Did They Shoot?" formProps={{}} />
				<IconButton
					colorScheme="red"
					variant={"outline"}
					aria-label="remove-score"
					icon={<Icon as={MdDelete} />}
					onClick={props.removeScore}
				/>
			</Flex>
			<Flex flexDir={"column"} gap={3}>
				<Flex flexDir={"column"}>
					<Flex align="center" gap={3}>
						<Text color={labelColor}>Add Points?</Text>
						<Switch
							isChecked={props.score.attachPoints}
							onChange={(e) => {
								props.updateValue(
									props.score.id,
									"attachPoints",
									!props.score.attachPoints
								);
							}}
						/>
					</Flex>
					<Text color={helpTextColor} fontSize={"sm"}>
						This should be the total number of points the golfer gained this round. If
						you are using a sub player do not enter points here and enter them under the
						team tab.
					</Text>
				</Flex>
				{props.score.attachPoints && (
					<Form.Input name="roundPoints" title="How many points?" formProps={{}} />
				)}
			</Flex>
			<Divider mt="3" />
		</Flex>
	);
};

export default NewScoreContainer;
