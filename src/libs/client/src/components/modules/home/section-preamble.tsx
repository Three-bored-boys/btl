import React from "react";

function SectionPreamble({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <h1 className="font-normal uppercase italic tracking-wide">{title}</h1>
      <p className="mb-4 text-xs sm:text-lg">{children}</p>
    </>
  );
}

export default SectionPreamble;
