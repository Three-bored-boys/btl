"use client";

import { useState } from "react";
import NextImage, { type ImageProps } from "next/image";
import { type Book } from "@/shared/types";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { getBookCoverImageAltFromBook, GENERIC_BOOK_IMAGE_ALT } from "@/shared/utils";

type Props = Omit<ImageProps, "src" | "alt"> & { book: Book };

export function BookCoverImage(props: Props) {
  const { book, ...rest } = props;

  const initialSrc = book.image ?? genericBookImage;
  const initialAlt = getBookCoverImageAltFromBook(book);

  const [src, setSrc] = useState(initialSrc);
  const [alt, setAlt] = useState(initialAlt);

  return (
    <NextImage
      src={src}
      alt={alt}
      onError={() => {
        setSrc(genericBookImage);
        setAlt(GENERIC_BOOK_IMAGE_ALT);
      }}
      {...rest}
    />
  );
}
