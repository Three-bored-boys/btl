import React, { ComponentProps, forwardRef } from "react";
import MagnifyingGlass from "@/client/components/ui/icons/magnifying-glass";
import { cn } from "@/client/utils";

type ClassNames = { classNameDiv?: string; classNameInput?: string };
type Props = ComponentProps<"input"> & ClassNames;

const SearchBarRef = forwardRef<HTMLInputElement, Props>(function SearchBarRef(props, ref) {
  const { classNameDiv, classNameInput, placeholder, onChange, onKeyDown } = props;
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-1 rounded-lg border-2 border-transparent px-1 text-base has-[:focus]:border-primary hover:bg-primary-50 lg:text-lg",
        classNameDiv,
      )}
    >
      <MagnifyingGlass />
      <input
        type="search"
        className={cn("w-full bg-inherit outline-none focus:outline-none", classNameInput)}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default SearchBarRef;
