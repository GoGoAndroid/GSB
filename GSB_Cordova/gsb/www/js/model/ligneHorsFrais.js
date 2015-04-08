function LigneHorsFrais (jsonString) {
     console.log(jsonString);
    console.log(jsonString.id);
    this.id = jsonString.id;
    this.idVisiteur = jsonString.idVisiteur;
    this.mois =jsonString.mois ;
    this.libelle = jsonString.libelle ;
    this.date = jsonString.date;
    this.montant =  jsonString.montant;
    
  /*  function buildFromJson(jsonString){
       console.log("jsonString : "+ jsonString);
       this.id = jsonString.id;
       console.log("id : "+ jsonString.id);
       this.idVisiteur = jsonString.idVisiteur;
       this.mois = jsonString.mois;
       this.libelle = jsonString.libelle;
       this.date = jsonString.date;
       this.montant = jsonString.montant;
    }
    */
}

