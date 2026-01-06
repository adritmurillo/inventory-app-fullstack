package com.joaco.inventory.infrastructure.output.persistence.repository;

import com.joaco.inventory.infrastructure.output.persistence.entity.SaleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleJpaRepository extends JpaRepository<SaleEntity, Long> {
}
