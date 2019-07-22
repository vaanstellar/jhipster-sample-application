package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.UserSuspension;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserSuspension entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSuspensionRepository extends JpaRepository<UserSuspension, Long> {

}
