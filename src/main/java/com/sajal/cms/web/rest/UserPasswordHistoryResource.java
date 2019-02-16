package com.sajal.cms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sajal.cms.domain.UserPasswordHistory;
import com.sajal.cms.repository.UserPasswordHistoryRepository;
import com.sajal.cms.web.rest.errors.BadRequestAlertException;
import com.sajal.cms.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserPasswordHistory.
 */
@RestController
@RequestMapping("/api")
public class UserPasswordHistoryResource {

    private final Logger log = LoggerFactory.getLogger(UserPasswordHistoryResource.class);

    private static final String ENTITY_NAME = "userPasswordHistory";

    private UserPasswordHistoryRepository userPasswordHistoryRepository;

    public UserPasswordHistoryResource(UserPasswordHistoryRepository userPasswordHistoryRepository) {
        this.userPasswordHistoryRepository = userPasswordHistoryRepository;
    }

    /**
     * POST  /user-password-histories : Create a new userPasswordHistory.
     *
     * @param userPasswordHistory the userPasswordHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userPasswordHistory, or with status 400 (Bad Request) if the userPasswordHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-password-histories")
    @Timed
    public ResponseEntity<UserPasswordHistory> createUserPasswordHistory(@RequestBody UserPasswordHistory userPasswordHistory) throws URISyntaxException {
        log.debug("REST request to save UserPasswordHistory : {}", userPasswordHistory);
        if (userPasswordHistory.getId() != null) {
            throw new BadRequestAlertException("A new userPasswordHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserPasswordHistory result = userPasswordHistoryRepository.save(userPasswordHistory);
        return ResponseEntity.created(new URI("/api/user-password-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-password-histories : Updates an existing userPasswordHistory.
     *
     * @param userPasswordHistory the userPasswordHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userPasswordHistory,
     * or with status 400 (Bad Request) if the userPasswordHistory is not valid,
     * or with status 500 (Internal Server Error) if the userPasswordHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-password-histories")
    @Timed
    public ResponseEntity<UserPasswordHistory> updateUserPasswordHistory(@RequestBody UserPasswordHistory userPasswordHistory) throws URISyntaxException {
        log.debug("REST request to update UserPasswordHistory : {}", userPasswordHistory);
        if (userPasswordHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserPasswordHistory result = userPasswordHistoryRepository.save(userPasswordHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPasswordHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-password-histories : get all the userPasswordHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userPasswordHistories in body
     */
    @GetMapping("/user-password-histories")
    @Timed
    public List<UserPasswordHistory> getAllUserPasswordHistories() {
        log.debug("REST request to get all UserPasswordHistories");
        return userPasswordHistoryRepository.findAll();
    }

    /**
     * GET  /user-password-histories/:id : get the "id" userPasswordHistory.
     *
     * @param id the id of the userPasswordHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPasswordHistory, or with status 404 (Not Found)
     */
    @GetMapping("/user-password-histories/{id}")
    @Timed
    public ResponseEntity<UserPasswordHistory> getUserPasswordHistory(@PathVariable Long id) {
        log.debug("REST request to get UserPasswordHistory : {}", id);
        Optional<UserPasswordHistory> userPasswordHistory = userPasswordHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userPasswordHistory);
    }

    /**
     * DELETE  /user-password-histories/:id : delete the "id" userPasswordHistory.
     *
     * @param id the id of the userPasswordHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-password-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserPasswordHistory(@PathVariable Long id) {
        log.debug("REST request to delete UserPasswordHistory : {}", id);

        userPasswordHistoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
