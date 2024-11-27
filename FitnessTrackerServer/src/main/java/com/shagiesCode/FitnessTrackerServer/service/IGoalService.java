package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.GoalDTO;

import java.util.List;

public interface IGoalService {
    GoalDTO postGoal(GoalDTO dto, Long userId);
    List<GoalDTO> getGoals();
    GoalDTO updateStatus(Long id);

    List<GoalDTO> getUserGoals(Long userId);
}
