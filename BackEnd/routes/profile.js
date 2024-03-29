const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");
require("dotenv").config();

const CLIENT_URL = "http://localhost:3000/";

async function getProfile(steamID) {
  try {
    const response = await axios.get(
      ` http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching the profile", error);
  }
}

router.get(`/profile/:steamID`, async (req, res) => {
  const steamID = req.params.steamID;
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: await getProfile(steamID),
    });
  }
});

module.exports = router;
