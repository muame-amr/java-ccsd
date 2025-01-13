// Fixed usersRepository.java
package com.example.ccsd.Users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface usersRepository extends MongoRepository<users, String> {
 Optional<users> findByEmail(String email);
 Optional<users> findByUsername(String username);
}

