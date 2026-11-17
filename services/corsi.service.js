// import
const { z } = require("zod");
const { AppDataSource } = require("../config/typeorm.conf");

// schema zod per i metodi get/delete
const FiltriCorsiSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(60).optional(),                             //-> necessario che siano optional per una corretta validazione
    istruttore: z.string().trim().min(1, "Inserire un istruttore").max(60).optional(),
    livello: z.enum(["base", "intermedio", "avanzato"]).optional(),
    posti: z.coerce.number().int().positive().min(1).max(60).optional()                                //-> forza a numero per avere un filtro numerico
});

// schema zod per metodi post siccome si è deciso che i campi non possono essere opzionali
const CorsiSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(60),
    istruttore: z.string().trim().min(1, "Inserire un istruttore").max(60),
    livello: z.enum(["base", "intermedio", "avanzato"]),
    posti: z.number().int().positive().min(1).max(60)
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


// * DONE: permette di creare un corso, verifica se il corso sia già presente in db in caso non permette l'inserimento
const creaCorso = async (dati) => {
    const corsoPresente = await repoCorsi().existsBy(dati);                                             //-> verifica se tutti i record sono presenti all'interno del db, utilizzabile solo tramite getRepository() e restituisce un bool

    if (corsoPresente) {                                                                                //-> se trova corrispondenza torna null
        return null;
    };

    const corso = repoCorsi().create(dati);                                                             //-> altrimenti procede a creare il corso
    return repoCorsi().save(corso);                                                                     //-> ritorna il corso salvato
}


// * DONE: permette di eliminare un corso per ID
const eliminaCorso = async (id) => {
    const corso = await trovaCorsoById(id);                                                             //-> aspetta di trovare il corso

    if (!corso) {
        return null;                                                                                    //-> se il corso non esiste torna null
    };

    await repoCorsi().remove(corso);                                                                    //-> aspetta di rimuovere il corso
    return corso;                                                                                       //-> torna il corso
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