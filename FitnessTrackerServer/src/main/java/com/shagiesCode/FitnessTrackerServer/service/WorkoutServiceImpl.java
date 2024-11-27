package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.entity.Workout;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import com.shagiesCode.FitnessTrackerServer.repository.WorkoutRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements IWorkoutService {
    private final WorkoutRepository workoutRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public WorkoutDTO postWorkout(WorkoutDTO workoutDTO, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User not found with id ::" + userId);
        workoutDTO.setUser(user.get());
        Workout workout = this.modelMapper.map(workoutDTO, Workout.class);
        return this.modelMapper.map(workoutRepository.save(workout), WorkoutDTO.class);
    }

    public List<WorkoutDTO>getWorkouts(){
        List<Workout> workouts = workoutRepository.findAll();
        return workouts.stream().map(workout -> this.modelMapper.map(workout, WorkoutDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<WorkoutDTO> getUserWorkouts(Long userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User Not found with Id :" + userId);
        return workoutRepository.findByUserId(userId).stream().map(workout -> this.modelMapper.map(workout, WorkoutDTO.class)).collect(Collectors.toList());

    }
}
