package com.apkiosk.gestionplats.services;

import com.apkiosk.gestionplats.models.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    Fournisseur findByNom(String nom);

}
