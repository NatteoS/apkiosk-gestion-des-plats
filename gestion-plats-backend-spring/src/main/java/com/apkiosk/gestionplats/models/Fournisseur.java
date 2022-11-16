package com.apkiosk.gestionplats.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Setter;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

//La table sera nommée "fournisseur" dans la base de données
@Entity
@Table(name = "fournisseurs")
//Les setters et les getters seront générés automatiquement
@Getter @Setter
public class Fournisseur {
    @Id @GeneratedValue
    private Long id;
    @Column(nullable = false, unique = true)
    private String nom;

    //Le fournisseur livrent 0 à n plats
    @OneToMany(mappedBy = "fournisseur", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Plat> plats;

    //Constructeur par défaut
    public Fournisseur() {
    }

    //Constructeur avec paramètres
    public Fournisseur(String nom) {
        this.nom = nom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Fournisseur that = (Fournisseur) o;
        return Objects.equals(id, that.id) && Objects.equals(nom, that.nom) && Objects.equals(plats, that.plats);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, plats);
    }

    @Override
    public String toString() {
        return "Fournisseur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", plats=" + plats +
                '}';
    }
}