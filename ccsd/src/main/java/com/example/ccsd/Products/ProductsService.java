package com.example.ccsd.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductsService {
    
    @Autowired
    private com.example.ccsd.Products.ProductsRepository ProductsRepository;


    public List<Products> getAllProducts() {
        return List.of();
    }

    public Products addProducts(Products product) {
        return product;
    }

    public Products getProductsById(String id) {
        return ProductsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Products updateProducts(String id, Products productsDetail) {
        return null;
    }

    public void deleteProducts(String id) {
    }
}
