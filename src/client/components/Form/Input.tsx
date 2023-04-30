import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { CreatePlayerFormData, InputTypes } from "../Admin/CreatePlayer";

interface FormInputProps {
	name: any;
	register: UseFormRegister<any>;
	formState: FormState<any>;
	placeholder?: string;
	title?: string;
}

/**
 * @description Text Input for the form.
 * @return {React.FC<FormInput>}
 */
const FormInput: React.FC<FormInputProps> = ({
	formState,
	name,
	...props
}) => {
	const { errors } = formState;

	return (
		<FormControl isInvalid={Boolean(errors[name])}>
			<FormLabel htmlFor={name}>
				{props.title || props.placeholder || "Form Input"}
			</FormLabel>
			<Input
				id={name}
				placeholder={props.placeholder}
				{...props.register(name, {
					required: "This is required",
				})}
			/>
			<FormErrorMessage>
				{(errors[name] && errors[name]?.message) || ""}
			</FormErrorMessage>
		</FormControl>
	);
};

export default FormInput;
