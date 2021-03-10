const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(express.json());

app.post("/search", async function (req, res) {
  let err = false;
  let response = await fetch(req.body.endpoint).catch((e) => {
    if (e.code == "EPROTO") {
      res.status(400).send({
        error: `Unable to create a connection over HTTPS to ${req.body.endpoint}. Maybe the endpoint doesn't support SSL connections, try switching to http`,
      });
      err = true;
    } else {
      res.status(500).send({ error: `${e}` });
      err = true;
    }
  });
  if (!err) {
    try {
      if (response.ok) {
        res.status(200).send({
          status: "unsecure",
          data: {
            endpoint: req.body.endpoint,
            response_status: response.status,
            response_status_text: response.statusText,
            response_headers: response.headers.raw(),
          },
        });
      } else {
        if (response.status == 401) {
          res.status(200).send({
            status: "secure",
            data: {
              endpoint: req.body.endpoint,
              response_status: response.status,
              response_status_text: response.statusText,
              response_headers: response.headers.raw(),
            },
          });
        } else {
          res.status(200).send({
            status: "unknown",
            data: {
              endpoint: req.body.endpoint,
              response_status: response.status,
              response_status_text: response.statusText,
              response_headers: response.headers.raw(),
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
