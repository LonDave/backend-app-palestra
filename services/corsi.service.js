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

// schema zod per metodi get:id
const IdSchema = z.object({
    id: z.coerce.number().int().positive()                                                              //-> converte da stringa a numero
});


/* 
    serve una funzione per evitare di eseguirlo quando il modulo viene caricato siccome "initialize()"
    in quel momento non è stato ancora eseguito ed andrebbe in errore
*/
const repoCorsi = () => AppDataSource.getRepository("Corso");

// * DONE: Visualizzazione di tutti i corsi in ordine alfabetico e possibilità di  query -> es: "?livello=base"
const trovaCorsi = async (filtri = {}) => {
    return repoCorsi().find({
        where: filtri,                                                                                  //-> prende i valori che corrispondono ai filtri
        order: { name: "ASC" }                                                                          //-> pone l'ordine ASC
    });
};

// * DONE: ricerca del singolo corso per ID
const trovaCorsoById = async (id) => {
    return repoCorsi().findOneBy({ id });                                                               //-> null se non esiste
};


// * DONE: permette di creare un corso
// TODO: verificare se il corso sia già presente in db in caso non permette l'inserimento
const creaCorso = async (dati) => {
    const corso = repoCorsi().create(dati);
    return repoCorsi().save(corso);
}


// * DONE: permette di eliminare un corso per ID
const eliminaCorso = async (id)=>{
    const corso = await trovaCorsoById(id);
    if(!corso) return null;
    await repoCorsi().remove(corso);
    return corso;
}

// export
module.exports = {
    FiltriCorsiSchema,
    CorsiSchema,
    IdSchema,
    trovaCorsi,
    trovaCorsoById,
    creaCorso,
    eliminaCorso
}