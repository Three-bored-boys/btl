import { HandlerResult } from "./response";

export type FormState<T, P = unknown> = FieldError<T> | HandlerResult<P>;

export type FieldError<T> = {
  fieldError: { [key in keyof T]: string[] };
};
