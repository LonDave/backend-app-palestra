// import
const { z } = require("zod");
const { AppDataSource } = require("../config/typeorm.conf");
const { HttpError } = require("../middleware/centralError.middleware");

const prenotazioniSchemaDelById = z.object({
    id: z.coerce.number().int().positive()                                                          //-> forza a numero per avere un filtro numerico
});

const prenotazioneSchema = z.object({
    socio_id: z.coerce.number().int().positive(),
    corso_id: z.coerce.number().int().positive()
});

/* 
    serve una funzione per evitare di eseguirlo quando il modulo viene caricato siccome "initialize()"
    in quel momento non è stato ancora eseguito ed andrebbe in errore
*/
const repoPrenotazioni = () => AppDataSource.getRepository("Prenotazione");
const repoCorsi = () => AppDataSource.getRepository("Corso");
const repoSoci = () => AppDataSource.getRepository("Socio");


// * DONE: crea una prenotazione verificando corso, socio e posti disponibili
const createPrenotazione = async ({ socio_id, corso_id }) => {

    const corsoFind = await repoCorsi().findOneBy({ id: corso_id });                                //-> cerca il corso
    if (!corsoFind) {
        throw new HttpError(404, "Corso inesistente");
    };

    const socioFind = await repoSoci().findOneBy({ id: socio_id });                                 //-> cerca il socio
    if (!socioFind) {
        throw new HttpError(404, "Socio inesistente");
    };

    const postiOccupati = await repoPrenotazioni().countBy({                                        //-> filtra attraverso la relazione "corso"
        corso: { id: corso_id }
    });
    if (postiOccupati >= corsoFind.posti) {
        throw new HttpError(409, "Posti esauriti");                                                 //-> 409: conflitto con lo stato attuale
    };

    const giaPrenotato = await repoPrenotazioni().existsBy({                                        //-> vede se esistono prenotazioni che associano id_socio e id_corso
        corso: { id: corso_id },
        socio: { id: socio_id }
    });
    if (giaPrenotato) {
        throw new HttpError(409, "Socio già prenotato a questo corso");
    };

    const prenotazione = repoPrenotazioni().create({ corso: corsoFind, socio: socioFind });         //-> conta le prenotazioni del corso
    return repoPrenotazioni().save(prenotazione);
}

// funzione per delete
const delPrenotazioneById = async (id) => {
    const prenotazione = await repoPrenotazioni().findOneBy({ id })

    if (!prenotazione) {
        return null;                                                                               //-> se il corso non esiste torna null
    };

    await repoPrenotazioni().remove(prenotazione);
    return prenotazione;
}

// export
module.exports = {
    prenotazioniSchemaDelById,
    prenotazioneSchema,
    createPrenotazione,
    delPrenotazioneById
}