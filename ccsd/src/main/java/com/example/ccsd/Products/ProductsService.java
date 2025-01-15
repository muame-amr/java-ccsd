package com.example.ccsd.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    public Products addProducts(Products product) {
        return productsRepository.save(product);
    }

    public Products getProductsById(String id) {
        Optional<Products> product = productsRepository.findById(id);
        return product.orElse(null);
    }

    public Products updateProducts(String id, Products productsDetail) {
        Optional<Products> optionalProduct = productsRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Products existingProduct = optionalProduct.get();

            // Update fields
            existingProduct.setTitle(productsDetail.getTitle());
            existingProduct.setPostSlug(productsDetail.getPostSlug());
            existingProduct.setPostShortDescription(productsDetail.getPostShortDescription());
            existingProduct.setTag(productsDetail.getTag());
            existingProduct.setPlace(productsDetail.getPlace());
            existingProduct.setDateProduct(productsDetail.getDateProduct());
            existingProduct.setStatus(productsDetail.getStatus());
            existingProduct.setImageStore(productsDetail.getImageStore());

            // Save updated product
            return productsRepository.save(existingProduct);
        }
        return null;
    }

    public void deleteProducts(String id) {
        productsRepository.deleteById(id);
    }
}
