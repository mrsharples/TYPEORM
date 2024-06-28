import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {

    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne({where: {id: parseInt(clientId)}})

    if (!client) {
        return res.json({
           message: "Client not found" 
        })
    }

    const transaction = Transaction.create({
        amount,
        type,
        client
    });

    await transaction.save();

    if (type === TransactionTypes.DEPOSIT) {
        client.balance = Number(client.balance) + amount;
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance = Number(client.balance) - amount;
    } 

    await client.save();

    return res.json({
        message: "Transaction successful",
        transaction: transaction
    })

});

export {
    router as createTranctionRouter
}

