package com.example.ccsd.Gallery;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface galleryRepository extends MongoRepository<gallery, String> {
}

