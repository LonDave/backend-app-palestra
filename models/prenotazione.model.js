// import 
const { EntitySchema } = require("typeorm");


const Prenotazione = new EntitySchema({
    name: "Prenotazione",
    tableName: "prenotazioni",
    columns: {
        id: {                                   //-> nome della colonna che si crea
            name: "id",                         //-> colonna di riferimento del seed, può essere diversa
            primary: true,                      //-> chiave primaria
            generated: true,                    //-> AUTO_INCREMENT
            nullable: false,                    //-> non può essere NULL
            type: Number                        //-> tipo
        }
    },
    relations: {
        socio: {                                //-> nome della relazione, permette "Prenotazione.socio"
            target: "Socio",                    //-> entità di target
            type: "many-to-one",                //-> tipo di relazione
            joinColumn: { name: "socio_id" }    //-> crea una colonna con name:"nome"
        },
        corso: {                                //-> nome della relazione, permette "Prenotazione.socio"
            target: "Corso",                    //-> entità di target
            type: "many-to-one",                //-> tipo di relazione
            joinColumn: { name: "corso_id" }    //-> crea una colonna con name:"nome"
        }
    }
});

// export
module.exports = { Prenotazione };