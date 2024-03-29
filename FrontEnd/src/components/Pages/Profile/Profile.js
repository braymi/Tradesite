import classes from "./Profile.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";

const Profile = ({ fetchData, user }) => {
  const navigate = useNavigate();
  let { profileId } = useParams();
  const [inventoryData, setInventoryData] = useState(null);

  const [profile, setProfile] = useState(null);

  async function getUser() {
    fetch(`http://localhost:5000/profile/${profileId}`, {
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
        setProfile(resObject.user.response.players[0]);
        console.log(resObject.user.response.players[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (profile && inventoryData) {
    return (
      <div className={classes.wrapper}>
        <span className={classes.profileWrap}>
          <h1>User profile</h1>
          <div className={classes.headline}>
            <div className={classes.headlineDetail}>
              <img src={profile.avatarmedium} />
              <h2>{profile.personaname}</h2>
            </div>
            {profile.steamid === user.id ? (
              <></>
            ) : (
              <Stack
                direction="column"
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginRight: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => window.open(profile.profileurl, "_blank")}
                >
                  Add on Steam
                </Button>
                <Button variant="contained" endIcon={<ImportExportIcon />}>
                  Send a Trade Offer
                </Button>
              </Stack>
            )}
          </div>
          <h1>Inventory</h1>
          <div className={classes.inventory}>
            {Object.keys(inventoryData).map((item, i) => (
              <div
                className={classes.tooltip}
                // arrow
                // title={inventoryData[item].item_name}
                key={i}
                style={{
                  border: `0.2rem solid #${inventoryData[item].color}`,
                }}
              >
                <img
                  src={inventoryData[item].item_picture}
                  style={{ width: "10rem" }}
                />

                {/* <a href={inventoryData[item].inspect}>Inspect in-game</a> */}
                <div className={classes.tooltiptext}>
                  <p>{inventoryData[item].item_name}</p>
                  <p>{inventoryData[item].item_wear}</p>
                </div>
              </div>
            ))}
          </div>
        </span>
        <span className={classes.tradeWrap}>
          <h1>Trades</h1>
        </span>
      </div>
    );
  } else {
    fetchData(profileId)
      .then((data) => {
        data === undefined ? navigate("/404") : setInventoryData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    getUser();
    return <CircularProgress color="secondary" size={"50vh"} />;
  }
};

export default Profile;
