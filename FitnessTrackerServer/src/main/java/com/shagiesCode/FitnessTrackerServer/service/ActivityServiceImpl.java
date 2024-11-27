package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.ActivityDTO;
import com.shagiesCode.FitnessTrackerServer.entity.Activity;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.repository.ActivityRepository;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements IActivityService {
    private final ActivityRepository activityRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    public ActivityDTO postActivity(ActivityDTO dto, Long userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User Not found with Id :" + userId);
        dto.setUser(user.get());
        Activity activity = this.modelMapper.map(dto, Activity.class);
        return this.modelMapper.map(activityRepository.save(activity), ActivityDTO.class);
    }

    @Override
    public List<ActivityDTO> getActivities() {
        return activityRepository
                .findAll().stream().map(activity -> this.modelMapper.map(activity, ActivityDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityDTO> getUserActivities(Long userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User Not found with Id :" + userId);
        return activityRepository.findByUserId(userId).stream().map(activity -> this.modelMapper.map(activity, ActivityDTO.class)).collect(Collectors.toList());
    }

}
