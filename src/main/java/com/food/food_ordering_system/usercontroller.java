
package com.food.food_ordering_system;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class usercontroller {

    private final userrepo userRepository;

    public usercontroller(userrepo userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/signup")
    public ResponseEntity<Map<String, String>> signup(
            @RequestBody Map<String, String> data) {

        String name = data.get("name");
        String email = data.get("email");
        String password = data.get("password");

        if (name == null || name.isBlank()
                || email == null || email.isBlank()
                || password == null || password.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "Enter your name, email, and a password of at least 6 characters."));
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is already registered."));
        }

        userRepository.save(new user(name, email, password));

        return ResponseEntity.ok(
                Map.of("message", "Signup successful!"));
    }

    @PostMapping("/api/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "Email and password are required."));
        }

        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .map(u -> ResponseEntity.ok(
                        Map.of("message", "Login successful!")))
                .orElseGet(() -> ResponseEntity.status(401)
                        .body(Map.of("message",
                                "Invalid email or password.")));
                }
}

