import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Icons
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete, MdEditNote } from "react-icons/md";

interface ScoreMenuOptionsProps {}

/**
 * @description Menu options for admin score container.
 * @return {React.FC<ScoreMenuOptions>}
 */
const ScoreMenuOptions: React.FC<ScoreMenuOptionsProps> = (props) => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<FiMoreVertical />}
				size="sm"
				rounded={"full"}
				variant={"ghost"}
			/>
			<MenuList>
				<MenuItem color={"gray.200"} icon={<Icon as={MdEditNote} fontSize={"lg"} />}>
					Edit Score
				</MenuItem>
				<MenuItem color={"red.400"} icon={<Icon as={MdDelete} fontSize={"lg"} />}>
					Delete Score
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ScoreMenuOptions;
