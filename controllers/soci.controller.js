// import
const { FiltriSociSchema, trovaSoci } = require("../services/soci.service");
const { HttpError } = require("../lib/http.error");

// * DONE: restituisce tutti i corsi ordinati per nome e permette le ricerche tramite query
const trovaSociController = async (req, res) => {

    const risultato = FiltriSociSchema.safeParse(req.query);               //-> non lancia eccezioni, effettua la validazione dei dati serve per es: /api/corsi?livello=base

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        throw new HttpError(400, "Dati non validi");         //-> mostra l'issue dell'errore 
    };

    const corso = await trovaSoci(risultato.data);                         //-> al services passa solo dati validati (query)
    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
};

// export
module.exports = {
    trovaSociController
}