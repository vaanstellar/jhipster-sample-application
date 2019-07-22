package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DocTypeReference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocTypeReference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocTypeReferenceRepository extends JpaRepository<DocTypeReference, Long> {

}
