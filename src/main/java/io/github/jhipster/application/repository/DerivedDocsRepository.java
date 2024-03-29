package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DerivedDocs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DerivedDocs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DerivedDocsRepository extends JpaRepository<DerivedDocs, Long> {

}
