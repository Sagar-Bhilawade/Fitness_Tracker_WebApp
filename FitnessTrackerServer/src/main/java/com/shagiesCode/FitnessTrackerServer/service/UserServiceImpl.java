package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.dto.UserDTO;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;
    @Override
    public UserDTO signUp(SignUpDTO signUpDTO) {
        User user = this.modelMapper.map(signUpDTO, User.class);
        user= userRepository.save(user);
        return this.modelMapper.map(user, UserDTO.class);
    }
}
