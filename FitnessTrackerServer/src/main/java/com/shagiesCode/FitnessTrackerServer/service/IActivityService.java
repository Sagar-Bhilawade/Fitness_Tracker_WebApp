package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.ActivityDTO;

import java.util.List;

public interface IActivityService {
    public ActivityDTO postActivity(ActivityDTO dto, Long userId);

    public List<ActivityDTO> getActivities();

    public List<ActivityDTO> getUserActivities(Long userId);
}
