import React, { useState, useEffect } from "react";
import { Container } from "../../Container";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import NavButton from "../NavButton";
import { signOut, useSession } from "next-auth/react";
import ColorMode from "../../ColorMode";

interface DesktopHeaderProps {}

/**
 * @description Header for desktop clients
 * @return {React.FC<DesktopHeader>}
 */
const DesktopHeader: React.FC<DesktopHeaderProps> = (props) => {
	const [isSmallerThan768] = useMediaQuery(["(max-width: 768px)"]);
	const { data, status } = useSession();

	if (isSmallerThan768) return null;

	// Auth States
	const isLoaded = status === "authenticated";
	const isAdmin = data && data.user && data.user.role === "ADMIN";

	return (
		<Container.Body>
			<Flex w="full" h="full" align="center">
				<Flex
					align="center"
					h="full"
					flex={["1", "1", "0"]}
					minW="fit-content"
				>
					<Link href="/">
						<Text
							fontWeight={"bold"}
							fontSize={"lg"}
							userSelect={"none"}
							cursor={"pointer"}
						>
							Riverview Golf Leauge
						</Text>
					</Link>
				</Flex>
				<Flex
					ml="20"
					gap={5}
					flex={1}
					display={["none", "none", "flex"]}
				>
					<NavButton href="/">Home</NavButton>
					<NavButton href="/hndcp">Handicap Report</NavButton>
					<NavButton href="/players">Players</NavButton>
					{isLoaded && isAdmin && (
						<NavButton href="/admin">
							Nate&apos;s Section
						</NavButton>
					)}
				</Flex>
				<Flex align={"center"} gap={5}>
					<ColorMode />
					<NavButton onClick={signOut}>Logout</NavButton>
				</Flex>
			</Flex>
		</Container.Body>
	);
};

export default DesktopHeader;
