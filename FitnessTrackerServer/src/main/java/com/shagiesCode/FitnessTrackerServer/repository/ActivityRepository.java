package com.shagiesCode.FitnessTrackerServer.repository;

import com.shagiesCode.FitnessTrackerServer.entity.Activity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT SUM(a.steps) FROM Activity a WHERE a.user.id = :userId")
    Integer getTotalStepsByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(a.distance) FROM Activity a WHERE a.user.id = :userId")
    Double getTotalDistanceByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(a.caloriesBurned) FROM Activity a WHERE a.user.id = :userId")
    Integer getTotalActivityCaloriesBurnedByUserId(@Param("userId") Long userId);

    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId ORDER BY a.date DESC")
    List<Activity> findLast7ActivitiesByUserId(@Param("userId") Long userId, Pageable pageable);
    List<Activity>findByUserId(Long userId);
}
