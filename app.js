const express = require("express");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const URLs = require("./models/URLs");
const app = express();

// Mongoose configuration
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Add your own MongoDB Atlas credentials for the app to work
mongoose.connect(
  "mongodb+srv://<username>:<password>@<dbname>.tnyr3.mongodb.net/<db-name>?retryWrites=true&w=majority",
  options
);

// App configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// Home route
app.get("/", async (req, res) => {
  const listOfUrls = await URLs.find();
  res.render("index", { listOfUrls });
});

// Redirection route (from endpoint to full URL)
app.get("/:endpoint", async (req, res) => {
  // Check for endpoint and get current date
  const endpoint = await URLs.findOne({ endpoint: req.params.endpoint });
  const currentDate = new Date().toLocaleDateString();

  if (endpoint == null) {
    return res.sendStatus(404);
  }

  // Update URL data in the database
  endpoint.clicks++;
  endpoint.lastAccesed = currentDate;
  endpoint.save();

  res.redirect(endpoint.fullUrl);
});

// Details route
app.get("/:endpoint/stats", async (req, res) => {
  const urlDetails = await URLs.findOne({ endpoint: req.params.endpoint });

  // Check for endpoint existence
  if (urlDetails == null) {
    return res.sendStatus(404);
  }

  res.render("endpointDetails", { urlDetails });
});

// URL creation route (add a route to database)
app.post("/createUrl", async (req, res) => {
  const fullUrl = req.body.fullUrl;

  // Validation for full URL
  if (!validUrl.isUri(fullUrl)) {
    return res.status(401).json("[ERROR] Invalid url");
  }

  // Endpoint vaidation
  const endpoint =
    req.body.customEndpoint === "" || req.body.customEndpoint === null
      ? nanoid(6)
      : req.body.customEndpoint;

  // New doc model
  const doc = {
    fullUrl,
    endpoint,
  };

  // Create document in database
  await URLs.create(doc);

  res.redirect("/");
});

// Deletion route (remove a route from database)
app.delete("/:endpoint", (req, res) => {
  const endpoint = req.params.endpoint;

  // Find and delete selected URL
  URLs.findOneAndDelete({ endpoint })
    .then(() => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

// Port configuration
const PORT = 5000;
app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
