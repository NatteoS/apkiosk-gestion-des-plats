package com.apkiosk.gestionplats.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

//la table sera nommée "plats" dans la base de données
@Entity @Table(name = "plats")
//Les setters et les getters seront générés automatiquement
@Getter @Setter
public class Plat {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private String libelle;

    @Column(nullable = false)
    private double prix;

    //Le plat est livré à 1 seul fournisseur
    @ManyToOne(optional = false)
    private Fournisseur fournisseur;

    //Le plat appartient à 1 seule catégorie
    @ManyToOne(optional = false)
    private Categorie categorie;

    //Constructeur par défaut
    public Plat() {
    }

    //Constructeur avec paramètres
    public Plat(String libelle, double prix, Categorie categorie,Fournisseur fournisseur) {
        this.libelle = libelle;
        this.prix = prix;
        this.fournisseur = fournisseur;
        this.categorie = categorie;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plat plat = (Plat) o;
        return Double.compare(plat.prix, prix) == 0 && Objects.equals(id, plat.id) && Objects.equals(libelle, plat.libelle) && Objects.equals(fournisseur, plat.fournisseur) && Objects.equals(categorie, plat.categorie);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, libelle, prix, fournisseur, categorie);
    }

    @Override
    public String toString() {
        return "Plat{" +
                "id=" + id +
                ", libelle='" + libelle + '\'' +
                ", prix=" + prix +
                ", fournisseur=" + fournisseur +
                ", categorie=" + categorie +
                '}';
    }
}
