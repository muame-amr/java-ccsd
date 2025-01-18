package com.example.ccsd;

import com.example.ccsd.Users.Users;
import com.example.ccsd.Users.UsersRepository;
import com.example.ccsd.Users.UsersService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@SpringBootApplication
public class CcsdApplication {

    public static void main(String[] args) {
        SpringApplication.run(CcsdApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(UsersService usersService) {
        return args -> {

            String imagePath = "src/main/resources/profpic.jpg";
            byte[] imageBytes = Files.readAllBytes(Paths.get(imagePath));
            Users adminUser = new Users(
                    imageBytes,
                    "10-11-2010",
                    "admin",
                    "admin",
                    "KL, MY",
                    "+601110111012",
                    "Doe",
                    "John",
                    "cGFzc3dk", // passwd
                    "john.doe@admin.my"
            );

            Users userExist = usersService.getUserByEmail("john.doe@admin.my");
            if (userExist == null) {
                usersService.addUser(adminUser);
            }
        };
    }

}
