package com.apkiosk.gestionplats.config;

import com.apkiosk.gestionplats.models.Categorie;
import com.apkiosk.gestionplats.models.Fournisseur;
import com.apkiosk.gestionplats.models.Plat;
import com.apkiosk.gestionplats.services.CategorieRepository;
import com.apkiosk.gestionplats.services.FournisseurRepository;
import com.apkiosk.gestionplats.services.PlatRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
public class GestionPlatsConfig {

    @Bean
    //creation des différentes catégories
    public List<Categorie> initCategories(CategorieRepository categorieRepository) {
        List<Categorie> categories = List.of(
                new Categorie("Entrée"),
                new Categorie("Plat"),
                new Categorie("Dessert"),
                new Categorie("Autre")
        );
        categorieRepository.saveAll(categories);
        return categories;
    }

    @Bean
    //creation des différents fournisseurs
    public List<Fournisseur> initFournisseurs(FournisseurRepository fournisseurRepository) {
        List<Fournisseur> fournisseurs = List.of(
                new Fournisseur("La Ferme du Bonheur"),
                new Fournisseur("Poissonnerie de la plage"),
                new Fournisseur("Boucherie de la ville"),
                new Fournisseur("Boulangerie de la ville"),
                new Fournisseur("Fruits et légumes de la ville")
        );
        fournisseurRepository.saveAll(fournisseurs);
        return fournisseurs;
    }

    @Bean
    //creation des différents plats
    public List<Plat> initPlats(
            PlatRepository platRepository,
            List<Fournisseur> fournisseurs,
            List<Categorie> categories) {

        List<Plat> plats = List.of(
            new Plat("Salade de tomates", 3.50, categories.get(0), fournisseurs.get(0)),
            new Plat("Salade de concombre", 2.80, categories.get(0), fournisseurs.get(0)),

            new Plat("Poisson pané", 10.0, categories.get(1), fournisseurs.get(1)),
            new Plat("Poisson grillé", 10.0, categories.get(1), fournisseurs.get(1)),

            new Plat("Steak", 6.0, categories.get(1), fournisseurs.get(2)),
            new Plat("Burger", 7.90, categories.get(1), fournisseurs.get(2)),

            new Plat("Pain au chocolat", 0.60, categories.get(2), fournisseurs.get(3)),
            new Plat("Pain au raisin", 1.60, categories.get(2), fournisseurs.get(3)),

            new Plat("Fruits", 2.0, categories.get(3), fournisseurs.get(4)),
            new Plat("Légumes", 2.0, categories.get(3), fournisseurs.get(4))
        );

        platRepository.saveAll(plats);
        return plats;
    }
}
