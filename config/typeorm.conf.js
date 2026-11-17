// import
const { DataSource } = require("typeorm");
const { Corso } = require("../models/corso.model");
const { Socio } = require("../models/socio.model");
const { Prenotazione } = require("../models/prenotazione.model");
const path = require("node:path");

const AppDataSource = new DataSource({
    type: "better-sqlite3",
    entities: [Corso, Socio, Prenotazione],
    database: path.join(__dirname, "..", "db", "db.sqlite"),
    synchronize: true
});

module.exports = { AppDataSource };