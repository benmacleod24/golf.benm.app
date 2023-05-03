import { Td, Tr } from "@chakra-ui/react";
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
				<Td color="brand.700" fontWeight={"bold"}>
					Nate Moore
				</Td>
				<Td></Td>
				<Td isNumeric>38</Td>
				<Td isNumeric>40</Td>
				<Td isNumeric>42</Td>
				<Td isNumeric>39</Td>
				<Td isNumeric>38</Td>
				<Td isNumeric></Td>
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
