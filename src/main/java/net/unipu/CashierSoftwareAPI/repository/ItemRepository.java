package net.unipu.CashierSoftwareAPI.repository;

import net.unipu.CashierSoftwareAPI.models.Item;
import net.unipu.CashierSoftwareAPI.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findById(Long id);
}
