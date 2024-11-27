package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;

import java.util.List;

public interface IWorkoutService {
     WorkoutDTO postWorkout(WorkoutDTO workoutDTO, Long userId);
     List<WorkoutDTO> getWorkouts();

    List<WorkoutDTO> getUserWorkouts(Long userId);
}
