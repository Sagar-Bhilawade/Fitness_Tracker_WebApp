package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.GoalDTO;
import com.shagiesCode.FitnessTrackerServer.entity.Goal;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import com.shagiesCode.FitnessTrackerServer.repository.GoalRepository;
import com.shagiesCode.FitnessTrackerServer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements IGoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public GoalDTO postGoal(GoalDTO dto, Long userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User Not found with Id :" + userId);
        dto.setUser(user.get());
        Goal goal = this.modelMapper.map(dto, Goal.class);
        return this.modelMapper.map(goalRepository.save(goal), GoalDTO.class);
    }

    public List<GoalDTO> getGoals() {
        List<Goal> goals = goalRepository.findAll();
        return goals.stream().map(goal -> this.modelMapper.map(goal, GoalDTO.class)).collect(Collectors.toList());
    }

    public GoalDTO updateStatus(Long id) {
        Optional<Goal> optionalGoal = goalRepository.findById(id);
        if (optionalGoal.isPresent()) {
            Goal goal = optionalGoal.get();
            goal.setAchieved(true);
            return this.modelMapper.map(goalRepository.save(goal), GoalDTO.class);

        }
        throw new EntityNotFoundException("Goal Not Found");
    }

    @Override
    public List<GoalDTO> getUserGoals(Long userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) throw new EntityNotFoundException("User Not found with Id :" + userId);
        return goalRepository.findByUserId(userId).stream().map(goal -> this.modelMapper.map(goal, GoalDTO.class)).collect(Collectors.toList());

    }
}
