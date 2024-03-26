const passport = require("passport");
const { Strategy } = require("passport-local");
const passwordUtil = require("./hash");
const pool = require("../db");

passport.serializeUser(async (username, done) => {
  console.log("serialized user");
  done(null, username);
});

passport.deserializeUser(async (username, password, done) => {
  console.log("deserialized user");
  console.log(username);
  try {
    // const user = User.findById(_id);
    console.log(username);
    console.log(password);
    const user = await pool.query(
      "SELECT * FROM LOGIN WHERE email username LIKE ($1) AND password LIKE ($2)",
      [username, password]
    );
    if (user.length() == 0) {
      throw new Error("User not found");
    }
    done(null, username, password);
  } catch (error) {
    console.log(error);
  }
});

passport.use(
  new Strategy(
    {
      username: "username",
      password: "password",
    },
    async (username, password, done) => {
      console.log(username);
      console.log(typeof username);
      console.log(password);
      console.log(typeof password);

      if (!username || !password) {
        return done(
          new Error("Please enter username and password, Missing Credential"),
          null
        );
      }
      console.log(username);
      console.log(password);
      try {
        const result = await pool.query(
          "SELECT * FROM login WHERE email = $1",
          [username]
        );
        console.log(result);
        const { rows } = result;
        const userExist = rows[0];
        console.log(userExist + "USER EXIST");
        if (!userExist) {
          return done(null, false, { message: "Incorrect username" });
        }

        // const isValid = passwordUtil.comparePassword(
        //   password,
        //   userExist.password
        // );
        // password === userExist.password;
        const isValid = true;
        console.log(isValid);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password" });
        }
        if (isValid) {
          console.log("Valid password");
          return done(null, userExist);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
