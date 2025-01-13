//usersService.java
package com.example.ccsd.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class usersService {

    @Autowired
    private usersRepository usersRepository;

    public List<users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<users> getUserById(String id) {
        return usersRepository.findById(id);
    }

    public users addUser(users user) {
        return usersRepository.save(user);
    }

    public users updateUser(String id, users userDetails) {
        return usersRepository.findById(id).map(user -> {
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setAddress(userDetails.getAddress());
            user.setRole(userDetails.getRole());
            user.setUsername(userDetails.getUsername());
            user.setDob(userDetails.getDob());
            user.setProfPic(userDetails.getProfPic());
            return usersRepository.save(user);
        }).orElse(null);
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }

    public users getUserByEmail(String email) {
        return usersRepository.findAll().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst().orElse(null);
    }
}
