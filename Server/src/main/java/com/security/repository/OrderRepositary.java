package com.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.entity.EmailRequest;

public interface OrderRepositary extends JpaRepository<EmailRequest, Integer> {

}
