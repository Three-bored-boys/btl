import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { Genres } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import GenresSectionClient from "./genres-section-client";
import { API_URL } from "@/client/utils";

export default function GenresSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="Oldies but Goldies">
          Explore some more older books below according to a select list of popular genres
        </SectionPreamble>
        <GetGenresWrapper />
      </Container>
    </section>
  );
}

async function GetGenresWrapper() {
  const { genres, count } = await fetchData<Genres>(`${API_URL}/books/genres`);
  return <GenresSectionClient genres={genres} count={count} />;
}
