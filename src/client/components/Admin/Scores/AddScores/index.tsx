import { Flex, Icon, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NewScoreContainer from "./NewScoreContainer";
import { NewScoreType } from "~/types";
import { HiOutlinePlus } from "react-icons/hi";
import { addAbortSignal } from "stream";
import {} from "crypto";

function generateUUID() {
	// Public Domain/MIT
	var d = new Date().getTime(); //Timestamp
	var d2 =
		(typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = Math.random() * 16; //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
}

interface AddScoresProps {}

/**
 * @description Container for adding scores.
 * @return {React.FC<AddScores>}
 */
const AddScores: React.FC<AddScoresProps> = (props) => {
	const [scores, setScores] = useState<NewScoreType[]>([]);

	// Color Scheme Values
	const borderColor = useColorModeValue("blackAlpha.700", "whiteAlpha.400");

	// Add a blank score into the array.
	const addBlankScore = () => {
		setScores([
			...scores,
			{
				id: generateUUID(),
				attachPoints: false,
				memberId: undefined,
				roundDate: undefined,
				roundPoints: 0,
				roundScore: undefined,
			},
		]);
	};

	const removeScore = (idToRemove: any) => {
		setScores(scores.filter((score) => score.id !== idToRemove));
	};

	const updateValue = (idToUpdate: any, key: string, value: any) => {
		let newScores = [...scores];
		if (key === "score") {
			value = Number(value);
		}

		const pos = scores.findIndex((s) => s.id === idToUpdate);

		//@ts-ignore
		newScores[pos][key] = value;

		setScores(newScores);
	};

	return (
		<Flex flexDir={"column"}>
			<Text fontWeight={"bold"} fontSize={"xl"} mb="5">
				Add Scores
			</Text>
			<Flex flexDir={"column"}>
				{scores.map((score, index) => (
					<NewScoreContainer
						score={score}
						removeScore={() => removeScore(score.id)}
						updateValue={updateValue}
						key={index}
					/>
				))}
				<IconButton
					aria-label="add-new-score"
					variant={"outline"}
					border="2px dashed"
					borderColor={borderColor}
					py="6"
					mt="5"
					icon={<Icon as={HiOutlinePlus} />}
					onClick={addBlankScore}
				/>
			</Flex>
		</Flex>
	);
};

export default AddScores;
