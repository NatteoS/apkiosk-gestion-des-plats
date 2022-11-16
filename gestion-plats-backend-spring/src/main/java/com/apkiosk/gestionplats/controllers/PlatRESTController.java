package com.apkiosk.gestionplats.controllers;

import com.apkiosk.gestionplats.models.Plat;
import com.apkiosk.gestionplats.services.CategorieRepository;
import com.apkiosk.gestionplats.services.FournisseurRepository;
import com.apkiosk.gestionplats.services.PlatRepository;
import org.springframework.web.bind.annotation.*;

// port App React = 3000
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/plats")
public class PlatRESTController {

    private final PlatRepository platRepository;
    private final FournisseurRepository fournisseurRepository;
    private final CategorieRepository categorieRepository;

    private Plat plat;

    public PlatRESTController(PlatRepository platRepository, FournisseurRepository fournisseurRepository, CategorieRepository categorieRepository) {
        this.platRepository = platRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.categorieRepository = categorieRepository;
    }

    @GetMapping(path = "")
    public @ResponseBody Iterable<Plat> getAllPlats(){
        return this.platRepository.findAll();
    }

    @PostMapping(path = "")
    public @ResponseBody String addPlat(
            @RequestParam String libelle,
            @RequestParam String prix,
            @RequestParam String categorie,
            @RequestParam String fournisseur) {
        Plat plat = new Plat();
        plat.setLibelle(libelle);
        plat.setPrix(Double.parseDouble(prix));
        plat.setCategorie(categorieRepository.findByNom(categorie));
        plat.setFournisseur(fournisseurRepository.findByNom(fournisseur));
        this.platRepository.save(plat);
        return "Plat ajouté";
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody String updatePlat(
            @PathVariable Long id,
            @RequestParam String libelle,
            @RequestParam String prix,
            @RequestParam String categorie,
            @RequestParam String fournisseur) {
        plat = this.platRepository.findById(id).orElse(null);
        if (plat != null) {
            plat.setLibelle(libelle);
            plat.setPrix(Double.parseDouble(prix));
            plat.setCategorie(categorieRepository.findByNom(categorie));
            plat.setFournisseur(fournisseurRepository.findByNom(fournisseur));
            this.platRepository.save(plat);
            return "Plat modifié!";
        }else {
            return "Plat introuvable.";
        }
    }

    @GetMapping(path = "/{id}")
    public Plat getPlat(@PathVariable Long id) {
        return this.platRepository.findById(id).orElse(null);
    }

    @DeleteMapping(path = "/{id}")
    public String deletePlat(@PathVariable Long id) {
        plat = this.platRepository.findById(id).orElse(null);
        if (plat != null) {
            this.platRepository.deleteById(id);
            return "Plat supprimé!";
        }else return "Plat introuvable.";
    }
}
