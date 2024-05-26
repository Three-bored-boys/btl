import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const containerStyleClasses = cn("mx-auto max-w-screen-2xl px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-5 xl:px-6");

export const button = cva("h-auto rounded border-2 border-transparent px-6 py-1 text-base font-normal lg:text-xl", {
  variants: {
    background: {
      dark: "bg-primary text-primary-50",
      light: "border-primary bg-secondary-300 text-primary",
    },
  },
});

export type ButtonVariants = VariantProps<typeof button>;

export const API_URL =
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PROD;
