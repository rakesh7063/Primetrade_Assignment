package com.primetrade.service;

import com.primetrade.dto.TaskRequest;
import com.primetrade.entity.Task;
import com.primetrade.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TaskService {
    public Task create(TaskRequest request);
    public List<Task> getAll();
    public Task update(Long id, TaskRequest request);
    public String delete(Long id);
}
