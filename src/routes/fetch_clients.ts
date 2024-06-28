import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/clients", async (req, res) => {

    const clients = await Client.createQueryBuilder()
    .select('client.id') 
    .addSelect('client.first_name') 
    .addSelect('client.last_name')
    .addSelect('client.email')
    .addSelect('client.card_number')
    .addSelect('client.balance')
    .from(Client, 'client')
    .orderBy("client.id")
    .getMany()

    return res.json(clients)
})

export { router as fetchClientRouter }