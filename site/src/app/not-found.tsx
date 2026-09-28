import Link from "next/link";
import copy from "../../content/site.json";
export default function NotFound() {
  return <main className="dl-container"><h1>{copy.notFound}</h1><Link href="/">{copy.backHome}</Link></main>;
}
