export type FormState<T> = {
  fieldError: {
    [key in keyof T]: string[];
  };
  formStatus: FormStatus | null;
};

export type FormStatus = { success: false; errors: string[] } | { success: true; message: string };
