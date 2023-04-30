import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { CreatePlayerFormData, InputTypes } from "../Admin/CreatePlayer";

interface FormSelectProps {
	name: InputTypes;
	register: UseFormRegister<any>;
	formState: FormState<any>;
	placeholder?: string;
	title?: string;
	data?: any[];
	displayKey?: string;
	valueKey: string;
}

/**
 * @description Form Select Component
 * @return {React.FC<FormSelect>}
 */
const FormSelect: React.FC<FormSelectProps> = ({
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
			<Select
				{...props.register(name, {
					required: "This is required",
				})}
				placeholder={props.placeholder}
			>
				{props.data &&
					props.data.map((v) => (
						<option value={v[props.valueKey]}>
							{v[props.displayKey as string] || v}
						</option>
					))}
			</Select>
			<FormErrorMessage>
				{errors[name] && errors[name]?.message}
			</FormErrorMessage>
		</FormControl>
	);
};

export default FormSelect;
