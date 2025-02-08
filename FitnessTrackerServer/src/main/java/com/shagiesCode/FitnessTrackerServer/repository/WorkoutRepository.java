package com.shagiesCode.FitnessTrackerServer.repository;

import com.shagiesCode.FitnessTrackerServer.entity.Workout;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT SUM(w.duration) FROM Workout w WHERE w.user.id = :userId")
    Integer getTotalWorkoutDurationByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(w.caloriesBurned) FROM Workout w WHERE w.user.id = :userId")
    Integer getTotalWorkoutCaloriesBurnedByUserId(@Param("userId") Long userId);

    @Query("SELECT w FROM Workout w WHERE w.user.id = :userId ORDER BY w.date DESC")
    List<Workout> findLast7WorkoutsByUserId(@Param("userId") Long userId, Pageable pageable);

    List<Workout>findByUserId(Long userId);
}
