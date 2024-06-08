import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import Container from "../../../layouts/container";

export default function QuotesSection() {
  return (
    <section>
      <Container>
        <div className="overflow-hidden whitespace-nowrap">
          <span className="inline-block h-10 w-full bg-red-600"></span>
          <span className="inline-block h-10 w-full bg-blue-600"></span>
          <span className="inline-block h-10 w-full bg-green-600"></span>
        </div>
        <div className={cn("mt-5 flex w-full items-center justify-center")}>
          <span className={cn("mr-9 flex cursor-pointer items-center")}>
            <ArrowLeftCircle />
          </span>
          <span className={cn("flex cursor-pointer items-center")}>
            <ArrowRightCircle />
          </span>
        </div>
      </Container>
    </section>
  );
}
