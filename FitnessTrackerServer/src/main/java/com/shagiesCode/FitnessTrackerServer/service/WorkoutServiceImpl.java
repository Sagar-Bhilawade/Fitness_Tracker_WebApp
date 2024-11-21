package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;
import com.shagiesCode.FitnessTrackerServer.entity.Workout;
import com.shagiesCode.FitnessTrackerServer.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements IWorkoutService {
    private final WorkoutRepository workoutRepository;

    public WorkoutDTO postWorkout(WorkoutDTO workoutDTO) {
        Workout workout = new Workout();
        workout.setDate(workoutDTO.getDate());
        workout.setDuration(workoutDTO.getDuration());
        workout.setType(workoutDTO.getType());
        workout.setCaloriesBurned(workoutDTO.getCaloriesBurned());
        return workoutRepository.save(workout).getWorkoutDTO();
    }

    public List<WorkoutDTO>getWorkouts(){
        List<Workout> workouts = workoutRepository.findAll();
        return workouts.stream().map(Workout::getWorkoutDTO).collect(Collectors.toList());
    }
}
