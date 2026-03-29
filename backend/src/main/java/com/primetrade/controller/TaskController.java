package com.primetrade.controller;


import com.primetrade.dto.TaskRequest;
import com.primetrade.entity.Task;
import com.primetrade.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("http://localhost:5173/**")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequest request) {
        return new ResponseEntity<>(taskService.create(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id,
                       @Valid @RequestBody TaskRequest request) {
        return new ResponseEntity<>(taskService.update(id, request), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
       return new ResponseEntity<>(taskService.delete(id), HttpStatus.OK);

    }
}
