import axios from "axios";

const FOURNISSEURS_REST_API_URL = "http://localhost:8888/api/fournisseurs";

class FournisseurService {
    //récupération de tous les fournisseurs
    getFournisseurs() {
        return axios.get(FOURNISSEURS_REST_API_URL);
    }

    //récupération d'un fournisseur par son id
    getFournisseur(id) {
        return axios.get(FOURNISSEURS_REST_API_URL + "/" + id);
    }

    //suppression d'un fournisseur
    deleteFournisseur(id) {
        return axios.delete(FOURNISSEURS_REST_API_URL + "/" + id);
    }

    //mise à jour d'un fournisseur
    updateFournisseur(fournisseur) {
        return axios.put(FOURNISSEURS_REST_API_URL + "/" + fournisseur.id, fournisseur);
    }

    //ajout d'un fournisseur
    addFournisseur(fournisseur) {
        return axios.post(FOURNISSEURS_REST_API_URL, fournisseur);
    }

}

export default new FournisseurService();