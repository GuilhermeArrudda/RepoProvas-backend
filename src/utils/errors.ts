export interface TypeError {
	type: 'unauthorized' | 'not_found' | 'conflict' | 'invalid_input' | 'forbidden'
	code: 401 | 404 | 409 | 422 | 403
	message: string
}

export function unauthorized(message: string) {
	return {
		type: "unauthorized",
		code: 401,
		message
	}
}

export function notFound(message: string) {
	return {
		type: "not_found",
		code: 404,
		message
	}
}

export function conflict(message: string) {
	return {
		type: "conflict",
		code: 409,
		message
	}
}

export function invalidInput(message: string) {
	return {
		type: "invalid_input",
		code: 422,
		message
	}
}

export function forbidden(message: string) {
	return {
		type: "forbidden",
		code: 403,
		message
	}
}