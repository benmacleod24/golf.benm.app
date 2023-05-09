import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useMemo } from "react";

import {
	Select,
	OptionsOrGroups,
	Props,
	GroupBase,
} from "chakra-react-select";
import { FormState, UseFormRegister, useController } from "react-hook-form";

interface SearchInputProps {
	title: string;
	options: OptionsOrGroups<unknown, GroupBase<unknown>>;
	isLoading?: boolean;
	name: string;
	control?: any;
	rules?: any;
	onChange?: (key: string, value: any) => void;
	value?: any;
}

/**
 * @description
 * @return {React.FC<SearchInput>}
 */
const SearchInput: React.FC<SearchInputProps> = (props) => {
	return (
		<FormControl>
			<FormLabel>{props.title}</FormLabel>
			<Select
				useBasicStyles
				selectedOptionStyle="check"
				closeMenuOnSelect={true}
				isLoading={props.isLoading}
				options={props.options}
				name={props.name}
				onChange={
					props.onChange
						? //@ts-ignore
						  (e) => props.onChange(props.name, e.value)
						: () => {}
				}
			/>
		</FormControl>
	);
};

export default SearchInput;
