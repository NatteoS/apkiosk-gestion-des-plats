package com.apkiosk.gestionplats.services;

import com.apkiosk.gestionplats.models.Plat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatRepository extends JpaRepository<Plat, Long> {

}
