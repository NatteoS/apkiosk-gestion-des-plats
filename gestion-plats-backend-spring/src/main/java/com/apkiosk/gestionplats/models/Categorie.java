package com.apkiosk.gestionplats.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

//La table sera nommée "categorie" dans la base de données
@Entity @Table(name = "categories")
//Les setters et les getters seront générés automatiquement
@Getter @Setter
public class Categorie {
    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private String nom;

    //Une catégorie peut contenir 0 à n plats
    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Plat> plats;

    //Constructeur par défaut
    public Categorie() {
    }

    //Constructeur avec paramètres
    public Categorie(String nom) {
        this.nom = nom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Categorie categorie = (Categorie) o;
        return Objects.equals(id, categorie.id) && Objects.equals(nom, categorie.nom) && Objects.equals(plats, categorie.plats);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, plats);
    }

    @Override
    public String toString() {
        return "Categorie{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", plats=" + plats +
                '}';
    }
}
