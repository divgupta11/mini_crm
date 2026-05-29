export const getErrorMessage = (error) => {
  const responseData = error?.response?.data;

  if (responseData?.errors?.length) {
    return responseData.errors.map((item) => item.message).join(", ");
  }

  return responseData?.message || error.message || "Something went wrong";
};
