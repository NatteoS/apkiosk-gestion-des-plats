package com.apkiosk.gestionplats.controllers;

import com.apkiosk.gestionplats.models.Categorie;
import com.apkiosk.gestionplats.services.CategorieRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategorieRESTController {
    private final CategorieRepository categorieRepository;

    public CategorieRESTController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }


    @RequestMapping(path = "")
    public List<Categorie> getAllCategories(){
        return this.categorieRepository.findAll();
    }

    @PostMapping(path = "")
    public String addCategorie(@RequestParam String nom) {
        this.categorieRepository.save(new Categorie(nom));
        return "Catégorie ajoutée";
    }

    @PutMapping(path = "/{id}")
    public String updateCategorie(@PathVariable Long id, @RequestParam String nom) {
        Categorie categorie = this.categorieRepository.findById(id).orElse(null);
        if (categorie != null) {
            categorie.setNom(nom);
            this.categorieRepository.save(categorie);
            return "Catégorie modifiée!";
        }else {
            return "Catégorie non trouvée";
        }
    }

    @GetMapping(path = "/{id}")
    public Categorie getCategorie(@PathVariable Long id) {
        return this.categorieRepository.findById(id).orElse(null);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteCategorie(@PathVariable Long id) {
        Categorie categorie = this.categorieRepository.findById(id).orElse(null);
        if (categorie != null) {
            this.categorieRepository.deleteById(id);
            return "Catégorie supprimée!";
        } else return "Catégorie introuvable.";
    }

}
