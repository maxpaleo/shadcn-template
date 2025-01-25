import { Metadata } from "next";
import Icon from "lucide-icon-component";

export const metadata: Metadata = {
  title: "Page Page Title",
  description: "Page Page description"
};

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log(" searchParams:", searchParams);
  console.log("params:", params);
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Template App Root Layout</h1>
          <div>
            Content
            <Icon icon="home" className="w-6 h-6" />
          </div>
        </div>
      </main>
    </>
  );
}
