// import schema zod hhtpError
const { HttpError } = require("../lib/http.error");
const {
    prenotazioniSchemaDelById,
    prenotazioneSchema,
    createPrenotazione,
    delPrenotazioneById
} = require("../services/prenotazioni.service");

const creaPrenotazioneController = async (req, res) => {
    const risultato = prenotazioneSchema.safeParse(req.body);

    if (!risultato.success) {
        throw new HttpError(400, "Body non valido")
    }

    const prenotazione = await createPrenotazione(risultato.data);

    res.status(201).json(prenotazione);
};

const delPrenotazioneController = async (req, res) => {

    const risultato = prenotazioniSchemaDelById.safeParse(req.params);                      //-> autenticazione dati

    if (!risultato.success) {                                                               //-> se il safeparse fallisce
        throw new HttpError(400, "ID non valido");
    }

    const prenotazione = await delPrenotazioneById(risultato.data.id);                      //-> prende una prenotazione

    if (!prenotazione) {                                                                    //-> se la prenotazione non esiste
        throw new HttpError(404, "Prenotazione inesistente");
    }

    res.status(204).end()                                                                   //->
};

// export
module.exports = {
    creaPrenotazioneController,
    delPrenotazioneController
}