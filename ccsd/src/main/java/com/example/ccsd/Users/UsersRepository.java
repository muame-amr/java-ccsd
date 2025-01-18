// Fixed usersRepository.java
package com.example.ccsd.Users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<Users, String> {
}

