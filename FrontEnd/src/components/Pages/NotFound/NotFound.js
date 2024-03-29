import classes from "./NotFound.module.scss";

import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <img src="https://media1.tenor.com/m/JfLi0ktt7WUAAAAC/counter-strike-global-offensive.gif" />
      <h1>404</h1>
      <h3>This wasn't supposed to happen.</h3>
      <h3>
        Feel free to rush back to the <Link to="/">Home Page</Link>
      </h3>
    </div>
  );
};

export default NotFound;
