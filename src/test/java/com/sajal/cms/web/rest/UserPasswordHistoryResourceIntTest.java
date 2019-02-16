package com.sajal.cms.web.rest;

import com.sajal.cms.ContactsApp;

import com.sajal.cms.domain.UserPasswordHistory;
import com.sajal.cms.repository.UserPasswordHistoryRepository;
import com.sajal.cms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.sajal.cms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserPasswordHistoryResource REST controller.
 *
 * @see UserPasswordHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ContactsApp.class)
public class UserPasswordHistoryResourceIntTest {

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private UserPasswordHistoryRepository userPasswordHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserPasswordHistoryMockMvc;

    private UserPasswordHistory userPasswordHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserPasswordHistoryResource userPasswordHistoryResource = new UserPasswordHistoryResource(userPasswordHistoryRepository);
        this.restUserPasswordHistoryMockMvc = MockMvcBuilders.standaloneSetup(userPasswordHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserPasswordHistory createEntity(EntityManager em) {
        UserPasswordHistory userPasswordHistory = new UserPasswordHistory()
            .password(DEFAULT_PASSWORD);
        return userPasswordHistory;
    }

    @Before
    public void initTest() {
        userPasswordHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserPasswordHistory() throws Exception {
        int databaseSizeBeforeCreate = userPasswordHistoryRepository.findAll().size();

        // Create the UserPasswordHistory
        restUserPasswordHistoryMockMvc.perform(post("/api/user-password-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPasswordHistory)))
            .andExpect(status().isCreated());

        // Validate the UserPasswordHistory in the database
        List<UserPasswordHistory> userPasswordHistoryList = userPasswordHistoryRepository.findAll();
        assertThat(userPasswordHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        UserPasswordHistory testUserPasswordHistory = userPasswordHistoryList.get(userPasswordHistoryList.size() - 1);
        assertThat(testUserPasswordHistory.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createUserPasswordHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userPasswordHistoryRepository.findAll().size();

        // Create the UserPasswordHistory with an existing ID
        userPasswordHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserPasswordHistoryMockMvc.perform(post("/api/user-password-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPasswordHistory)))
            .andExpect(status().isBadRequest());

        // Validate the UserPasswordHistory in the database
        List<UserPasswordHistory> userPasswordHistoryList = userPasswordHistoryRepository.findAll();
        assertThat(userPasswordHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserPasswordHistories() throws Exception {
        // Initialize the database
        userPasswordHistoryRepository.saveAndFlush(userPasswordHistory);

        // Get all the userPasswordHistoryList
        restUserPasswordHistoryMockMvc.perform(get("/api/user-password-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userPasswordHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())));
    }
    
    @Test
    @Transactional
    public void getUserPasswordHistory() throws Exception {
        // Initialize the database
        userPasswordHistoryRepository.saveAndFlush(userPasswordHistory);

        // Get the userPasswordHistory
        restUserPasswordHistoryMockMvc.perform(get("/api/user-password-histories/{id}", userPasswordHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userPasswordHistory.getId().intValue()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserPasswordHistory() throws Exception {
        // Get the userPasswordHistory
        restUserPasswordHistoryMockMvc.perform(get("/api/user-password-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserPasswordHistory() throws Exception {
        // Initialize the database
        userPasswordHistoryRepository.saveAndFlush(userPasswordHistory);

        int databaseSizeBeforeUpdate = userPasswordHistoryRepository.findAll().size();

        // Update the userPasswordHistory
        UserPasswordHistory updatedUserPasswordHistory = userPasswordHistoryRepository.findById(userPasswordHistory.getId()).get();
        // Disconnect from session so that the updates on updatedUserPasswordHistory are not directly saved in db
        em.detach(updatedUserPasswordHistory);
        updatedUserPasswordHistory
            .password(UPDATED_PASSWORD);

        restUserPasswordHistoryMockMvc.perform(put("/api/user-password-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserPasswordHistory)))
            .andExpect(status().isOk());

        // Validate the UserPasswordHistory in the database
        List<UserPasswordHistory> userPasswordHistoryList = userPasswordHistoryRepository.findAll();
        assertThat(userPasswordHistoryList).hasSize(databaseSizeBeforeUpdate);
        UserPasswordHistory testUserPasswordHistory = userPasswordHistoryList.get(userPasswordHistoryList.size() - 1);
        assertThat(testUserPasswordHistory.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingUserPasswordHistory() throws Exception {
        int databaseSizeBeforeUpdate = userPasswordHistoryRepository.findAll().size();

        // Create the UserPasswordHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserPasswordHistoryMockMvc.perform(put("/api/user-password-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPasswordHistory)))
            .andExpect(status().isBadRequest());

        // Validate the UserPasswordHistory in the database
        List<UserPasswordHistory> userPasswordHistoryList = userPasswordHistoryRepository.findAll();
        assertThat(userPasswordHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserPasswordHistory() throws Exception {
        // Initialize the database
        userPasswordHistoryRepository.saveAndFlush(userPasswordHistory);

        int databaseSizeBeforeDelete = userPasswordHistoryRepository.findAll().size();

        // Get the userPasswordHistory
        restUserPasswordHistoryMockMvc.perform(delete("/api/user-password-histories/{id}", userPasswordHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserPasswordHistory> userPasswordHistoryList = userPasswordHistoryRepository.findAll();
        assertThat(userPasswordHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPasswordHistory.class);
        UserPasswordHistory userPasswordHistory1 = new UserPasswordHistory();
        userPasswordHistory1.setId(1L);
        UserPasswordHistory userPasswordHistory2 = new UserPasswordHistory();
        userPasswordHistory2.setId(userPasswordHistory1.getId());
        assertThat(userPasswordHistory1).isEqualTo(userPasswordHistory2);
        userPasswordHistory2.setId(2L);
        assertThat(userPasswordHistory1).isNotEqualTo(userPasswordHistory2);
        userPasswordHistory1.setId(null);
        assertThat(userPasswordHistory1).isNotEqualTo(userPasswordHistory2);
    }
}
