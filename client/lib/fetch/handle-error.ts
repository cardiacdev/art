export const handleError = async (res: Response) => {
  if (!res.ok) {
    const validationErrorResponse = await res.json();

    if (validationErrorResponse["hydra:description"]) {
      throw new Error(validationErrorResponse["hydra:description"]);
    } else if (validationErrorResponse.detail) {
      throw new Error(validationErrorResponse.detail);
    }

    throw new Error("Ein unbekannter Fehler ist aufgetreten.");
  }
};
