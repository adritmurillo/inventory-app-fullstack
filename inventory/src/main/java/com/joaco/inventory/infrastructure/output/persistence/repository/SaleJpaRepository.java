package com.joaco.inventory.infrastructure.output.persistence.repository;

import com.joaco.inventory.infrastructure.output.persistence.entity.SaleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleJpaRepository extends JpaRepository<SaleEntity, Long> {
    List<SaleEntity> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
