package com.sajal.cms.security;

import com.sajal.cms.domain.User;
import com.sajal.cms.domain.UserExtra;
import com.sajal.cms.repository.UserExtraRepository;
import com.sajal.cms.repository.UserRepository;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);
    
    private final int PASSWORDLIFETIME = 7;
    
    private final int PASSWORDLOCKTIME = 60;

    private final UserRepository userRepository;
    
    @Autowired
    private UserExtraRepository userExtraRepository;
    
    public DomainUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        log.debug("Authenticating {}", username);
        
        String[] usernameAndOtp = StringUtils.split(
        		username, String.valueOf("||"));
        
        if (usernameAndOtp == null || usernameAndOtp.length != 2) {
            throw new UsernameNotFoundException("Username and Otp must be provided");
        }
        
        String login = usernameAndOtp[0];
        String otp = usernameAndOtp[1];
        
        log.debug("login {} otp {}", login, otp);
        
        if (new EmailValidator().isValid(login, null)) {
            return userRepository.findOneWithAuthoritiesByEmail(login)
                .map(user -> createSpringSecurityUser(login, user, otp))
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
        }

        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        return userRepository.findOneWithAuthoritiesByLogin(lowercaseLogin)
            .map(user -> createSpringSecurityUser(lowercaseLogin, user, otp))
            .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));

    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user, String otp) {
        if (!user.getActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }
        Optional<UserExtra> userExtraOption = userExtraRepository.findOneByUserId(user.getId());
        if(userExtraOption.isPresent()) {
        	UserExtra userExtra = userExtraOption.get();
        	log.debug("userExtra details {}", userExtra);
        	        	
        	if (userExtra.getPasswordResetDate().isBefore(Instant.now().minusSeconds(PASSWORDLIFETIME * 86400))) {
        		throw new UserNotActivatedException("User " + lowercaseLogin + " needs to reset password");
        	}
        	
        	if (userExtra.getLockDate() != null && userExtra.getLockDate().isAfter(Instant.now().minusSeconds(PASSWORDLOCKTIME))) {
        		throw new UserNotActivatedException("User " + lowercaseLogin + " is locked");
        	}
        	
        	log.debug("OTP IS {}", otp);
        	if(userExtra.getOtp() == null) {
        		throw new UserNotActivatedException("User " + lowercaseLogin + " otp is not set");
        	}
        	
        	if (!(userExtra.getOtp() != null && userExtra.getOtp().equals(otp))) {
        		throw new UserNotActivatedException("User " + lowercaseLogin + " otp mismatch");
        	}
        }
        
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getLogin(),
            user.getPassword(),
            grantedAuthorities);
    }
}
