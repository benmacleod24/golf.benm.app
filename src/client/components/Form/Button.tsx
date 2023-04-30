import React, { useState, useEffect } from "react";
import { FormState } from "react-hook-form";
import { CreatePlayerFormData } from "../Admin/CreatePlayer";
import { Button, ButtonProps } from "@chakra-ui/react";

interface FormSubmitButtonProps {
	formState: FormState<any>;
	buttonProps?: ButtonProps;
}

/**
 * @description Submit Butto for the form.
 * @return {React.FC<FormSubmitButton>}
 */
const FormSubmitButton: React.FC<
	React.PropsWithChildren<FormSubmitButtonProps>
> = ({ formState, children, buttonProps }) => {
	return (
		<Button
			type="submit"
			isLoading={formState.isSubmitting}
			{...buttonProps}
		>
			{children}
		</Button>
	);
};

export default FormSubmitButton;
