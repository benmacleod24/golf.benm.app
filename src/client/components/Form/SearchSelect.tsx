import { FormControl, FormLabel, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GroupBase, OptionsOrGroups, Select } from "chakra-react-select";
import { CustomFormProps } from ".";

interface SearchSelectProps {
	name: string;
	options?: OptionsOrGroups<unknown, GroupBase<unknown>>;
	title?: string;
	isLoading?: boolean;
	formProps: CustomFormProps;
}

/**
 * @description Search Select Form Component
 * @return {React.FC<SearchSelect>}
 */
const SearchSelect: React.FC<SearchSelectProps> = (props) => {
	const labelColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

	return (
		<FormControl>
			<FormLabel pb="0" mb="0.5" color={labelColor}>
				{props.title || props.name}
			</FormLabel>
			<Select
				useBasicStyles
				variant="filled"
				selectedOptionStyle="check"
				closeMenuOnSelect={true}
				options={props.options}
				isLoading={props.isLoading}
				onChange={(e: any) =>
					props.formProps.setValue(props.name, e.value)
				}
				chakraStyles={{
					control: (provided, state) => {
						return {
							...provided,
							border: "1px solid",
							borderColor: "whiteAlpha.200",

							_focusVisible: {
								outline: "none",
							},
						};
					},
				}}
			/>
		</FormControl>
	);
};

export default SearchSelect;
