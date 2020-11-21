var path = require("path");
var indexRouter = require("./index");
var pingRouter = require("./ping/ping");
var messageRouter = require("./message/message");

/* router  */
module.exports = (app) => {
  app.use("/api", indexRouter);

  app.use("/ping", pingRouter);

  app.use("/message", messageRouter);

  /* static file */
  app.use("*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "frontend", "build", "index.html")
    );
  });

  // error handler
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(err);
    // render the error page

    res.send(err);
  });
};
