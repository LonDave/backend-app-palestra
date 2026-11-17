// import
const { DataSource } = require("typeorm");
const { Corso } = require("../models/corso.model");
const { Socio } = require("../models/socio.model");
const { Prenotazione } = require("../models/prenotazione.model");
const path = require("node:path");

// creazione di DataSource
const AppDataSource = new DataSource({
    type: "better-sqlite3",                                         //-> tipo del driver
    entities: [Corso, Socio, Prenotazione],                         //-> entità
    database: path.join(__dirname, "..", "db", "db.sqlite"),        //-> percorso del db 
    synchronize: true                                               //-> crea le tabelle, da evitare in produzione a favore delle migrazioni
});

// export
module.exports = { AppDataSource };