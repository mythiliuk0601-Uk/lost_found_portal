package com.campus.lostfound.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import com.campus.lostfound.model.User;
import com.campus.lostfound.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository users;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final byte[] secret;
    private final long expiration;

    public AuthService(UserRepository users, @Value("${jwt.secret}") String secret, @Value("${jwt.expiration-ms}") long expiration) {
        this.users = users; this.secret = secret.getBytes(StandardCharsets.UTF_8); this.expiration = expiration;
    }

    public User register(User user) {
        user.setEmail(user.getEmail().trim().toLowerCase());
        if (users.existsByEmail(user.getEmail())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        user.setPassword(encoder.encode(user.getPassword()));
        if (!"STAFF".equalsIgnoreCase(user.getRole())) user.setRole("STUDENT"); else user.setRole("STAFF");
        return users.save(user);
    }

    public String login(String email, String password) {
        User user = users.findByEmail(email.trim().toLowerCase()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!encoder.matches(password, user.getPassword())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        Date now = new Date();
        return Jwts.builder().subject(user.getEmail()).claim("name", user.getName()).claim("role", user.getRole())
                .issuedAt(now).expiration(new Date(now.getTime() + expiration)).signWith(Keys.hmacShaKeyFor(secret)).compact();
    }

    public String emailFrom(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        try {
            Claims claims = Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret)).build().parseSignedClaims(authorization.substring(7)).getPayload();
            return claims.getSubject();
        } catch (Exception error) { throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token"); }
    }
}
