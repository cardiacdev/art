export const STATUS_MESSAGES = {
  CODE_401: "Sie sind nicht berechtigt, diese Aktion auszuführen.",
  CODE_404: "Die angeforderte Ressource wurde nicht gefunden.",
  CODE_500: "Ein unbekannter Fehler ist aufgetreten.",
} as const;

export const handleError = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(STATUS_MESSAGES.CODE_401);
    }

    if (res.status === 404) {
      throw new Error(STATUS_MESSAGES.CODE_404);
    }

    if (res.status === 422) {
      const validationErrorResponse = await res.json();
      throw new Error(validationErrorResponse["hydra:description"]);
    }

    throw new Error(STATUS_MESSAGES.CODE_500);
  }
};
