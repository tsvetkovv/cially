"use client";

import { useParams } from 'next/navigation'
import { DataDashboard } from "@/app/(components)/chart-data-fetch";

export default function Dashboard() {
    const params = useParams<{ tag: string; item: string }>()
    
    console.log(params)
    let id = params.id

  return (
    <>
    <div>Fetching for server id: {id}</div>
      <DataDashboard guildID={id} />
    </>
  );
}
