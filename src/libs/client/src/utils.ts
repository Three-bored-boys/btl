import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const containerStyleClasses = cn("mx-auto max-w-screen-2xl px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-5 xl:px-6");

export const button = cva("h-auto rounded-3xl border-2 border-transparent px-6 py-1 font-normal", {
  variants: {
    background: {
      dark: "bg-primary text-primary-50 border-0 hover:bg-primary-600",
      light: "border-primary bg-secondary-300 text-primary border-0 hover:bg-secondary-400",
    },
    textSize: {
      big: "text-base lg:text-xl",
      small: "text-xs lg:text-base",
    },
  },
});

export type ButtonVariants = VariantProps<typeof button>;
