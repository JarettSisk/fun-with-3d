const express = require('express');
const nunjucks = require("nunjucks");
var path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.get("/product", async function(req, res, next) {
    try {
      return res.render("product.html");
    } catch (err) {
      return next(err);
    }
  });


/** 404 handler */
app.use(function(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  
  /** general error handler */
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.render("error.html", { err });
  });

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
