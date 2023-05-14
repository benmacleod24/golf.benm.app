import FormInput from "./Input";
import SearchSelect from "./SearchSelect";
import FormSubmit from "./Submit";
import FormWrapper from "./Wrapper";

export const Form = {
	Wrapper: FormWrapper,
	Input: FormInput,
	Submit: FormSubmit,
	SearchSelect: SearchSelect,
};

export type CustomFormProps = {
	values: any;
	setValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
};
