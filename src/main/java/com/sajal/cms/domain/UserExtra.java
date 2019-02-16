package com.sajal.cms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "password_reset_date")
    private Instant passwordResetDate;

    @Column(name = "otp")
    private String otp;

    @Column(name = "login_date")
    private Instant loginDate;

    @Column(name = "lock_date")
    private Instant lockDate;

    @Column(name = "invalid_try")
    private Integer invalidTry;

    @OneToOne    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPasswordResetDate() {
        return passwordResetDate;
    }

    public UserExtra passwordResetDate(Instant passwordResetDate) {
        this.passwordResetDate = passwordResetDate;
        return this;
    }

    public void setPasswordResetDate(Instant passwordResetDate) {
        this.passwordResetDate = passwordResetDate;
    }

    public String getOtp() {
        return otp;
    }

    public UserExtra otp(String otp) {
        this.otp = otp;
        return this;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Instant getLoginDate() {
        return loginDate;
    }

    public UserExtra loginDate(Instant loginDate) {
        this.loginDate = loginDate;
        return this;
    }

    public void setLoginDate(Instant loginDate) {
        this.loginDate = loginDate;
    }

    public Instant getLockDate() {
        return lockDate;
    }

    public UserExtra lockDate(Instant lockDate) {
        this.lockDate = lockDate;
        return this;
    }

    public void setLockDate(Instant lockDate) {
        this.lockDate = lockDate;
    }

    public Integer getInvalidTry() {
        return invalidTry;
    }

    public UserExtra invalidTry(Integer invalidTry) {
        this.invalidTry = invalidTry;
        return this;
    }

    public void setInvalidTry(Integer invalidTry) {
        this.invalidTry = invalidTry;
    }

    public User getUser() {
        return user;
    }

    public UserExtra user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserExtra userExtra = (UserExtra) o;
        if (userExtra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", passwordResetDate='" + getPasswordResetDate() + "'" +
            ", otp='" + getOtp() + "'" +
            ", loginDate='" + getLoginDate() + "'" +
            ", lockDate='" + getLockDate() + "'" +
            ", invalidTry=" + getInvalidTry() +
            "}";
    }
}
