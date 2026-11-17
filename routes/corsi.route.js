// import
const { Router } = require("express");
const { CorsiSchema, FiltriCorsiSchema, IdSchema, trovaCorsi, trovaCorsoById, creaCorso, eliminaCorso } = require("../services/corsi.service");

const router = Router();                                                     //-> creazione router    


// * DONE: restituisce tutti i corsi ordinati per nome e permette le ricerche tramite query
router.get("/", async (req, res) => {
    const risultato = FiltriCorsiSchema.safeParse(req.query);               //-> non lancia eccezioni, effettua la validazione dei dati serve per es: /api/corsi?livello=base

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore 
    };

    const corso = await trovaCorsi(risultato.data);                         //-> al services passa solo dati validati (query)
    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
});

// * DONE: restituisce i corsi per ID tramite ricerca per params
router.get("/:id", async (req, res) => {
    const risultato = IdSchema.safeParse(req.params);                       //-> effettua la validazione dei dati passati come params

    if (!risultato.success) {
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore
    };

    const corso = await trovaCorsoById(risultato.data.id);                  //-> al services passa solo dati validati (id)

    if (!corso) {
        return res.status(400).json({ errore: "Corso non trovato" });
    };

    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
});

// * DONE: permette di creare un corso evita doppioni controllando se almeno un record esiste già
router.post("/", async (req, res) => {
    const risultato = CorsiSchema.safeParse(req.body);                      //-> non lancia eccezioni, effettua la validazione dei dati

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore
    };

    const corso = await creaCorso(risultato.data);                          //-> al services passa solo dati validati {Corso}

    if (!corso) {                                                           //-> verifica se il corso è già presente all'interno del db
        return res.status(409).json({ errore: "Corso già presente" })       //-> messaggio di errore se corso già presente
    };

    res.status(201).json(corso);                                            //-> restituisce statusCode e JSON
});

// * DONE: permette di eliminare un corso per id
router.delete("/:id", async (req, res) => {
    const risultato = IdSchema.safeParse(req.params);                       //-> effettua la validazione dei dati passati come params

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore
    };

    const corsoEliminato = await eliminaCorso(risultato.data.id);           //-> al services passa solo dati validati (id)

    if (!corsoEliminato) {
        return res.status(409).json({ errore: "Corso inesistente" })        //-> messaggio di errore se il corso che si vuole eliminare non esiste
    }

    res.status(204).end()                                                   //-> restituisce statusCode e chiude la connessione
});

// export
module.exports = { routerCorsi: router };