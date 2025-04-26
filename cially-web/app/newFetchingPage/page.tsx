/* 
GOING TO BE THE MAIN PAGE INSTEAD OF THE CURRENT ONE THAT REQUIRES GUILD ID INPUT 
newFetchingPage ROUTE IS GOING TO BE REMOVED ONCE THIS IS READY
*/

"use client"
import { useEffect, useState } from "react";
import LoadingSVG from "../_components/_events/loading-page";
import GuildNotFound from "../_components/_events/guildNotFound";
import { redirect } from 'next/navigation'
let BOT_API_URL = process.env.BOT_API_URL

export default function DataDashboard() {
  const [guildData, setGuildData] = useState([{ amount: 69 }]);
  
  useEffect(() => {
    async function fetchData() {
      let chartDataReceived = await fetch(
        `http://localhost:6969/fetchGuilds`
      );
      let json = await chartDataReceived.json();
      setGuildData(json);
    }
    fetchData();
  }, []);
  
  
  if (guildData.code) {
    return <GuildNotFound />
  } else if (!guildData.AvailableGuilds) {
    return <LoadingSVG />
  } else {
    return (
        <>
        to pio teleio main page tou kosmou
        </>
    )
    
  }

}
