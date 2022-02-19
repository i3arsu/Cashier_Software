package net.unipu.CashierSoftwareAPI.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.unipu.CashierSoftwareAPI.models.ERole;
import net.unipu.CashierSoftwareAPI.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
