import React from "react";

function SectionPreamble({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <h1 className="text-2xl font-normal uppercase tracking-wide sm:text-3xl">{title}</h1>
      <p className="mb-4 text-xs sm:text-lg">{children}</p>
    </>
  );
}

export default SectionPreamble;
