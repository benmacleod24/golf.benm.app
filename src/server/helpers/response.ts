export const response = <T = any>({
	code,
	message,
	data,
}: {
	code?: string;
	message?: string;
	data?: T;
}) => ({
	code,
	message,
	data: data || null,
});
