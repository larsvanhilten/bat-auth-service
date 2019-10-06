export default (error: any) => {
  let code = 400;
  let message = 'Oops, something went wrong';

  if (error.details) {
    code = 400;
    message = error.details[0].message;
  }

  if (error.response) {
    code = error.response.status;
    message = error.response.data.message || error.response.statusText;
  }

  return {
    code,
    response: {
      error: {
        code,
        message
      }
    }
  };
};
