import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.put("/api/connect/banker/:bankerId/client/:clientId", async (req, res) => {

    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({where: {id: parseInt(clientId)}})

    const banker = await Banker.findOne({where: {id: parseInt(bankerId)}})

    if (!banker || !client) {
        return res.json({
            message: "Banker or client not found"
        })
    }

    banker.clients.push(client)

    await banker.save();

    return res.json({
        message: "Banker connected to client"
    })


})

export { router as connectBankerToClientRouter}