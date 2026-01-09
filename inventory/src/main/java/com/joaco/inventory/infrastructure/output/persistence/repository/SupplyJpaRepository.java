package com.joaco.inventory.infrastructure.output.persistence.repository;

import com.joaco.inventory.infrastructure.output.persistence.entity.SupplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SupplyJpaRepository extends JpaRepository<SupplyEntity, Long> {
    List<SupplyEntity> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
