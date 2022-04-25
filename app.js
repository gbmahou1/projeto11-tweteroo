import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    const result = users.filter(user => {return user.username === username});
    if (result.length != 0)
    {
        res.sendStatus(409);
    }
    else
    {
        users.push({username, avatar});
        res.status(201);
        res.send("OK");
    }  
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const result = users.filter(user => {return user.username === username});
    if (result.length === 0)
    {
        res.sendStatus(409);
    }
    else
    {
        const avatar = result[0].avatar;
        tweets.push({username, avatar, tweet});
        res.status(201);
        res.send("OK");
    }  
})

app.get("/tweets", (req, res) => {
    if (tweets.length < 11)
    {
        res.status(201);
        res.send(tweets);
    }
    else
    {
        res.status(201);
        res.send(tweets.slice(Math.max(tweets.length - 10, 0)));
    }
})

app.listen(5000);