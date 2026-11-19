// import 
const { CorsiSchema, FiltriCorsiSchema, IdSchema, trovaCorsi, trovaCorsoById, creaCorso, eliminaCorso } = require("../services/corsi.service");
const { HttpError } = require("../lib/http.error");

// * DONE: restituisce tutti i corsi ordinati per nome e permette le ricerche tramite query
const tuttiCorsiController = async (req, res) => {

    const risultato = FiltriCorsiSchema.safeParse(req.query);               //-> non lancia eccezioni, effettua la validazione dei dati serve per es: /api/corsi?livello=base

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        throw new HttpError(400, "Errore di ricerca errata");               //-> errore personalizzato, ci entra quando non si rispetta lo schema zod 
    };

    const corso = await trovaCorsi(risultato.data);                         //-> al services passa solo dati validati (query)
    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
};

// * DONE: restituisce i corsi per ID tramite ricerca per params
const corsoByIdController = async (req, res) => {

    const risultato = IdSchema.safeParse(req.params);                       //-> effettua la validazione dei dati passati come params

    if (!risultato.success) {
        throw new HttpError(400, "Input richiesto number");                 //-> errore personalizzato, ci entra quando non si rispetta lo schema zod
    };

    const corso = await trovaCorsoById(risultato.data.id);                  //-> al services passa solo dati validati (id)

    if (!corso) {
        throw new HttpError(404, "Corso non trovato");                      //-> errore personalizzato, ci entra quando non esiste un corso
    };

    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
};

// * DONE: permette di creare un corso evita doppioni controllando se tutti i record sono doppioni
const creaCorsoController = async (req, res) => {

    const risultato = CorsiSchema.safeParse(req.body);                      //-> non lancia eccezioni, effettua la validazione dei dati

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        throw new HttpError(400, "Body non valido");                        //-> errore personalizzato, ci entra quando non si rispetta lo schema zod
    };

    const corso = await creaCorso(risultato.data);                          //-> al services passa solo dati validati {Corso}

    if (!corso) {                                                           //-> verifica se il corso è già presente all'interno del db
        throw new HttpError(409, "Corso già presente")                       //-> messaggio di errore se corso già presente
    };

    res.status(201).json(corso);                                            //-> restituisce statusCode e JSON
};

// * DONE: permette di eliminare un corso per id
const delCorsoController = async (req, res) => {

    const risultato = IdSchema.safeParse(req.params);                       //-> effettua la validazione dei dati passati come params

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        throw new HttpError(400, "Input richiesto number");                 //-> mostra l'issue dell'errore
    };

    const corsoEliminato = await eliminaCorso(risultato.data.id);           //-> al services passa solo dati validati (id)

    if (!corsoEliminato) {
        throw new HttpError(404, "Corso inesistente")                       //-> messaggio di errore se il corso che si vuole eliminare non esiste
    };

    res.status(204).end()                                                   //-> restituisce statusCode e chiude la connessione
};

// export
module.exports = {
    tuttiCorsiController,
    corsoByIdController,
    creaCorsoController,
    delCorsoController
}