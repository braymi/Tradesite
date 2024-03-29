import classes from "./Navigation.module.scss";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import ProfileButton from "./ProfileButton";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ user }) => {
  function renderButtons() {
    if (user) {
      return (
        // <div style={{ display: "flex", gap: "1rem" }}>
        //   <a
        //     href="http://localhost:5000/auth/logout"
        //     style={{
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //     }}
        //   >
        //     <LogoutIcon fontSize="large" />
        //     <h4>Logout</h4>
        //   </a>
        // </div>
        <ProfileButton
          src={user.photos[1].value}
          name={user.displayName}
          id={user.id}
        />
      );
    }
    return (
      <a href="http://localhost:5000/auth/steam">
        <img
          src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
          style={{ height: "2rem" }}
        />
      </a>
    );
  }
  return (
    <header>
      <nav>
        <div>
          <Link to="/">
            <img
              src="https://old.csgolounge.com/public/images/5d6e7a4cc68f97dd863ede95f48b424e.svg"
              style={{ backgroundColor: "#000000" }}
            />
          </Link>

          <ul>
            <li>
              <ImportExportIcon fontSize="large" />
              <Link to="/mytrades">My Trades</Link>
            </li>
            <li>
              <SearchIcon fontSize="large" />
              <p>Search</p>
            </li>
            <li>
              <BookmarkIcon fontSize="large" />
              <p>Bookmarks</p>
            </li>
            <li>
              <AddIcon fontSize="large" />
              <p>Add Trade</p>
            </li>
          </ul>
        </div>
        {renderButtons()}
      </nav>
    </header>
  );
};

export default Navigation;
