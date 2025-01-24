const checkIsAuthorized = (headers: Headers, token: string): boolean => {
  const apiTokenReceived = headers.get('API_TOKEN');
  const apiTokenExpected = token;

  return apiTokenReceived === apiTokenExpected;
};

export { checkIsAuthorized };
