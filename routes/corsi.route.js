// import
const { Router } = require("express");
const { CorsiSchema, trovaCorsi, creaCorso, trovaCorsoById, eliminaCorso } = require("../services/corsi.service");

const router = Router();                                                     //-> creazione router    


// * DONE: get corsi
router.get("/", async (req, res) => {
    const risultato = CorsiSchema.safeParse(req.query);                     //-> non lancia eccezzioni, effettua la validazione dei dati serve per es: /api/corsi?livello=base

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });
    };

    const corso = await trovaCorsi(risultato.data);                         //-> al services passa solo dati validati (query)
    res.status(200).json(corso);                                            //-> restituisco statusCode e JSON
});

// * DONE: singolo corso con id
router.get("/:id", async (req, res) => {
    const IdSchema = z.coerce.number(req.params);                           //-> forza la conversione a numero
    const risultato = CorsiSchema.safeParse(IdSchema);                      //-> effettua la validazione

    if (!risultato.success) {
        return res.status(400).json({ errori: risultato.error.issues });
    };

    const corso = await trovaCorsoById(risultato.data.id);                  //-> al services passa solo dati validati (id)
    res.status(200).json(corso);                                            //-> restituisco statusCode e JSON
});

// * DONE: creazione corso
router.post("/", async (req, res) => {
    const risultato = CorsiSchema.safeParse(req.body);                      //-> non lancia eccezzioni, effettua la validazione dei dati

    if (!risultato.success) {                                               //-> se la validazione non avviene si ritorna 400 con errore
        return res.status(400).json({ errori: risultato.error.issues });
    };

    const corso = await creaCorso(risultato.data);                          //-> al services passa solo dati validati {Corso}
    res.status(201).json(corso);                                            //-> restituisco statusCode e JSON
});

// * DONE: eliminazione corso per id
router.delete("/:id", async (req, res) => {
    const IdSchema = z.coerce.number(req.params);
    const risultato = CorsiSchema.safeParse(IdSchema);

    if (!risultato.success) {
        return res.status(400).json({ errori: risultato.error.issues });
    };

    const corso = await eliminaCorso(risultato.data);
    res.status(204).end()
});

module.exports = { routerCorsi: router };