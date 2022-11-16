import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PlatService from "../services/PlatService";
import CategorieService from "../services/CategorieService";
import FournisseurService from "../services/FournisseurService";
import { FcApproval } from "react-icons/fc";

// Composant fonctionnel de gestion des plats
// Appelé par App.js
const PlatComponent = () => {

    // Déclaration des variables d'état
    
    //Mes plats et le plat sélectionné
    const [plats, setPlats] = useState([]);
    const [plat, setPlat] = useState({});

    //Les listes des fournisseurs et des catégories
    const [fournisseurs, setFournisseurs] = useState([]);
    const [categories, setCategories] = useState([]);

    //stockage de chaque élément du plat
    const [id, setId] = useState("");
    const [libelle, setLibelle] = useState("");
    const [prix, setPrix] = useState("");
    // const [fournisseur, setFournisseur] = useState("");
    // const [categorie, setCategorie] = useState("");
    // Essai sans
    
    //nom du fournisseur et de la catégorie
    const [nomFournisseur, setNomFournisseur] = useState("");
    const [nomCategorie, setNomCategorie] = useState("");

    //erreurs concernant les champs du formulaire
    const [erreurs] = useState({});

    //libelle modifié
    const [updateLibelle, setUpdateLibelle] = useState("");
    const [onUpdate, setOnUpdate] = useState(false);

    //_______________________________________________________
    // Déclaration des fonctions

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //Props Modal de modification
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    //Props Modal de suppression
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    //Props Modal de visualisation
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Modal de confirmation "Opération réussie"
    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    //_______________________________________________________
    // Fonctions de gestion des listes

    //recuperation des plats depuis le service
    const getPlats = () => {
        PlatService.getPlats().then((response) => {
            setPlats(response.data);
        });
    };

    //appel de getPlats au chargement du composant
    useEffect(() => {
        getPlats();
    }, []);

    //recuperation des fournisseurs depuis le service
    const getFournisseurs = () => {
        FournisseurService.getFournisseurs().then((response) => {
            setFournisseurs(response.data);
        });
    };
    
    //appel de getFournisseurs au chargement du composant
    useEffect(() => {
        getFournisseurs();
    }, []);

    //recuperation des categories depuis le service
    const getCategories = () => {
        CategorieService.getCategories().then((response) => {
            setCategories(response.data);
        });
    };

    //appel de getCategories au chargement du composant
    useEffect(() => {
        getCategories();
    }, []);

    //_______________________________________________________

    // Fonctions de gestion des plats

    //gérer l'ajout d'un plat depuis le service
    const handleAddPlat = () => {
        let plat = {
            libelle: libelle,
            prix: prix,
            fournisseur: nomFournisseur,
            categorie: nomCategorie
        };
        if(formIsValid())
            PlatService.addPlat(plat).then((response) => {
                //réinitialisation des erreurs
                resetErrors();
                //fermer le modal
                handleCloseAdd();
                //mise à jour de la liste des plats
                getPlats();
                //réinitialisation du formulaire
                resetForm();
                //afficher le modal de confirmation
                handleShowConfirm();
            });
        else
            alert("Veuillez remplir tous les champs");
    };


    //gérer la modification d'un plat depuis le service
    const handleUpdatePlat = () => {
        let plat = {
            id: id,
            libelle: libelle,
            prix: prix,
            fournisseur: nomFournisseur,
            categorie: nomCategorie
        };
        if(formIsValid())
            PlatService.updatePlat(plat).then((response) => {
                //réinitialisation des erreurs
                resetErrors();
                //fermer le modal
                handleCloseUpdate();
                //mise à jour de la liste des plats
                getPlats();
                //réinitialisation du formulaire
                resetForm(); 
                //afficher le modal de confirmation
                handleShowConfirm();
                //réinitialisation du libelle modifié
                setUpdateLibelle("");
                //réinitialisation de onUpdate
                setOnUpdate(false);
            });
        else
            alert("Veuillez remplir tous les champs");
    };

 
    //gérer la suppression d'un plat depuis le service
    const handleDeletePlat = () => {
        PlatService.deletePlat(id).then((response) => {
            //fermer le modal
            handleCloseDelete();
            //mise à jour de la liste des plats
            getPlats();
            //réinitialisation de l'id
            setId("");
            //afficher le modal de confirmation
            handleShowConfirm();
        });
    };
    
    //vérifier si le formulaire est valide
    const formIsValid = () => {
        //Contrôle des champs vides

        let isValid = true;

        //Contrôle de l'existence du libellé dans la liste des plats
        if(!libelle || plats.find(p => p.libelle === libelle)){
            //si le libellé est le même que celui du plat sélectionné
            //alors on ne vérifie pas l'existance du libellé
            if(!onUpdate || updateLibelle !== libelle){
                isValid = false;
                erreurs.libelle = "Le libellé est invalide et doit être unique.";
            }else erreurs.libelle = "";
        }
        else erreurs.libelle = "";

        //Contrôle du prix valide
        if(prix <= 0 || isNaN(prix)){
            isValid = false;
            erreurs.prix="Le prix doit être un nombre réel supérieur à 0.";
        } else erreurs.prix="";

        //Contrôle de l'existence de la catégorie
        if(!nomCategorie || !categories.find(c => c.nom === nomCategorie)){
            isValid = false;
            erreurs.categorie="Sélectionnez une catégorie proposée.";
        } else erreurs.categorie="";

        //Contrôle de l'existence du fournisseur
        if(!nomFournisseur || !fournisseurs.find(f => f.nom === nomFournisseur)){
            isValid = false;
            erreurs.fournisseur="Sélectionnez un fournisseur porposé.";
        } else erreurs.fournisseur="";

        return isValid;
    }

    // Fonctions de réinitialisation
    //mettre à vide toutes les propriétés du plat
    const resetForm = () => {
        setId("");
        setLibelle("");
        setPrix("");
        setNomFournisseur("");
        setNomCategorie("");
    };

    //vider les erreurs
    const resetErrors = () => {
        erreurs.libelle="";
        erreurs.prix="";
        erreurs.categorie="";
        erreurs.fournisseur="";
    }

    //_______________________________________________________
    // Affichage du composant

    return (
        <div>
            <div className="row mb-1">
                
                <header className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Gestion des plats</h1>
                        </div>
                        <div className="col-md-6">
                            {/* Appel du Modal d'ajout */}
                            
                            <Button 
                                className="m-1 float-end"
                                variant="success"
                                onClick={() => handleShowAdd(
                                    /* valeur par défaut des selects
                                        fournisseur et catégorie */
                                    // fournisseurs.values[0],
                                    // categories.values[0]
                                    )
                                    //je viens de modifier cela.
                                }>
                                Ajouter un plat
                            </Button>
                        </div>
                    </div>
                </header>

            </div>


            {/* ___________ Table des plats ___________ */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Prix</th>
                        <th>Fournisseur</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Itération sur la liste des plats
                        plats.map(
                            plat =>
                                <tr key={plat.id}>
                                    <td>{plat.libelle}</td>
                                    <td>{plat.prix}</td>
                                    <td>{plat.fournisseur.nom}</td>
                                    <td>{plat.categorie.nom}</td>
                                    <td>
                                        {/* Appel du Modal de visualisation */}
                                        <Button variant="info" size="sm" className="m-1"
                                            onClick={ () => {
                                                /* Appel de la fonction de visualisation
                                                    avec les paramètres nécessaires */
                                                handleShow(setPlat(plat),
                                                setNomFournisseur(plat.fournisseur.nom),                                       
                                                setNomCategorie(plat.categorie.nom))
                                            }}>
                                            Visualiser
                                        </Button>
                                        {/* Appel du Modal de modification */}
                                        <Button variant="warning" size="sm" className="m-1"
                                            onClick={() => {
                                                /* Appel de la fonction de modification
                                                   avec les paramètres nécessaires */
                                                handleShowUpdate(
                                                    setId(plat.id),setPlat(plat),
                                                    setNomFournisseur(plat.fournisseur.nom),
                                                    setNomCategorie(plat.categorie.nom),
                                                    setLibelle(plat.libelle),
                                                    setPrix(plat.prix),
                                                    setUpdateLibelle(plat.libelle),
                                                    setOnUpdate(true)
                                                )
                                            }}>
                                            Modifier
                                        </Button>
                                        {/* Appel du Modal de suppression */}
                                        <Button variant="danger" size="sm" className="m-1"
                                            onClick={ () => {
                                                /* Appel de la fonction de suppression
                                                    avec le plat et l'id en paramètre */
                                                handleShowDelete(setId(plat.id),setPlat(plat))
                                            }}>
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
             </table>


            {/* ___________ Modal d'ajout ___________ */}
             <div className="model-box-view">
                <Modal
                show={showAdd}
                onHide={
                    //NOTE
                    /* Dans toutes les fermetures de modal,
                        exceptés la confirmation et la suppression,
                        on réinitialise le formulaire,
                        pour éviter que le formulaire contienne des
                        valeurs par défaut.
                        De même pour les erreurs, afin qu'elle
                        s'affiche bien quand le champ est vide
                        et pas quand le modal apparait. */
                        
                    () => {
                        handleCloseAdd();
                        resetErrors();
                        resetForm();
                    }
                }
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un plat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Libellé</label>
                            <input type="text" className="form-control"
                            onChange={(e) => setLibelle(e.target.value)}
                            placeholder="Entrez le libellé du plat"
                            required/>
                            <span className="erreur">{erreurs.libelle}</span>
                        </div>
                        <div className="form-group">
                            <label>Prix</label>
                            {/* On imagine qu'un plat peut être gratuit
                                mais la livraison chère, par exemple.
                                Minimum à 0. */}
                            <input type="number" step="0.01" min="0" className="form-control"
                                onChange={(e) => setPrix(e.target.value)}
                                placeholder="Entrez le prix du plat"
                                required/>
                                <span className="erreur">{erreurs.prix}</span>
                        </div>
                        <div className="form-group">
                            <label>Fournisseur</label>
                            <select className="form-control"
                                onChange={(e) => setNomFournisseur(e.target.value)}
                                placeholder="Sélectionnez le fournisseur du plat"
                                //defaultValue=""
                                required>
                                    {/* Option vide par défaut */}
                                    <option value="">Aucun</option>
                                    {
                                        //Itération sur la liste des fournisseurs
                                        fournisseurs.map(
                                            fournisseur =>
                                            <option key={fournisseur.id} value={fournisseur.nom}>{fournisseur.nom}</option>
                                        )
                                    }
                            </select>
                            <span className="erreur">{erreurs.fournisseur}</span>
                        </div>
                        <div className="form-group">
                            <label>Catégorie</label>
                            <select className="form-control"
                                onChange={(e) => setNomCategorie(e.target.value)}
                                placeholder="Sélectionnez la catégorie du plat"
                                //defaultValue=""
                                required>
                                    {/* Option vide par défaut */}
                                    <option value="">Aucune</option>
                                    {
                                        //Itération sur la liste des catégories
                                        categories.map(
                                            categorie =>
                                            <option key={categorie.id} value={categorie.nom}>{categorie.nom}</option>
                                        )
                                    }
                            </select>
                            <span className="erreur">{erreurs.categorie}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ 
                            () => {
                                handleCloseAdd();
                                resetErrors();
                                resetForm();
                            }
                        }>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit"
                            onClick={() => {
                                handleAddPlat(
                                    // setFournisseur(fournisseur),
                                    // setCategorie(categorie)
                                )}
                            }
                            // Tant que le formulaire n'est pas valide, le bouton est désactivé
                            // En effet, formIsValid() retourne true si le formulaire est valide
                            disabled={!formIsValid()}>
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ___________ Modal de modification ___________  */}
            <div className="model-box-view">
                <Modal
                show={showUpdate}
                onHide={
                    () => {
                        handleCloseUpdate();
                        resetErrors();
                        resetForm();
                        setUpdateLibelle("");
                        setOnUpdate(false);
                    }
                }
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier un plat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Libellé</label>
                            <input type="text" className="form-control"
                            onChange={(e) => setLibelle(e.target.value)}
                            placeholder="Entrez le libellé du plat"
                            defaultValue={plat.libelle}
                            required/>
                             <span className="erreur">{erreurs.libelle}</span>
                        </div>
                        <div className="form-group">
                            <label>Prix</label>
                            <input type="number" step="0.01" min="0" className="form-control"
                                onChange={(e) => setPrix(e.target.value)}
                                placeholder="Entrez le prix du plat"
                                defaultValue={plat.prix}
                                required/>
                                <span className="erreur">{erreurs.prix}</span>
                        </div>
                        <div className="form-group">
                            <label>Fournisseur</label>
                            <select className="form-control"
                                onChange={(e) => setNomFournisseur(e.target.value)}
                                placeholder="Sélectionnez le fournisseur du plat"
                                defaultValue={nomFournisseur}
                                required>
                                    {
                                        //Itération sur la liste des fournisseurs
                                        fournisseurs.map(
                                            fournisseur =>
                                            <option key={fournisseur.id} value={fournisseur.nom}>{fournisseur.nom}</option>
                                        )

                                    }
                            </select>
                            <span className="erreur">{erreurs.fournisseur}</span>
                        </div>
                        <div className="form-group">
                            <label>Catégorie</label>
                            <select className="form-control"
                                onChange={(e) => setNomCategorie(e.target.value)}
                                placeholder="Sélectionnez la catégorie du plat"
                                defaultValue={nomCategorie}
                                required>
                                    {
                                        //Itération sur la liste des catégories
                                        categories.map(
                                            categorie =>
                                            <option key={categorie.id} value={categorie.nom}>{categorie.nom}</option>
                                        )
                                    }
                            </select>
                            <span className="erreur">{erreurs.categorie}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ 
                            () => {
                                handleCloseUpdate();
                                resetErrors();
                                resetForm();
                                setUpdateLibelle("");
                                setOnUpdate(false);
                            }
                        }>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit"
                            onClick={
                                ()=>handleUpdatePlat(
                                // setNomFournisseur(nomFournisseur),
                                // setNomCategorie(nomCategorie),
                                // setLibelle(plat.libelle),
                                // setPrix(plat.prix)
                                // NOTE 
                                // pas besoin de passer les paramètres car ils sont déjà dans les states.
                                )
                            }
                                // Tant que le formulaire n'est pas valide, le bouton est désactivé
                                // En effet, formIsValid() retourne true si le formulaire est valide
                            disabled={!formIsValid()}>
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ___________ Modal de suppression ___________ */}
            <div className="model-box-view">
                <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer un plat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Voulez-vous vraiment supprimer ce plat: {plat.libelle} ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Fermer
                        </Button>
                        <Button variant="danger" type="submit" onClick={handleDeletePlat}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ___________ Modal de visualisation ___________ */}
            <div className="model-box-view">
                <Modal
                show={show}
                onHide={
                    () => {
                    handleClose();
                    resetForm();
                    }
                }
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Visualisation d'un plat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Libellé</label>
                            <input type="text" className="form-control" value={plat.libelle} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Prix</label>
                            <input type="text" className="form-control" value={plat.prix} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Fournisseur</label>
                            <input type="text" className="form-control" value={nomFournisseur} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Catégorie</label>
                            <input type="text" className="form-control" value={nomCategorie} readOnly/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                        onClick={
                            () => {
                            handleClose();
                            resetForm();
                            }
                        }>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ___________ Modal de confirmation ___________ */}
            <div className="model-box-view">
                <Modal
                show={showConfirm}
                onHide={handleCloseConfirm}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Opération réussie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <div className="text-center">
                            {/* Icône de validation react-icons */}
                            <FcApproval size="9em" color="green"/>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseConfirm}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        </div>
    );
};

export default PlatComponent;