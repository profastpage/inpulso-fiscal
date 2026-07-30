import PublicacionView from "./PublicacionView";

export const dynamic = "force-static";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PublicacionView id={id} />;
}
