package com.example.ccsd;

import com.example.ccsd.Users.Users;
import com.example.ccsd.Users.UsersService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
public class CcsdApplication {

	public static void main(String[] args) {
		SpringApplication.run(CcsdApplication.class, args);
	}
	@Bean
	public CommandLineRunner runner(UsersService usersService) {
		return args -> {

			String imagePath = "src/main/resources/profpic.png";
			byte[] imageBytes = Files.readAllBytes(Paths.get(imagePath));
			Users adminUser = new Users(

					"John",
					"john.doe@admin.my",
					"passwd",
					"Doe",
					"+601110111012",
					"KL, MY",
					"admin",
					"admin",
					"10-11-2010",
					imageBytes
			);
			usersService.addUser(adminUser);
		};
	}
}
