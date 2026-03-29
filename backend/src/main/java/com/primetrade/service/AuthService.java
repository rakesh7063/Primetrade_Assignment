package com.primetrade.service;

import com.primetrade.config.JwtService;
import com.primetrade.dto.AuthRequest;
import com.primetrade.dto.AuthResponse;
import com.primetrade.dto.RegisterRequest;
import com.primetrade.entity.Role;
import com.primetrade.entity.User;
import com.primetrade.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
   private   PasswordEncoder passwordEncoder;
    @Autowired
  private JwtService jwtService;

    public String register(RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered";
    }

    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponse(token,user.getRole().toString(), user.getUsername());
    }
}
