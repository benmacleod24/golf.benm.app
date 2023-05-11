import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRoundCard } from "~/server/db/scorecard/createRoundCard";
import { Form } from "../../Form";
import useSWR from "swr";
import { Team_Member } from "@prisma/client";
import {
	Flex,
	Grid,
	Icon,
	IconButton,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";

interface CreateNewRoundProps {}

type NewRoundFormData = z.infer<typeof createRoundCard.schema>;

/**
 * @description New round component.
 * @return {React.FC<CreateNewRound>}
 */
const CreateNewRound: React.FC<CreateNewRoundProps> = (props) => {
	const [scores, setScores] = useState<NewRoundFormData[]>([]);
	const [loading, setIsLoading] = useState<boolean>(false);
	const toast = useToast();
	const borderColor = useColorModeValue("blackAlpha.700", "whiteAlpha.400");

	const { data, isLoading } = useSWR<{ data: Team_Member[] }>(
		"/api/v1/players"
	);

	const handleChange = (key: string, value: any, pos: number) => {
		let newScores = [...scores];

		if (key === "score") {
			value = Number(value);
		}

		//@ts-ignore
		newScores[pos][key] = value;

		setScores(newScores);
	};

	const onSubmit = async () => {
		setIsLoading(true);

		const res = await fetch("/api/v1/scorecard", {
			method: "POST",
			body: JSON.stringify(scores),
		}).then((r) => r.json());

		if (res.code === "200") {
			setScores([]);
			toast({
				title: "Success!",
				status: "success",
				description: "Added Scores Successfully!",
				position: "bottom-right",
			});
		}

		setIsLoading(false);
	};

	const groupByA_or_B = useMemo(() => {
		if (!data) return [];
		return data.data.reduce(
			(prev, next) => {
				if (next.A_or_B === "A") {
					prev[0]?.options.push({
						label: next.firstName + " " + next.lastName,
						value: next.id,
					});
				}

				if (next.A_or_B === "B") {
					prev[1]?.options.push({
						label: next.firstName + " " + next.lastName,
						value: next.id,
					});
				}

				return prev;
			},
			[
				{ label: "A Players", options: [] as any },
				{ label: "B Players", options: [] as any },
			]
		);
	}, [data]);

	return (
		<Admin.Section title="New Round Score">
			<Flex w="full" flexDir={"column"} gap={5}>
				{scores.map((v, i) => (
					<Flex
						key={i}
						align={"flex-end"}
						gap={5}
						flexDir={["column", "column", "column"]}
					>
						<Grid
							w="full"
							templateColumns={[null, null, "repeat(2, 1fr)"]}
							gap={5}
						>
							<Form.SearchInput
								name="player"
								title="Select a Player"
								options={groupByA_or_B}
								isLoading={isLoading}
								onChange={(k, v) => handleChange(k, v, i)}
								rules={{ required: "This is required." }}
							/>

							<Form.Input2
								value={String(v.date)}
								onChange={(k, v) => handleChange(k, v, i)}
								placeholder="MM/DD/YYYY"
								name={"date"}
								title="When did this happen?"
							/>
						</Grid>
						<Grid
							templateColumns={[null, null, "repeat(3,1fr)"]}
							w="full"
							gap={5}
						>
							<Form.Input2
								value={String(v.score)}
								onChange={(k, v) => handleChange(k, v, i)}
								name={"score"}
								title="What was the Score?"
							/>
							<Form.Input2
								value={String(v.score)}
								onChange={(k, v) => handleChange(k, v, i)}
								name={"numOfHolesWon"}
								title="How Many Holes did they win?"
							/>
							<Form.Input2
								value={String(v.score)}
								onChange={(k, v) => handleChange(k, v, i)}
								name={"numOfOverAll"}
								title="How Many Overall Points?"
							/>
						</Grid>
						<IconButton
							aria-label="delete-score"
							variant={["ghost"]}
							// w={["full", "xs", "fit-content", "fit-content"]}
							colorScheme="red"
							onClick={() => {
								setScores(scores.filter((v, _i) => _i != i));
							}}
							icon={<Icon as={FaTrashAlt} />}
						/>
					</Flex>
				))}
				<IconButton
					aria-label="add-score"
					variant={"outline"}
					border="2px dashed"
					py="5"
					borderColor={borderColor}
					onClick={() => {
						setScores([
							...scores,
							{
								date: "",
								playerId: undefined,
								score: undefined,
							},
						]);
					}}
					icon={<Icon as={HiOutlinePlus} />}
				/>
				<Form.SubmitButton
					onClick={() => onSubmit()}
					buttonProps={{
						w: ["full", "full", "xs"],
					}}
				>
					Submit Scores
				</Form.SubmitButton>
			</Flex>
		</Admin.Section>
	);
};

export default CreateNewRound;
