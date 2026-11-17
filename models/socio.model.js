// import
const { EntitySchema } = require("typeorm")

const Socio = new EntitySchema({
    name: "Socio",
    tableName: "soci",
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
        email: {
            name: "email",
            nullable: false,
            type: String
        },
    },
    relations: {
        prenotazioni: {
            target: "Prenotazione",
            type: "one-to-many",
            inverseSide: { name: "socio_id" }       //-> fa riferimento alla join
        }
    }
});

module.exports = { Socio };