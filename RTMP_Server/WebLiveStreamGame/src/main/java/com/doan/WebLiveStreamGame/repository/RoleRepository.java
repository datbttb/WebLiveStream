package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String role);

    Optional<Role> findById(Long id);
}
