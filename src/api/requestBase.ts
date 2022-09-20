const handleResponseStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const requestBase = async (url: string, options: object = {}) => {
  const response = await fetch(url, options);

  return handleResponseStatus(response);
};

export default requestBase;
