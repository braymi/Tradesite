import classes from "./MyTrades.module.scss";

const MyTrades = ({ user }) => {
  console.log(user);
  return (
    <div className={classes.wrapper}>
      <span className={classes.profileWrap}>
        <h1>My Trades</h1>
        <div className={classes.headline}>
          <div className={classes.headlineDetail}></div>
        </div>
      </span>
    </div>
  );
};

export default MyTrades;
