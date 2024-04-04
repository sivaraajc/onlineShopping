package com.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.configs.entity.Carosual;

@Repository
public interface CarosualRepositary extends JpaRepository<Carosual, Integer>{

}
