import React from "react";

function SectionPreamble({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <h2 className="font-semibold uppercase tracking-wide">{title}</h2>
      <p className="mb-4 text-xs sm:text-lg">{children}</p>
    </>
  );
}

export default SectionPreamble;
