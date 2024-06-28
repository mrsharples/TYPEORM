import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.put("/api/disconnect/banker/:bankerId/client/:clientId", async (req, res) => {

    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({where: {id: parseInt(clientId)}})

    const banker = await Banker.findOne({where: {id: parseInt(bankerId)}})

    if (!banker || !client) {
        return res.json({
            message: "Banker or client not found"
        })
    }

    const clientIndex = banker.clients.findIndex(clientElement => clientElement.id === client.id)

    if (clientIndex > -1) {

        banker.clients.splice(clientIndex, 1)

        await banker.save();

        return res.json({
            message: "Banker disconnected from client"
        })

    } else {

        return res.json({
            message: "Banker client connection not found"
        })

    }


})

export { router as disconnectBankerToClientRouter}