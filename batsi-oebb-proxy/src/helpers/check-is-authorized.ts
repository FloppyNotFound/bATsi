const checkIsAuthorized = (headers: Headers, token: string) => {
	const apiTokenReceived = headers.get("API_TOKEN");
	const apiTokenExpected = token;

	return apiTokenReceived === apiTokenExpected;
};

export { checkIsAuthorized };
