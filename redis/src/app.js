const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const { json } = require("body-parser");

const client = createClient();
const EXPIRATION = 3600;
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;
    const d = await client.get(`photos?albumId=${albumId}`, async (e, photos) => {
        if (e) console.log(e);
        if (photos != null) {
            return res.json(JSON.parse(photos));
        }
    });
    if (d == null) {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
            { params: { albumId } }
        );
        client.setEx(`photos?albumId=${albumId}`, EXPIRATION, JSON.stringify(data));
        return res.json(data);
    } else {
        res.json(JSON.parse(d));
    }
});
app.get("/photos/:id", async (req, res) => {
    const d = await client.get(`photos:${req.params.id}`, async (e, photos) => {
        if (e) console.log(e);
        if (photos != null) {
            return res.json(JSON.parse(photos));
        }
    });
    if (d == null) {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
        );
        client.setEx(`photos:${req.params.id}`, EXPIRATION, JSON.stringify(data));
        return res.json(data);
    } else {
        res.json(JSON.parse(d));
    }
});
app.listen(port, () => {
    console.log("server is running on", port);
});
const connect = async () => {
    await client.connect();
};
connect();
