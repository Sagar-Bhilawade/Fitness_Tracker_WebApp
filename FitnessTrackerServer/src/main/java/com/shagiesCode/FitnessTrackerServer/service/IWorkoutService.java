package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;

public interface IWorkoutService {
     WorkoutDTO postWorkout(WorkoutDTO workoutDTO);
}
