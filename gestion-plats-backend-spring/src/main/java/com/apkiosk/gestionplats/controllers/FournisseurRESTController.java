package com.apkiosk.gestionplats.controllers;

import com.apkiosk.gestionplats.models.Fournisseur;
import com.apkiosk.gestionplats.services.FournisseurRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/fournisseurs")
public class FournisseurRESTController {

    private final FournisseurRepository fournisseurRepository;

    public FournisseurRESTController(FournisseurRepository fournisseurRepository) {
        this.fournisseurRepository = fournisseurRepository;
    }

    @GetMapping(path = "")
    public @ResponseBody Iterable<Fournisseur> getAllFournisseurs(){
        return this.fournisseurRepository.findAll();
    }

    @PostMapping(path = "")
    public @ResponseBody String addFournisseur(@RequestParam String nom) {
        this.fournisseurRepository.save(new Fournisseur(nom));
        return "Fournisseur ajouté";
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody String updateFournisseur(@PathVariable Long id, @RequestParam String nom) {
        Fournisseur fournisseur = this.fournisseurRepository.findById(id).orElse(null);
        if (fournisseur != null) {
            fournisseur.setNom(nom);
            this.fournisseurRepository.save(fournisseur);
            return "Fournisseur modifié!";
        }else return "Fournisseur non trouvé!";
    }

    @GetMapping(path = "/{id}")
    public Fournisseur getFournisseur(@PathVariable Long id) {
        return this.fournisseurRepository.findById(id).orElse(null);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteFournisseur(@PathVariable Long id) {
        Fournisseur fournisseur = this.fournisseurRepository.findById(id).orElse(null);
        if (fournisseur != null) {
            this.fournisseurRepository.deleteById(id);
            return "Fournisseur supprimé!";
        }else return "Fournisseur non trouvé!";
    }

}
