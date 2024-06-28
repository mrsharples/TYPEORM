import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/clients/:clientId", async (req, res) => {

    const { clientId } = req.params;

    const client = await Client.createQueryBuilder()
    .select('client.id') 
    .addSelect('client.first_name') 
    .addSelect('client.last_name')
    .addSelect('client.email')
    .addSelect('client.card_number')
    .addSelect('client.balance')
    .from(Client, 'client')
    .leftJoinAndSelect(
        'client.transactions', 'transactions'
    )
    .where("client.id = :clientId", { clientId })
    .getOne()

    return res.json(client)
})

export { router as fetchClientByIdRouter }