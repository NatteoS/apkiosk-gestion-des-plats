import axios from "axios";

const PLATS_REST_API_URL = "http://localhost:8888/api/plats";

class PlatService {
    //récupération de tous les plats
    getPlats() {
        return axios.get(PLATS_REST_API_URL);
    }

    //récupération d'un plat par son id
    getPlat(id) {
        return axios.get(PLATS_REST_API_URL + "/" + id);
    }

    //suppression d'un plat
    deletePlat(id) {
        return axios.delete(PLATS_REST_API_URL + "/" + id);
    }

    //mise à jour d'un plat
    updatePlat(plat) {
        console.log(plat);
        return axios.put(PLATS_REST_API_URL + "/" + plat.id, {},{
            params: {
                libelle: plat.libelle,
                prix: plat.prix,
                fournisseur: plat.fournisseur,
                categorie: plat.categorie
            }
        });
    }
    
    //ajout d'un plat
    addPlat(plat) {
        return axios.post(PLATS_REST_API_URL, {},{
            params: {
                libelle: plat.libelle,
                prix: plat.prix,
                fournisseur: plat.fournisseur,
                categorie: plat.categorie
            }
        });
    }

}

export default new PlatService();