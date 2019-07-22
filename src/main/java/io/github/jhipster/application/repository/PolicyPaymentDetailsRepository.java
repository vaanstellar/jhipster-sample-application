package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.PolicyPaymentDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PolicyPaymentDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PolicyPaymentDetailsRepository extends JpaRepository<PolicyPaymentDetails, Long> {

}
