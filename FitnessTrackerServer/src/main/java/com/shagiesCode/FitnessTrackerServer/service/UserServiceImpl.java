package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.dto.UserDTO;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.exception.DuplicateUserEmailException;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import com.shagiesCode.FitnessTrackerServer.security.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtils jwtUtils;

    @Override
    public UserDTO signUp(SignUpDTO signUpDTO) {
        User user = this.modelMapper.map(signUpDTO, User.class);
       if(userRepository.findByEmail(user.getEmail()).isPresent()) throw new DuplicateUserEmailException("Email id is already registered . Please try sign in. . .");
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));
        user= userRepository.save(user);
        return this.modelMapper.map(user, UserDTO.class);
    }

    @Override
    public Map<String, String> getUserByEmailAndPassword(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        Map<String, String> response = new HashMap<>();
        if (authentication.isAuthenticated()) {
            response.put("token", jwtUtils.generateToken(email));
        } else {
            response.put("error", "Authentication failed");
        }
        return response;
    }
}
