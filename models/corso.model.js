// import
const { EntitySchema } = require("typeorm");

// schema corso
const Corso = new EntitySchema({
    name: "Corso",
    tableName: "corsi",
    columns: {
        id: {                                   //-> nome della colonna che si crea
            name: "id",                         //-> colonna di riferimento del seed, può essere diversa
            primary: true,                      //-> chiave primaria
            generated: true,                    //-> AUTO_INCREMENT
            nullable: false,                    //-> non può essere NULL
            type: Number                        //-> tipo
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
        prenotazioni: {                             //-> nome della relazione, permette: "Corso.prenotazioni"
            target: "Prenotazione",                 //-> entità di target
            type: "one-to-many",                    //-> tipo di relazione
            inverseSide: { name: "corso_id" }       //-> fa riferimento alla join nella sezione "many"
        }
    }
});

// export
module.exports = { Corso };