package com.sajal.cms.repository;

import com.sajal.cms.domain.UserPasswordHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserPasswordHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPasswordHistoryRepository extends JpaRepository<UserPasswordHistory, Long> {

    @Query("select user_password_history from UserPasswordHistory user_password_history where user_password_history.user.login = ?#{principal.username}")
    List<UserPasswordHistory> findByUserIsCurrentUser();

    List<UserPasswordHistory> findTop3ByUserIdOrderByIdDesc(Long userId);
}
