package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.ActivityDTO;
import com.shagiesCode.FitnessTrackerServer.entity.Activity;
import com.shagiesCode.FitnessTrackerServer.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements IActivityService {
    private final ActivityRepository activityRepository;

    @Override
    public ActivityDTO postActivity(ActivityDTO dto) {
        Activity activity = new Activity();
        activity.setDate(dto.getDate());
        activity.setSteps(dto.getSteps());
        activity.setDistance(dto.getDistance());
        activity.setCaloriesBurned(dto.getCaloriesBurned());
        return activityRepository.save(activity).getActivityDto();
    }

    @Override
    public List<ActivityDTO> getActivities() {
        return activityRepository
                .findAll().stream().map(Activity::getActivityDto)
                .collect(Collectors.toList());
    }

}
