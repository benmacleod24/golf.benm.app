import { FormControl, FormLabel, Input, InputProps, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { CustomFormProps } from ".";

interface FormInputProps {
	title?: string;
	name: string;
	formProps: CustomFormProps;
	inputProps?: InputProps;
}

/**
 * @description Form Input
 * @return {React.FC<FormInput>}
 */
const FormInput: React.FC<FormInputProps> = (props) => {
	const labelColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

	return (
		<FormControl>
			<FormLabel pb="0" mb="0.5" color={labelColor}>
				{props.title || props.name}
			</FormLabel>
			<Input
				w="full"
				_focusVisible={{ outline: "none" }}
				variant={"filled"}
				border={"1px solid"}
				borderColor={"whiteAlpha.200"}
				name={props.name}
				value={props.formProps.value}
				onChange={(e) => props.formProps.setValue(props.name, e.target.value)}
				{...props.inputProps}
			/>
		</FormControl>
	);
};

export default FormInput;
