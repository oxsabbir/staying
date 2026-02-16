import { notFound } from "next/navigation";
import { roomDetailsData } from "../../../data/roomDetails";
import RoomDetailsClient from "./RoomDetailsClient";

export function generateStaticParams() {
  return Object.keys(roomDetailsData).map((slug) => ({ slug }));
}

export default async function RoomPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || !roomDetailsData[slug]) {
    notFound();
  }

  return <RoomDetailsClient slug={slug} />;
}
