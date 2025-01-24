export type FormState<T> = {
  fieldError: {
    [key in keyof T]: string;
  };
  formStatus: { success: false; error: string } | { success: true; message: string } | null;
};
