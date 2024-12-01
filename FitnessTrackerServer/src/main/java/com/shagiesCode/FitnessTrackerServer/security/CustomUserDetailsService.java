package com.shagiesCode.FitnessTrackerServer.security;

import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class CustomUserDetailsService implements UserDetailsService {
@Autowired
    private  UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(()->new EntityNotFoundException("User does not exist with email :: "+username));
        return new CustomUserDetails(user);
    }
}
