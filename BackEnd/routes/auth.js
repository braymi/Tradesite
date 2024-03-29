const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");

const CLIENT_URL = "http://localhost:3000/";

async function getInventory(steamID) {
  try {
    const response = await axios.get(
      `https://steamcommunity.com/inventory/${steamID}/730/2?l=english&count=1000`
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching the inventory:", error);
  }
}

router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      // inventory: await getInventory(req.user.id),
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/steam", passport.authenticate("steam", { scope: ["profile"] }));

router.get(
  "/steam/return",
  passport.authenticate("steam", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
