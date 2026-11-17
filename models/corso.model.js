// import
const { EntitySchema } = require("typeorm");

// schema corso
const Corso = new EntitySchema({
    name: "Corso",
    tableName: "corsi",
    columns: {
        id: {
            name: "id",                       //-> colonna di riferimento 
            primary: true,
            generated: true,
            nullable: false,
            type: Number
        },
        name: {
            name: "nome",
            nullable: false,
            type: String
        },
        istruttore: {
            name: "istruttore",
            nullable: false,
            type: String
        },
        livello: {
            name: "livello",
            nullable: false,
            type: String
        },
        posti: {
            name: "posti",
            nullable: false,
            type: Number
        }
    },
    relations: {
        prenotazioni: {
            target: "Prenotazione",
            type: "one-to-many",
            inverseSide: { name: "corso_id" }       //-> fa riferimento alla join
        }
    }
});

// export
module.exports = { Corso };