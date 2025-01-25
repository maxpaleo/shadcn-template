import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hooks Page Title",
  description: "Hooks Page description"
};

export default async function HooksPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log("searchParams:", searchParams);
  console.log("params:", params);
  return (
    <>
      <main>
        <p>Hooks Page Main Content</p>
      </main>
    </>
  );
}
