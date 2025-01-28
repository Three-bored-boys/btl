export type FormState<T> = {
  fieldError: {
    [key in keyof T]: string[];
  };
  formResult: FormResult | null;
};

export type FormResult = { success: false; errors: string[] } | { success: true; message: string };
