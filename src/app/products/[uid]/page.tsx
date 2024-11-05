import { createClient } from "@/prismicio";
import Product from "@/slices/Product";
type Props = {
  params: Promise<{ uid: string; title: string; description: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const client = createClient();

  const page = await client.getByUID("product", (await params).uid);

  return <Product data={page.data} />;
}
