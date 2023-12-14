const extractErrorMessage = (errorObject: any) => {
  const result =
    errorObject.response && errorObject.response.data.message
      ? errorObject.response.data.message
      : errorObject.message;

  return result;
};

const convertObjectToURLParams = (object: any) => {
  return new URLSearchParams(object).toString();
};

export { extractErrorMessage, convertObjectToURLParams };
