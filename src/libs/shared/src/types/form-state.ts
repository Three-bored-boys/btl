export type FormState<T> = FieldError<T> & FormResult;

export type FieldError<T> = {
  fieldError?: { [key in keyof T]: string[] };
};

export type FormResult = { formResult?: { success: false; errors: string[] } | { success: true; message: string } };
