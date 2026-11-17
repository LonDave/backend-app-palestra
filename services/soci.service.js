// import
const { z } = require("zod");
const { AppDataSource } = require("../config/typeorm.conf");

// schema zod per i metodi get
const FiltriSociSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(125).optional(),                               //-> necessario che siano optional per una corretta validazione
    email: z.string().trim().min(1, "Inserire una mail").max(125).optional(),                             //-> necessario che siano optional per una corretta validazione
});

/* 
    serve una funzione per evitare di eseguirlo quando il modulo viene caricato siccome "initialize()"
    in quel momento non è stato ancora eseguito ed andrebbe in errore
*/
const repoSoci = () => AppDataSource.getRepository("Socio");

// * DONE: Visualizzazione di tutti i soci in ordine alfabetico e possibilità di query -> es: "?livello=base"
const trovaSoci = async (filtri = {}) => {
    return repoSoci().find({
        where: filtri,                                                                                  //-> prende i valori che corrispondono ai filtri
        order: { name: "ASC" }                                                                          //-> pone l'ordine ASC
    });
};

// export
module.exports = {
    FiltriSociSchema,
    trovaSoci
};