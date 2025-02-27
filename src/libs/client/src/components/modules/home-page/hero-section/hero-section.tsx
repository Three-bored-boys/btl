"use client";

import { Container } from "@/client/components/layouts/container";
import Image from "next/image";
import heroImage from "@/public/assets/images/hero-section.png";
import { LinkButton } from "../../../ui/link-button";
import { useValidateUserSession } from "@/client/hooks";
import { RecentlyAdded } from "../recently-added";

export function HeroSection() {
  const { user } = useValidateUserSession();

  if (user) {
    return <RecentlyAdded user={user}></RecentlyAdded>;
  }

  return (
    <div className="w-full py-10">
      <Container>
        <div className="grid w-full gap-x-0.5 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-y-5 text-center md:items-start md:text-left">
            <h1 className="font-semibold sm:text-6xl">
              <span> Discover the joys </span>
              <br /> of reading
            </h1>
            <h4 className="font-light italic">
              <p className="mb-2">Find books to read.</p>
              <p className="mb-2">Keep track of the ones you have read and want to read.</p>
              <p>Create an account to begin and personalise your experience.</p>
            </h4>
            <div>
              <LinkButton href={"/signup"} background={"light"} textSize={"big"}>
                Start your journey
              </LinkButton>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <Image src={heroImage} alt="" width={1000} height={1000} className="w-full object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
}
