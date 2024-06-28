import express from "express";

import { appDataSource } from "../hidden/appDataSource";

import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTranctionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { disconnectBankerToClientRouter } from "./routes/disconnect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { deleteBankerRouter } from "./routes/delete_banker";
import { fetchClientRouter } from "./routes/fetch_clients";
import { fetchClientByIdRouter } from "./routes/fetch_client_by_id";

const app = express();

const main = async () => {
    try {

        await appDataSource.initialize();
        console.log('Connected to Postgres')

        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTranctionRouter);
        app.use(connectBankerToClientRouter);
        app.use(disconnectBankerToClientRouter);
        app.use(deleteClientRouter);
        app.use(deleteBankerRouter);
        app.use(fetchClientRouter);
        app.use(fetchClientByIdRouter);

        app.listen(8080, () => {
            console.log('Now running on port 8080');
        });

    } catch (err) {
        console.log(err);
        throw new Error('Unable to connect to database');
    }
}

main();