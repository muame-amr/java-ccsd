package com.example.ccsd.Products;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface productsRepository extends MongoRepository<products, String> {
    
}   