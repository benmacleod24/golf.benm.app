import React, { useState, useEffect, useCallback } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRoundCard } from "~/server/db/createRoundCard";
import { Form } from "../../Form";
import useSWR from "swr";
import { Team_Member } from "@prisma/client";
import { Flex, Grid, useToast } from "@chakra-ui/react";
import { stringToNumber } from "~/server/helpers";

interface CreateNewRoundProps {}

type NewRoundFormData = z.infer<typeof createRoundCard.schema>;

/**
 * @description New round component.
 * @return {React.FC<CreateNewRound>}
 */
const CreateNewRound: React.FC<CreateNewRoundProps> = (props) => {
	const { register, handleSubmit, formState, ...rest } =
		useForm<NewRoundFormData>();
	const toast = useToast();

	const { data } = useSWR<{ data: Team_Member[] }>("/api/v1/players");

	const onSubmit = async (data: NewRoundFormData) => {
		data.score = Number(data.score);

		const res = await fetch("/api/v1/scorecard", {
			method: "POST",
			body: JSON.stringify([data]),
		}).then((r) => r.json());

		if (res.code === "200") {
			rest.reset();
			toast({
				title: "Success!",
				status: "success",
				description: "Successfully created score.",
				position: "bottom-right",
			});
		}
	};

	// Filters out correct people for search input.
	const sortSearchInput = useCallback(
		(v: string): { text: string; value: any }[] => {
			console.log(data);
			if (!data || !data.data) return [];
			return data.data
				.filter((p) => {
					const combinedName = p.firstName + " " + p.lastName;
					if (combinedName.toUpperCase().includes(v.toUpperCase()))
						return p;
				})
				.map((p) => {
					return {
						text: p.firstName + " " + p.lastName,
						value: p.id,
					};
				});
		},
		[data]
	);

	return (
		<Admin.Section title="New Round Score">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex flexDir={"column"} w="full">
					<Grid
						templateColumns={[null, null, "repeat(3, 1fr)"]}
						w="full"
						gap={5}
					>
						<Form.SearchInput
							inputProps={{
								formState,
								name: "playerId",
								register,
								title: "What Player?",
							}}
							openOnFocus
							sort={sortSearchInput}
							onClick={(v) => rest.setValue("playerId", v)}
						/>
						<Form.TextInput
							formState={formState}
							name="score"
							register={register}
							title="What was the score?"
						/>
						<Form.TextInput
							formState={formState}
							name="date"
							register={register}
							title="When did this happen?"
							placeholder="DD/MM/YY"
						/>
					</Grid>
					<Form.SubmitButton
						formState={formState}
						buttonProps={{
							colorScheme: "whatsapp",
							w: [null, null, null, "md"],
							mt: "7",
						}}
					>
						Submit Score
					</Form.SubmitButton>
				</Flex>
			</form>
		</Admin.Section>
	);
};

export default CreateNewRound;
