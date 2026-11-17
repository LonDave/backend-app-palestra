// import
const { z } = require("zod");
const { AppDataSource } = require("../config/typeorm.conf");

// schema zod per i metodi get/delete
const FiltriCorsiSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(125).optional(),                             //-> necessario che siano optional per una corretta validazione
    istruttore: z.string().trim().min(1, "Inserire un istruttore").max(125).optional(),
    livello: z.enum(["base", "intermedio", "avanzato"]).optional(),
    posti: z.coerce.number().int().positive().optional()                                                //-> forza a numero per avere un filtro numerico
});

// schema zod per metodi post siccome si è deciso che i campi non possono essere opzionali
const CorsiSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(125),
    istruttore: z.string().trim().min(1, "Inserire un istruttore").max(125),
    livello: z.enum(["base", "intermedio", "avanzato"]),
    posti: z.number().int().positive()
});

/* 
    serve una funzione per evitare di eseguirlo quando il modulo viene caricato siccome "initialize()"
    in quel momento non è stato ancora eseguito ed andrebbe in errore
*/
const repoCorsi = () => AppDataSource.getRepository("Corso");

// * DONE: Visualizzazione di tutti i corsi e possibilità di  query -> es: "?livello=base"
// * DONE: tutti i corsi in ordine alfabetico 
const trovaCorsi = async (filtri = {}) => {
    return repoCorsi().find({
        where: filtri,                                                                                  //-> prende i valori che corrispondono ai filtri
        order: { name: "ASC" }                                                                          //-> pone l'ordine ASC
    });
};

// TODO: singolo corso


// TODO: creazione


// TODO: eliminazione

// export
module.exports = {
    FiltriCorsiSchema,
    CorsiSchema,
    trovaCorsi,
    // creaCorso,
    // trovaCorsoById,
    // eliminaCorso
}