const passport = require("passport");
const { Strategy } = require("passport-local");
const passwordUtil = require("./hash");
const pool = require("../db");

passport.serializeUser(async (user, done) => {
  console.log("serialized user");
  console.log(user);
  done(null, user.email, user.password);
});

passport.deserializeUser(async (user, done) => {
  // console.log("deserialized user");
  //console.log(user);
  try {
    const result = await pool.query("SELECT * FROM LOGIN WHERE email = $1 ", [
      user,
    ]);
    //console.log("deserialized user 1");
    if (!result) {
      throw new Error("User not found");
    }
    console.log("deserialized user 2");
    const deserializedUser = {
      email: result.rows[0].email,
      role: result.rows[0].role,
    };
    done(null, deserializedUser);
  } catch (error) {
    //console.log("deserialized user 3");
    //console.log(error);
  }
});

passport.use(
  new Strategy(
    {
      username: "username",
      password: "password",
    },
    async (username, password, done) => {
      if (!username || !password) {
        return done(
          new Error("Please enter username and password, Missing Credential"),
          null
        );
      }
      try {
        const result = await pool.query(
          "SELECT * FROM login WHERE email = $1",
          [username]
        );
        if (result.rows.length > 0) {
          const userExist = {
            email: result.rows[0].email,
            role: result.rows[0].role,
          };
          //console.log(userExist + "USER EXIST");
          if (!userExist) {
            return done(null, false, { message: "Incorrect username" });
          }

          const isValid = passwordUtil.comparePassword(
            password,
            result.rows[0].password
          );

          // const isValid = true;
          

          if (isValid) {
            //console.log("Valid password");
            return done(null, userExist);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
