// import
const { EntitySchema } = require("typeorm")

const Socio = new EntitySchema({
    name: "Socio",
    tableName: "soci",
    columns: {
        id: {                                       //-> nome della colonna che si crea
            name: "id",                             //-> colonna di riferimento del seed, può essere diversa
            primary: true,                          //-> chiave primaria
            generated: true,                        //-> AUTO_INCREMENT
            nullable: false,                        //-> non può essere NULL
            type: Number                            //-> tipo
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
        prenotazioni: {                             //-> nome della relazione, permette: "Socio.prenotazioni"
            target: "Prenotazione",                 //-> entità di target
            type: "one-to-many",                    //-> tipo di relazione
            inverseSide: { name: "socio_id" }       //-> fa riferimento alla join nella sezione "many"
        }
    }
});

// export
module.exports = { Socio };