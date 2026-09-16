package com.campus.lostfound.controller;

import java.util.Map;
import com.campus.lostfound.model.User;
import com.campus.lostfound.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService auth;
    public AuthController(AuthService auth) { this.auth = auth; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) { User saved = auth.register(user); saved.setPassword(null); return ResponseEntity.status(HttpStatus.CREATED).body(saved); }
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) { return Map.of("token", auth.login(body.getOrDefault("email", ""), body.getOrDefault("password", ""))); }
}
