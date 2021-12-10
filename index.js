const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.use(bodyParser.json())

app.use(express.static("public"));

// index
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// timestamp API
app.get("/api/:date?", (req, res) => {
  const dateInput = req.params.date;
  let date;

  // checking if no date input is provided in the api 
  if (!dateInput) {
    date = new Date();
  } else {
   // if string date is multiplied by 1, it will give NaN, while number will return number. So, checking for unix number
    const checkUnix = dateInput * 1;
    date = isNaN(checkUnix) ? new Date(dateInput) : new Date(checkUnix);
  }

  //check if date input format is valid
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

var listener = app.listen(process.env.PORT || 5500, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

