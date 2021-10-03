const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const db = require("./models");

/**
 * Router
 *
 */
//event
const events = require('./routes/Events');
app.use("/events", events);

const register = require('./routes/RegisterEvent');
app.use("/register", register);

const viewUsers = require('./routes/ViewListUsers');
app.use("/view", viewUsers);

const auth = require("./routes/Auth");
app.use("/auth", auth);

const user = require("./routes/User");
app.use("/user", user);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    }); 
});