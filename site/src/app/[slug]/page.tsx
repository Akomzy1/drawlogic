import type { Metadata } from "next";
import { notFound } from "next/navigation";
import routes from "../../../content/routes.json";
import Marketing from "../../components/Marketing";

export const dynamicParams = false;
export function generateStaticParams() {
  return routes.filter(route => route.path !== "/").map(route => ({ slug: route.path.slice(1) }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: routes.find(route => route.path === `/${slug}`)?.name };
}
export default async function MarketingPage({ params }: Props) {
  const { slug } = await params;
  const route = routes.find(route => route.path === `/${slug}`);
  if (!route) notFound();
  return <Marketing name={route.name} />;
}
