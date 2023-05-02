import React, { useState, useEffect } from "react";
import { Admin } from "..";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRoundCard } from "~/server/db/createRoundCard";
import { Form } from "../../Form";
import useSWR from "swr";
import { Player } from "@prisma/client";
import { Flex, Grid } from "@chakra-ui/react";

interface CreateNewRoundProps {}

type NewRoundFormData = z.infer<typeof createRoundCard.schema>;

/**
 * @description New round component.
 * @return {React.FC<CreateNewRound>}
 */
const CreateNewRound: React.FC<CreateNewRoundProps> = (props) => {
	const { register, handleSubmit, formState, ...rest } =
		useForm<NewRoundFormData>();

	const { data } = useSWR<{ data: Player[] }>("/api/v1/players");

	const onSubmit = async (data: NewRoundFormData) => {
		alert(JSON.stringify(data, null, 2));
	};

	// Filters out correct people for search input.
	const sortSearchInput = (v: string): { text: string; value: any }[] => {
		if (!data || !data.data) return [];
		return data.data
			.filter((p) => {
				const combinedName = p.firstName + " " + p.lastName;
				if (combinedName.toUpperCase().includes(v.toUpperCase()))
					return p;
			})
			.map((p) => {
				return { text: p.firstName + " " + p.lastName, value: p.id };
			});
	};

	return (
		<Admin.Section title="New Round Score">
			<Flex
				flexDir={"column"}
				as="form"
				w="full"
				onSubmit={handleSubmit(onSubmit)}
			>
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
		</Admin.Section>
	);
};

export default CreateNewRound;
