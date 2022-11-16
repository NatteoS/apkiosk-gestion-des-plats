import axios from "axios";

const CATEGORIES_REST_API_URL = "http://localhost:8888/api/categories";

class CategorieService {
    //récupération de toutes les categories
    getCategories() {
        return axios.get(CATEGORIES_REST_API_URL);
    }

    //récupération d'une categorie par son id
    getCategorie(id) {
        return axios.get(CATEGORIES_REST_API_URL + "/" + id);
    }

    //suppression d'une categorie
    deleteCategorie(id) {
        return axios.delete(CATEGORIES_REST_API_URL + "/" + id);
    }

    //mise à jour d'une categorie
    updateCategorie(categorie) {
        return axios.put(CATEGORIES_REST_API_URL + "/" + categorie.id, categorie);
    }

    //ajout d'une categorie
    addCategorie(categorie) {
        return axios.post(CATEGORIES_REST_API_URL, categorie);
    }

}

export default new CategorieService();