// import 
const { EntitySchema } = require("typeorm");


const Prenotazione = new EntitySchema({
    name: "Prenotazione",
    tableName: "prenotazioni",
    columns: {
        id: {
            name: "id",                       //-> colonna di riferimento 
            primary: true,
            generated: true,
            nullable: false,
            type: Number
        }
    },
    relations: {
        socio: {                                //-> nome proprietà 
            target: "Socio",                    //-> nome dell'entità richiamata
            type: "many-to-one",                //-> tipo
            joinColumn: { name: "socio_id" }    //-> nome della colonna che andrà a creare
        },
        corso: {
            target: "Corso",
            type: "many-to-one",
            joinColumn: { name: "corso_id" }
        }
    }
});

module.exports = { Prenotazione };