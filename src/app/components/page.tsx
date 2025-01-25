import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components Page Title",
  description: "Components Page description"
};

export default async function ComponentsPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log("Components page searchParams:", searchParams);
  console.log("Components page params:", params);

  return (
    <>
      <main>
        <p>Components Page Main Content</p>
      </main>
    </>
  );
}
