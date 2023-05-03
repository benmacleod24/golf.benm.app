import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface TableWrapperProps {}

/**
 * @description Wrapper for the table that goes in handicap score.
 * @return {React.FC<TableWrapper>}
 */
const TableWrapper: React.FC<React.PropsWithChildren<TableWrapperProps>> = (
	props
) => {
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th></Th>
						<Th isNumeric>Week A</Th>
						<Th isNumeric>Week B</Th>
						<Th isNumeric>Week C</Th>
						<Th isNumeric>Week D</Th>
						<Th isNumeric>Week E</Th>
						<Th isNumeric></Th>
						<Th isNumeric>Total Score</Th>
						<Th isNumeric>Current Handicap</Th>
					</Tr>
				</Thead>
				<Tbody>{props.children}</Tbody>
			</Table>
		</TableContainer>
	);
};

export default TableWrapper;
