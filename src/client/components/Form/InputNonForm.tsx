import React, { useState, useEffect } from "react";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";

interface InputNonFormProps {
	name: any;
	placeholder?: string;
	title?: string;
	value: string;
	onChange: (k: string, v: any) => void;
}

/**
 * @description Input with form stuff.
 * @return {React.FC<InputNonForm>}
 */
const InputNonForm: React.FC<InputNonFormProps> = (props) => {
	return (
		<FormControl>
			<FormLabel htmlFor={props.name}>
				{props.title || props.placeholder || "Form Input"}
			</FormLabel>
			<Input
				onChange={(e) => props.onChange(props.name, e.target.value)}
				id={props.name}
				placeholder={props.placeholder}
			/>
		</FormControl>
	);
};

export default InputNonForm;
