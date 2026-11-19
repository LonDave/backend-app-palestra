// import
const express = require("express");
const { AppDataSource } = require("./config/typeorm.conf");
const { join } = require("node:path");
const fs = require("node:fs/promises");
const dotEnv = require("dotenv");
const { routerCorsi } = require("./routes/corsi.route");
const { routerSoci } = require("./routes/soci.route");
const { HttpError } = require("./lib/http.error");


dotEnv.config(join(__dirname, ".env"));                                                         //-> percorso del dotEnv 

const app = express();                                                                          //-> express
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;                                //-> dichiarazione porta, se presente prende la "Number" altrimenti la 3000
const SEED = join(__dirname, "seeds", "seme.sql");                                              //-> percorso del seed


// promise, async di default
AppDataSource.initialize()
    .then(async (ds) => {

        // seeding del db
        const corsi = await ds.query("SELECT COUNT (*) AS cnt FROM CORSI");                     //-> vede se presenti el in db
        if (corsi[0].cnt === 0) {
            const singleQuery = await fs.readFile(SEED).then(buff => buff.toString("utf-8"));   //-> query singola
            await ds.driver.databaseConnection.exec(singleQuery);                               //-> esegue tutte le query
        } else {
            console.log("Database già popolato.")                                               //-> altrimenti db già popolato
        };

        // TODO 1: middleware 
        app.use(express.json());

        // TODO 2: montaggio rotte 
        app.use("/api/corsi", routerCorsi);
        app.use("/api/soci", routerSoci);

        // TODO 3: gestore errori
        app.use((err, req, res, next) => {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ errore: err.message });
            };
            console.log(err);
            res.status(500).json({ errore: "Errore interno del server" });
        });

        // listen del server
        app.listen(PORT, () => {
            console.log(`Server live on port: ${PORT}.`);
        });
    })
    .catch((error) => {                                                                         //-> prende l'errore
        console.log(`Errore durante l'inizializzazione del database: ${error}`);
        process.exit(-1);                                                                       //-> negativo segnala err
    })
