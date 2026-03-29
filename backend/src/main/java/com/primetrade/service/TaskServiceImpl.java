package com.primetrade.service;

import com.primetrade.dto.TaskRequest;
import com.primetrade.entity.Task;
import com.primetrade.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;;
    @Override
    public Task create(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        return taskRepository.save(task);
    }
@Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }
    @Override

    public Task update(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        return taskRepository.save(task);
    }

    public String delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
       taskRepository.deleteById(id);
       return "Task deleted";
    }
}
