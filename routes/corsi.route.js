// import
const { Router } = require("express");
const { CorsiSchema, FiltriCorsiSchema, IdSchema, trovaCorsi, trovaCorsoById, creaCorso, eliminaCorso } = require("../services/corsi.service");

const router = Router();                                                     //-> creazione router    


// * DONE: restituisce tutti i corsi ordinati per nome e permette le ricerche tramite query
router.get("/", async (req, res) => {
    const risultato = FiltriCorsiSchema.safeParse(req.query);               //-> non lancia eccezzioni, effettua la validazione dei dati serve per es: /api/corsi?livello=base

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
    res.status(200).json(corso);                                            //-> restituisce statusCode e JSON
});

// * DONE: permette di creare un corso
// TODO: implementare verifica per evitare doppio corso con campi uguali
router.post("/", async (req, res) => {
    const risultato = CorsiSchema.safeParse(req.body);                      //-> non lancia eccezzioni, effettua la validazione dei dati

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore
    };

    const corso = await creaCorso(risultato.data);                          //-> al services passa solo dati validati {Corso}

    res.status(201).json(corso);                                            //-> restituisce statusCode e JSON
});

// * DONE: permette di eliminare un corso per id
router.delete("/:id", async (req, res) => {
    const risultato = IdSchema.safeParse(req.params);                       //-> effettua la validazione dei dati passati come params

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });    //-> mostra l'issue dell'errore
    };

    const corso = await eliminaCorso(risultato.data.id);                    //-> al services passa solo dati validati (id)
    res.status(204).end()                                                   //-> restituisce statusCode e chiude la connessione
});

// export
module.exports = { routerCorsi: router };