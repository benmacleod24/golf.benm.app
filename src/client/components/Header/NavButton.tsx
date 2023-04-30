import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface NavButtonProps {
	href?: string;
	onClick?: () => void;
}

/**
 * @description Navigation button component.
 * @return {React.FC<NavButton>}
 */
const NavButton: React.FC<React.PropsWithChildren<NavButtonProps>> = (
	props
) => {
	const color = useColorModeValue("blackAlpha.700", "white");

	if (props.onClick)
		return (
			<Button
				variant={"link"}
				color={color}
				fontWeight={"normal"}
				_hover={{
					textDecor: "none",
				}}
				onClick={props.onClick}
			>
				{props.children}
			</Button>
		);

	return (
		<Link href={props.href || "/"}>
			<Button
				color={color}
				variant={"link"}
				fontWeight={"normal"}
				_hover={{
					textDecor: "none",
				}}
			>
				{props.children}
			</Button>
		</Link>
	);
};

export default NavButton;
