import {
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
	useOutsideClick,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form } from ".";
import { FormInputProps } from "./Input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDebounce } from "use-debounce";
import { AiOutlineClose } from "react-icons/ai";

interface SearchInputProps {
	sort: (v: string) => { text: string; value: any }[];
	onClick: (v: any) => void;
	inputProps: FormInputProps;
	openOnFocus?: boolean;
}

/**
 * @description
 * @return {React.FC<SearchInput>}
 */
const SearchInput: React.FC<SearchInputProps> = (props) => {
	const [filter, setFilter] = useState<string>("");
	const [selected, setSelected] = useState<string>("");
	const [isOpen, setOpen] = useState<boolean>(false);
	const [debouncedFilter] = useDebounce(filter, 1000);
	const [animateRef] = useAutoAnimate();
	const ref = useRef();

	const bg = useColorModeValue("gray.200", "gray.700");

	useOutsideClick({
		ref: ref as any,
		handler: () => setOpen(false),
	});

	useEffect(() => {
		if (debouncedFilter.length > 0) setOpen(true);
		// if (debouncedFilter.length <= 0) {
		// 	setOpen(false);
		// }
	}, [debouncedFilter]);

	const sortValue = useMemo(() => {
		return props.sort(debouncedFilter);
	}, [debouncedFilter]);

	return (
		<Flex pos="relative" ref={ref as any}>
			<FormControl>
				<FormLabel htmlFor="search-player">What Player?</FormLabel>
				<InputGroup>
					<InputRightElement
						onClick={() => {
							setSelected("");
							setFilter("");
							setOpen(false);
						}}
					>
						{selected.length > 0 ? (
							<Icon as={AiOutlineClose} />
						) : null}
					</InputRightElement>
					<Input
						autoComplete="off"
						pointerEvents={selected.length > 0 ? "none" : "all"}
						name="search-player"
						placeholder="Type a value..."
						value={selected || filter}
						onChange={(e) => {
							if (selected.length > 0) return;
							setFilter(e.target.value);
						}}
						onFocus={() => {
							if (props.openOnFocus) {
								setOpen(true);
								setFilter("");
								return;
							}
							if (selected.length > 0) return;
							if (filter.length > 0) setOpen(true);
						}}
					/>
				</InputGroup>
			</FormControl>
			<Flex
				pointerEvents={isOpen ? "all" : "none"}
				w="full"
				bg={bg}
				pos="absolute"
				top="115%"
				rounded={"md"}
				overflowY={"auto"}
				overflowX={"hidden"}
				h="fit-content"
				maxH="64"
				py="1"
				ref={animateRef}
				flexDir={"column"}
				opacity={isOpen ? "100%" : "0%"}
				zIndex={99}
				transition={"0.2s ease-out"}
				__css={{
					"&::-webkit-scrollbar": {
						width: "1",
						rounded: "md",
					},
					"&::-webkit-scrollbar-track": {
						background: "gray.700",
						rounded: "md",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "gray.600",
						rounded: "md",
					},
				}}
			>
				{sortValue.map((v) => (
					<Flex
						key={v.value}
						w="full"
						_hover={{ bg: "whiteAlpha.50" }}
						transition={"0.2s ease-in-out"}
						py="2.5"
						px="3"
						cursor={"pointer"}
						onClick={() => {
							setSelected(v.text);
							props.onClick(v.value);
							setOpen(false);
						}}
					>
						{v.text}
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};

export default SearchInput;
