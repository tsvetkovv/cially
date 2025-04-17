import PocketBase from "pocketbase";
import registerGuild from "../../../_logic/registerGuild";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

let collection_name = process.env.MESSAGE_COLLECTION
let guild_collection_name = process.env.GUILDS_COLLECTION

// Main GET Event
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let previous_month_date = `${new Date().getUTCFullYear()}-${(new Date().getUTCMonth()).toString().padStart(2, "0")}-${(new Date().getUTCDate()).toString().padStart(2, "0")}`
    let sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    let sevenDaysAgoDate_formatted = `${sevenDaysAgoDate.getUTCFullYear()}-${(sevenDaysAgoDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${(sevenDaysAgoDate.getUTCDate()).toString().padStart(2, "0")}`
    let fourWeeksAgoDate = new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    let fourWeeksAgoDate_formatted = `${fourWeeksAgoDate.getUTCFullYear()}-${(fourWeeksAgoDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${(fourWeeksAgoDate.getUTCDate()).toString().padStart(2, "0")}`

    const { id } = await params;

    try {


        const guild = await pb
            .collection(guild_collection_name)
            .getFirstListItem(`discordID='${id}'`, {});


        try {
            let messagesArray = []

            const fourWeeksMessagesLog = await pb.collection(collection_name).getFullList({
                filter: `guildID ?= "${guild.id}" && created>'${fourWeeksAgoDate_formatted}'`,
                sort: "created",
            });

            fourWeeksMessagesLog.forEach((message) => {
                let creation_date = String(message.created).slice(0, 19)
                let creation_date_js = new Date(Date.UTC(
                    parseInt(creation_date.slice(0, 4)),
                    parseInt(creation_date.slice(5, 7)) - 1,
                    parseInt(creation_date.slice(8, 10)),

                ))
                let creation_date_js_ms = creation_date_js.getTime();

                messagesArray.push({ message_id: message.id, author: message.author, channelID: `${message.channelID}`, created: creation_date_js_ms, created_formatted: creation_date })
            })

            let todayMessages = []
            let todayDate = new Date();
            let todayDateUTC = new Date(Date.UTC(
                todayDate.getUTCFullYear(),
                todayDate.getUTCMonth(),
                todayDate.getUTCDate(),

            ));
            let todayDate_ms = todayDateUTC.getTime();

            messagesArray.forEach((message) => {
                if (message.created == todayDate_ms) {
                    todayMessages.push({ message_id: message.id, author: message.author, channelID: `${message.channelID}`, created: message.created, created_formatted: message.created_formatted })
                }
            })

            let hourData = []

            let i = 0

            while (i < 25) {
                if (i < 10) {
                    hourData.push({ hour: `0${i}`, amount: 0 });
                } else {
                    hourData.push({ hour: `${i}`, amount: 0 });
                }
                i = i + 1
            }

            todayMessages.forEach((record) => {
                let minutes = [record.created_formatted.slice(11, 13)];
                minutes.forEach((minute) => {
                    let position = hourData.findIndex((item) => item.hour === minute);
                    if (position != -1) {
                        hourData[position].amount = hourData[position].amount + 1;
                    } else {
                        hourData.push({ hour: minute, amount: 1 });
                    }
                });
            });
            hourData.sort((a, b) => a.hour - b.hour);


            let monthlyMessages = []
            let LastWeekDateUTC = new Date(Date.UTC(
                todayDate.getUTCFullYear(),
                todayDate.getUTCMonth() - 1,
                todayDate.getUTCDate(),

            ));
            let LastWeekDateUTC_ms = LastWeekDateUTC.getTime();

            messagesArray.forEach((message) => {
                if (message.created >= LastWeekDateUTC_ms) {
                    monthlyMessages.push({ message_id: message.id, author: message.author, channelID: `${message.channelID}`, created: message.created, created_formatted: message.created_formatted })
                }
            })

            let weekData = []

            let u = 0

            while (u < 8) {
                let uDaysAgoDate = new Date(Date.now() - u * 24 * 60 * 60 * 1000)
                let uDaysAgoDate_formatted = `${(uDaysAgoDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${(uDaysAgoDate.getUTCDate()).toString().padStart(2, "0")}`
                weekData.push({ date: `${uDaysAgoDate_formatted}`, amount: 0 });
                u = u + 1
            }


            monthlyMessages.forEach((record) => {
                let monthly_msg = [record.created_formatted.slice(5, 10)];
                monthly_msg.forEach((monthly_msg) => {
                    let position = weekData.findIndex((item) => item.date === monthly_msg);
                    if (position != -1) {
                        weekData[position].amount = weekData[position].amount + 1;
                    } else {
                        return
                    }
                });
            });
            weekData = weekData.toReversed();


            let fourWeekData = []

            let w = 0
            while (w < 22) {
                let startingDate = new Date(Date.now() - w * 24 * 60 * 60 * 1000)
                let startingDate_formatted = `${(startingDate.getUTCFullYear()).toString().padStart(2, "0")}-${(startingDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${(startingDate.getUTCDate()).toString().padStart(2, "0")}`
                let startingDate_ms = startingDate.getTime();
                let startingDate_factor = startingDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                }) 

                let endingDate = new Date(Date.now() - (7 + w) * 24 * 60 * 60 * 1000)
                let endingDate_formatted = `${(endingDate.getUTCFullYear()).toString().padStart(2, "0")}-${(endingDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${(endingDate.getUTCDate()).toString().padStart(2, "0")}`
                let endingDate_ms = endingDate.getTime();

                fourWeekData.push({ factor: `${startingDate_factor}`, starting_date: { startingDate_formatted, startingDate_ms }, finishing_date: { endingDate_formatted, endingDate_ms }, amount: 0 })
                w = w + 7
            }


            monthlyMessages.forEach((record) => {
                let creation_date = new Date(record.created_formatted.slice(0, 10));
                let creation_date_ms = creation_date.getTime()
                let position = fourWeekData.findIndex((item) => item.starting_date.startingDate_ms >= creation_date_ms && item.finishing_date.endingDate_ms <= creation_date_ms);
                if (position != -1) {
                    fourWeekData[position].amount = fourWeekData[position].amount + 1;
                } else {
                    return
                }
            });

            let activeChannels = []

            monthlyMessages.forEach((message) => {
                let channel = message.channelID
                let position = activeChannels.findIndex((item) => item.channel === channel);
                if (position != -1) {
                    activeChannels[position].amount = activeChannels[position].amount + 1;
                } else {
                    activeChannels.push({ channel: channel, amount: 1 })
                }
            })
            activeChannels.sort((a, b) => b.amount - a.amount);
            activeChannels = activeChannels.slice(0, 5)


            let activeUsers = []

            monthlyMessages.forEach((message) => {
                let messageAuthor = message.author
                let position = activeUsers.findIndex((item) => item.author === messageAuthor);
                if (position != -1) {
                    activeUsers[position].amount = activeUsers[position].amount + 1;
                } else {
                    activeUsers.push({ author: messageAuthor, amount: 1 })
                }
            })
            activeUsers.sort((a, b) => b.amount - a.amount);
            activeUsers = activeUsers.slice(0, 5);

            let activeHourData = []

            let o = 0

            while (o < 25) {
                if (o < 10) {
                    activeHourData.push({ hour: `0${i}`, amount: 0 });
                } else {
                    activeHourData.push({ hour: `${i}`, amount: 0 });
                }
                o = o + 1
            }

            monthlyMessages.forEach((record) => {
                let minutes = [record.created_formatted.slice(11, 13)];
                minutes.forEach((minute) => {
                    let position = activeHourData.findIndex((item) => item.hour === minute);
                    if (position != -1) {
                        activeHourData[position].amount = activeHourData[position].amount + 1;
                    } else {
                        activeHourData.push({ hour: minute, amount: 1 });
                    }
                });
            });
            activeHourData.sort((a, b) => b.amount - a.amount);
            activeHourData = activeHourData.slice(0, 5)
            activeHourData.sort((a, b) => a.hour - b.hour);

            let discordDataOUT = [{ channels: [], users: [] }]
            activeChannels.forEach((item) => {
                discordDataOUT[0].channels.push(item.channel);
            })
            activeUsers.forEach((item) => {
                discordDataOUT[0].users.push(item.author);
            })

            const discordDataIN_Req = await fetch(
                `${process.env.BOT_API_URL}/fetchID/${guild.discordID}`,
                {
                    body: JSON.stringify(discordDataOUT),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST'
                }
            );
            const discordDataIN = await discordDataIN_Req.json();

            let finalData = []
            finalData.push({ HourData: hourData, WeekData: weekData, FourWeekData: fourWeekData, ChannelData: activeChannels, ActiveUsersData: activeUsers, ActiveHourData: activeHourData, ID: discordDataIN })





            return Response.json({ finalData });

        } catch (err) {
            let notFound = [{ errorCode: 404 }];
            return Response.json({ notFound });
            console.log(err)
        }
    } catch (err) {
        if (err.status == 400) {
            let notFound = [{ errorCode: 404 }];
            return Response.json({ notFound });
        }
    }
}