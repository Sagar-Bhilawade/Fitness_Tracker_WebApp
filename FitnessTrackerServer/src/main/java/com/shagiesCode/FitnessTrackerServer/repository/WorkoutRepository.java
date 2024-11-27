package com.shagiesCode.FitnessTrackerServer.repository;

import com.shagiesCode.FitnessTrackerServer.entity.Workout;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT SUM(w.duration) FROM Workout w")
    Integer getTotalWorkoutDuration();

    @Query("SELECT SUM(w.caloriesBurned) FROM Workout w")
    Integer getTotalWorkoutCaloriesBurned();

    @Query("SELECT w FROM Workout w ORDER BY w.date DESC ")
    List<Workout> findLast7Workouts(Pageable pageable);

    List<Workout>findByUserId(Long userId);
}
