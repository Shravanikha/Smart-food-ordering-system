package com.food.food_ordering_system;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface userrepo extends JpaRepository<user, Long> {

    Optional<user> findByEmail(String email);

    boolean existsByEmail(String email);
}