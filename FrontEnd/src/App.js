import "./App.css";
import { useEffect, useState, createContext } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import MainPage from "./components/Pages/MainPage/MainPage";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Pages/Profile/Profile";
import NotFound from "./components/Pages/NotFound/NotFound";
import MyTrades from "./components/Pages/MyTrades/MyTrades";

import itemdata from "./items.js";

import { createClient } from "@supabase/supabase-js";

function App() {
  const supabase = createClient(
    "https://seixnqvtmabbeoohheur.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlaXhucXZ0bWFiYmVvb2hoZXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4NDMyMjksImV4cCI6MjAxOTQxOTIyOX0.3NRLVNa6mRUOydwiK-pwCNJ0UqwuvLPnWOwMEKvMhXA"
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          // console.log(resObject);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  // const user = {
  //   provider: "steam",
  //   _json: {
  //     steamid: "76561198211359205",
  //     communityvisibilitystate: 3,
  //     profilestate: 1,
  //     personaname: "Jezzeee",
  //     commentpermission: 1,
  //     profileurl: "https://steamcommunity.com/id/iswaggero/",
  //     avatar:
  //       "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     avatarmedium:
  //       "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     avatarfull:
  //       "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     avatarhash: "3085f4b2818448e7149a990dd4f7a80845ed505c",
  //     lastlogoff: 1704285794,
  //     personastate: 1,
  //     primaryclanid: "103582791429521408",
  //     timecreated: 1293623999,
  //     personastateflags: 0,
  //     loccountrycode: "HU",
  //   },
  //   id: "76561198211359205",
  //   displayName: "Jezzeee",
  //   photos: [
  //     {
  //       value:
  //         "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     },
  //     {
  //       value:
  //         "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     },
  //     {
  //       value:
  //         "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/492720/671e781506284d45c1261eb2a25a97acb96d49f0.gif",
  //     },
  //   ],
  //   identifier: "https://steamcommunity.com/openid/id/76561198211359205",
  // };

  const [inventory, setInventory] = useState(null);
  if (inventory === null && user !== null) {
    fetchData(user.id);
  }

  async function fetchData(id) {
    const { data, error } = await supabase.from(`${id}`).select();
    if (data) {
      setInventory(data);
      return data;
    } else {
      console.log(error);
    }
  }

  async function uploadInventory(
    data_picture,
    data_name,
    data_description,
    data_wear,
    data_rarity,
    data_color,
    data_inspect,
    data_stattrak
  ) {
    const uploads = {
      item_picture: data_picture,
      item_name: data_name,
      item_description: data_description,
      item_wear: data_wear,
      rarity: data_rarity,
      color: data_color,
      inspect: data_inspect,
      stattrak: data_stattrak,
    };
    await supabase.from(`${user.id}`).upsert(uploads);
  }

  //picture: "https://community.cloudflare.steamstatic.com/economy/image/" + d.icon_url
  //name = d.name,
  //description: d.descriptions[4].value
  //wear : d.tags[5].localized_tag_name
  //rarity: d.tags[4].localized_tag_name
  //color: d.tags[4].color
  //inspect:
  //stattrak: d.tags[3].localized_tag_name

  // console.log(
  //   itemdata.descriptions.map((d, i) => {
  //     return d.descriptions[4];
  //   })
  // );
  // console.log(itemdata.descriptions[100].descriptions[4].value);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function pushInventory() {
    for (let i = 0; i < itemdata.descriptions.length; i++) {
      console.log(`Waiting ${i} ticks...`);
      await sleep(i * 5);
      if (itemdata.descriptions[i].tags[0].localized_tag_name === "Container") {
        //Check for case
        await uploadInventory(
          "https://community.cloudflare.steamstatic.com/economy/image/" +
            itemdata.descriptions[i].icon_url,
          itemdata.descriptions[i].name,
          "Weapon Case",
          "Weapon Case",
          "Weapon Case",
          itemdata.descriptions[i].tags[3].color,
          "None",
          "Weapon Case"
        );
      } else if (
        //Check for graffiti and if it's tradable
        itemdata.descriptions[i].tradable === 0 ||
        itemdata.descriptions[i].type === "Base Grade Graffiti"
      ) {
      } else if (
        itemdata.descriptions[i].tags[0].localized_tag_name === "Agent"
      ) {
        await uploadInventory(
          "https://community.cloudflare.steamstatic.com/economy/image/" +
            itemdata.descriptions[i].icon_url,
          itemdata.descriptions[i].name,
          itemdata.descriptions[i].descriptions[2].value,
          "No wear",
          itemdata.descriptions[i].tags[3].localized_tag_name,
          itemdata.descriptions[i].tags[3].color,
          itemdata.descriptions[i].actions[0].link,
          itemdata.descriptions[i].tags[2].localized_tag_name
        );
      } else {
        await uploadInventory(
          "https://community.cloudflare.steamstatic.com/economy/image/" +
            itemdata.descriptions[i].icon_url,
          itemdata.descriptions[i].name,
          itemdata.descriptions[i].descriptions[4].value,
          itemdata.descriptions[i].tags[5].localized_tag_name,
          itemdata.descriptions[i].tags[4].localized_tag_name,
          itemdata.descriptions[i].tags[4].color,
          itemdata.descriptions[i].actions[0].link,
          itemdata.descriptions[i].tags[3].localized_tag_name
        );
      }
    }
  }

  return (
    <>
      <Navigation user={user} />
      {/* <button onClick={pushInventory}>Push</button> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/mytrades" element={<MyTrades user={user} />} />
        <Route
          path="/profile/:profileId"
          element={<Profile fetchData={fetchData} user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
