package com.shagiesCode.FitnessTrackerServer.repository;

import com.shagiesCode.FitnessTrackerServer.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    @Query("SELECT COUNT(g) FROM Goal g WHERE g.user.id = :userId AND g.achieved = true")
    Long countAchievedGoalsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(g) FROM Goal g WHERE g.user.id = :userId AND g.achieved = false")
    Long countNotAchievedGoalsByUserId(@Param("userId") Long userId);

    List<Goal> findByUserId(Long userId);
}
