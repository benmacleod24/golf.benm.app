import { Td, Tr, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface HandicapPlayerProps {}

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
					Nate Moore
				</Td>
				<Td></Td>
				<Td isNumeric color="gray.400">
					<Text fontSize={"sm"}>38</Text>
					<Text fontSize="sm" color="gray.600" fontStyle={"italic"}>
						3/2/23
					</Text>
				</Td>
				<Td isNumeric color="gray.400">
					<Text fontSize={"sm"}>38</Text>
					<Text fontSize="sm" color="gray.600" fontStyle={"italic"}>
						3/2/23
					</Text>
				</Td>
				<Td isNumeric color="gray.400">
					<Text fontSize={"sm"}>38</Text>
					<Text fontSize="sm" color="gray.600" fontStyle={"italic"}>
						3/2/23
					</Text>
				</Td>
				<Td isNumeric color="gray.400">
					<Text fontSize={"sm"}>38</Text>
					<Text fontSize="sm" color="gray.600" fontStyle={"italic"}>
						3/2/23
					</Text>
				</Td>
				<Td isNumeric color="gray.400">
					<Text fontSize={"sm"}>38</Text>
					<Text fontSize="sm" color="gray.600" fontStyle={"italic"}>
						3/2/23
					</Text>
				</Td>
				<Td isNumeric color="gray.400"></Td>
				<Td isNumeric fontWeight={"bold"}>
					197
				</Td>
				<Td isNumeric color="brand.700" fontWeight={"bold"}>
					3
				</Td>
			</Tr>
		</React.Fragment>
	);
};

export default HandicapPlayer;
