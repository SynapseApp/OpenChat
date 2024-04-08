export default function response(
	message: string,
	success: boolean = false,
	data: any = undefined
) {
	return {
		message,
		success,
		data,
	};
}
