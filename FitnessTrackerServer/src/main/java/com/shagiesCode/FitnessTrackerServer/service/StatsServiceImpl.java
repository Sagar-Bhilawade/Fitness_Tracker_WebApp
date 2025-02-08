package com.shagiesCode.FitnessTrackerServer.service;


import com.shagiesCode.FitnessTrackerServer.dto.ActivityDTO;
import com.shagiesCode.FitnessTrackerServer.dto.GraphDTO;
import com.shagiesCode.FitnessTrackerServer.dto.StatsDTO;
import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;
import com.shagiesCode.FitnessTrackerServer.entity.Activity;
import com.shagiesCode.FitnessTrackerServer.entity.Workout;
import com.shagiesCode.FitnessTrackerServer.repository.ActivityRepository;
import com.shagiesCode.FitnessTrackerServer.repository.GoalRepository;
import com.shagiesCode.FitnessTrackerServer.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements IStatsService {
    private final GoalRepository goalRepository;
    private final ActivityRepository activityRepository;
    private final WorkoutRepository workoutRepository;
    private final ModelMapper modelMapper;

    @Override
    public StatsDTO getStats(Long userId) {
        Long achievedGoals = goalRepository.countAchievedGoalsByUserId(userId);
        Long notAchievedGoals = goalRepository.countNotAchievedGoalsByUserId(userId);
        Integer totalSteps = activityRepository.getTotalStepsByUserId(userId);
        Double totalDistance = activityRepository.getTotalDistanceByUserId(userId);
        Integer totalActivityCaloriesBurned = activityRepository.getTotalActivityCaloriesBurnedByUserId(userId);
        Integer totalWorkoutDuration = workoutRepository.getTotalWorkoutDurationByUserId(userId);
        Integer totalWorkoutCaloriesBurned = workoutRepository.getTotalWorkoutCaloriesBurnedByUserId(userId);

        StatsDTO dto = new StatsDTO();
        dto.setAchievedGoals(achievedGoals != null ? achievedGoals : 0);
        dto.setNonAchievedGoals(notAchievedGoals != null ? notAchievedGoals : 0);
        dto.setSteps(totalSteps != null ? totalSteps : 0);
        dto.setDistance(totalDistance != null ? totalDistance : 0.0);
        dto.setTotalCaloriesBurned(totalActivityCaloriesBurned != null ? totalActivityCaloriesBurned : 0);
        dto.setTotalWorkoutDuration(totalWorkoutDuration != null ? totalWorkoutDuration : 0);
        dto.setTotalWorkoutCaloriesBurned(totalWorkoutCaloriesBurned != null ? totalWorkoutCaloriesBurned : 0);
        return dto;
    }

    @Override
    public GraphDTO getGraphStats(Long userId){
        Pageable pageable = PageRequest.of(0,7);
        List<Workout> workouts = workoutRepository.findLast7WorkoutsByUserId(userId, pageable);
        List<Activity> activities = activityRepository.findLast7ActivitiesByUserId(userId, pageable);

        GraphDTO graphDTO = new GraphDTO();
        graphDTO.setWorkouts(workouts.stream().map(workout -> this.modelMapper.map(workout, WorkoutDTO.class)).collect(Collectors.toList()));
        graphDTO.setActivities(activities.stream().map(activity -> this.modelMapper.map(activity, ActivityDTO.class)).collect(Collectors.toList()));
        return graphDTO;
    }
}
