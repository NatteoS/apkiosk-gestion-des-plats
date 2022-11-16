package com.apkiosk.gestionplats.services;

import com.apkiosk.gestionplats.models.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    Categorie findByNom(String nom);

}
