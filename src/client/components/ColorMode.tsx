import { Button, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsFillCloudSunFill } from "react-icons/bs";

interface ColorModeProps {}

/**
 * @description Component to handle changing  the color mode.
 * @return {React.FC<ColorMode>}
 */
const ColorMode: React.FC<ColorModeProps> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();

	const icon = {
		"light": <Icon as={BsFillMoonStarsFill} />,
		"dark": <Icon as={BsFillCloudSunFill} />,
	};

	return (
		<IconButton
			aria-label="toggle color mode"
			onClick={toggleColorMode}
			icon={icon[colorMode]}
			variant={"ghost"}
			rounded={"full"}
		/>
	);
};

export default ColorMode;
