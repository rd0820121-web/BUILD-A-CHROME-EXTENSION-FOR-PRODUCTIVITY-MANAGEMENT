const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/productivity");

const app = express();
app.use(cors());
app.use(express.json());

const Activity = require("./models/Activity");

app.post("/api/activity", async (req, res) => {
    const { domain, timeSpent } = req.body;

    await Activity.create({
        domain,
        timeSpent,
        date: new Date()
    });

    res.json({ message: "Activity saved" });
});

app.get("/api/activity/report", async (req, res) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const activities = await Activity.find({
        date: { $gte: today }
    });

    let total = 0;
    activities.forEach(a => total += a.timeSpent);

    res.json({
        productive: Math.round(total / 60000)
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
