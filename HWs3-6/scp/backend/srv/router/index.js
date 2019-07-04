"use strict";

module.exports = (app, server) => {
    app.use("/news", require("./routes/news")());
    app.use("/dest", require("./routes/dest")());
};
