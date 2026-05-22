package com.clauseguard.api.repository;

import com.clauseguard.api.model.AnalysisRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnalysisRepository extends JpaRepository<AnalysisRecord, Long> {
    List<AnalysisRecord> findAllByOrderByCreatedAtDesc();
}
