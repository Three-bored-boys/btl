export default async function LibraryPage({ params }: { params: Promise<{ library: string }> }) {
  const resolvedParams = await params;

  const { library } = resolvedParams;

  return <div>{library}</div>;
}
