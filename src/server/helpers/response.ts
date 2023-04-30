export const response = ({
	code,
	message,
	data,
}: {
	code?: string;
	message?: string;
	data?: any;
}) => ({
	code,
	message,
	data: data || null,
});
