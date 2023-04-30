import {
	Flex,
	useMediaQuery,
	Text,
	IconButton,
	Icon,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	BackgroundProps,
	VStack,
	useColorModeValue,
	useColorMode,
	Divider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container } from "../../Container";
import ColorMode from "../../ColorMode";
import { BiMenuAltRight, BiHome } from "react-icons/bi";
import { HiRectangleGroup } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import { MdLogout, MdScoreboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import NavButton from "../NavButton";
import { useRouter } from "next/router";
import path from "path";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillMoonStarsFill, BsFillCloudSunFill } from "react-icons/bs";

interface MobileHeaderProps {}

/**
 * @description Header that is only on mobile.
 * @return {React.FC<MobileHeader>}
 */
const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
	const { onOpen, isOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const [isLargerThan768] = useMediaQuery(["(min-width: 768px)"]);
	const { data, status } = useSession();

	// Auth States
	const isLoaded = status === "authenticated";
	const isAdmin = data && data.user && data.user.role === "ADMIN";
	const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");

	if (isLargerThan768) return null;

	const getColor = (pathname: string): BackgroundProps["bg"] => {
		if (router.pathname === pathname) return "whatsapp.600";
		return "transparent";
	};

	const getFontColor = (pathname: string): BackgroundProps["bg"] => {
		if (router.pathname === pathname || colorMode === "dark")
			return "white";
		return "black";
	};

	const icon = {
		"dark": BsFillMoonStarsFill,
		"light": BsFillCloudSunFill,
	};

	return (
		<Container.Body>
			<Flex w="full" h="full" align="center">
				<Flex align="center" h="full" minW="fit-content" flex={1}>
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

				<Flex align={"center"} gap={5}>
					<IconButton
						aria-label="mobile-menu"
						variant={"ghost"}
						icon={<Icon as={HiMenu} />}
						onClick={onOpen}
					/>
				</Flex>
				<Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Riverview Golf Leauge</DrawerHeader>
						<DrawerBody mt="5" p="0">
							<Flex
								flexDir={"column"}
								h="full"
								// pb="20"
							>
								<Flex gap={3} w="full" flexDir={"column"}>
									<Link href="/">
										<Flex
											bg={getColor("/")}
											p="3"
											py="2"
											mx="4"
											rounded="md"
											align={"center"}
											color={getFontColor("/")}
										>
											<Icon
												as={FaHome}
												fontSize="2xl"
												mr="5"
											/>
											<Text>Home</Text>
										</Flex>
									</Link>
									<Link href="/teams">
										<Flex
											bg={getColor("/teams")}
											p="3"
											py="2"
											mx="4"
											rounded="md"
											align={"center"}
											color={getFontColor("/teams")}
										>
											<Icon
												as={HiRectangleGroup}
												fontSize="2xl"
												mr="5"
											/>
											<Text>Teams</Text>
										</Flex>
									</Link>
									<Link href="/players">
										<Flex
											bg={getColor("/players")}
											p="3"
											py="2"
											mx="4"
											rounded="md"
											align={"center"}
											color={getFontColor("/players")}
										>
											<Icon
												as={BsFillPeopleFill}
												fontSize="2xl"
												mr="5"
											/>
											<Text>Players</Text>
										</Flex>
									</Link>
									{isLoaded && isAdmin && (
										<Link href="/admin">
											<Flex
												bg={getColor("/admin")}
												color={getFontColor("/admin")}
												p="3"
												py="2"
												mx="4"
												rounded="md"
												align={"center"}
											>
												<Icon
													as={MdScoreboard}
													fontSize="2xl"
													mr="5"
												/>
												<Text>
													Nate&apos;s Section
												</Text>
											</Flex>
										</Link>
									)}
								</Flex>
								<Divider
									px="4"
									boxSizing="border-box"
									my="5"
								/>
								<Flex w="full" flexDir={"column"} gap={3}>
									<Flex
										p="3"
										py="2"
										mx="4"
										rounded="md"
										align={"center"}
										onClick={toggleColorMode}
									>
										<Icon
											as={icon[colorMode]}
											fontSize="2xl"
											mr="5"
										/>
										<Text textTransform={"capitalize"}>
											{colorMode}
										</Text>
									</Flex>
									<Flex
										p="3"
										py="2"
										mx="4"
										rounded="md"
										align={"center"}
										onClick={() => signOut()}
									>
										<Icon
											as={MdLogout}
											fontSize="2xl"
											mr="5"
										/>
										<Text>Logout</Text>
									</Flex>
								</Flex>
							</Flex>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Flex>
		</Container.Body>
	);
};

export default MobileHeader;
