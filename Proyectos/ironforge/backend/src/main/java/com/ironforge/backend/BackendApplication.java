package com.ironforge.backend;

import com.ironforge.backend.model.Role;
import com.ironforge.backend.model.User;
import com.ironforge.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User provisionalUser = new User(
                        "admin",
                        passwordEncoder.encode("adminpassword123"),
                        "admin@ironforge.com",
                        Role.ADMIN
                );
                userRepository.save(provisionalUser);
                System.out.println("=================================================");
                System.out.println("PROVISIONAL USER CREATED SUCCESSFULLY FOR TESTING");
                System.out.println("Email: admin@ironforge.com");
                System.out.println("Username: admin");
                System.out.println("Password: adminpassword123");
                System.out.println("Role: ADMIN");
                System.out.println("=================================================");
            }
        };
    }
}
