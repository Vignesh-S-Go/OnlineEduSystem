package com.vip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class Controller {

    @Autowired
    private Service userService;

    @Autowired
    private JwtUtil jwtUtil; 
    

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
            if (loggedInUser != null) {
                // Generate JWT token
                String token = jwtUtil.generateToken(loggedInUser.getEmail());
                return ResponseEntity.ok(new LoginResponse("Login Successful", token));
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

	    public static class LoginResponse {
	        private String message;
	        private String token;
	
	        public LoginResponse(String message, String token) {
	            this.message = message;
	            this.token = token;
	        }
	
	        public String getMessage() {
	            return message;
	        }
	
	        public String getToken() {
	            return token;
	        }
	    }
}