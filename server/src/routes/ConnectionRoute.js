import express from "express";
import { GetResources } from "external";
const ConnectionRouter = new express.Router();

ConnectionRouter.get('/connections', (req, res, callback) => {
    const { travelSolutions, arrivalTime, from, to } = req.query;
    GetResources( travelSolutions, arrivalTime, from, to, function (data) {
        res.send(data);
    })
})

export default ConnectionRouter;
