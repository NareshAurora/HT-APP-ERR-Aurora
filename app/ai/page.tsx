import { Hero } from "@/components/Hero/Hero";
import SuggestionResults from "@/components/SuggestionResults";
import { Container } from "@mantine/core";
import { fetchRoleSuggestions, getMatchingJobs, getRecommendedJobs } from "../actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.query as string;
  if (!query) {
    return <div>Error: No query provided</div>;
  }

  const userQuery = query.toLowerCase()
  .replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });

  const recs = await getMatchingJobs(userQuery)
  if (!recs) {
    return <div>Error finding recommended jobs</div>;
  }

  return (
    <>
      <Hero title="" subtitle="" align="center" />
      <Container size="xl">
        <main>
          <SuggestionResults recs={recs} query={query} />
        </main>
      </Container>
    </>
  );
}