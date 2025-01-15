package com.example.ccsd.Products;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductsController {
    
    @Autowired
    private ProductsService productsService;

    @GetMapping
    public List<Products> getAllProducts() {
        List<Products> productsList = productsService.getAllProducts();  // Get all products

        System.out.println("getallproducts");

        // Process each product in the list
        return productsList.stream()
                .map(product -> {
                    // Add Base64 encoded image to each product
                    product.setImageStore(product.getImageStore());
                    return product;
                })
                .collect(Collectors.toList());  // Collect the processed products back into a list
    }


    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable String id) {
        try {
            // Fetch the product by ID using the service layer
            Products product = productsService.getProductsById(id);
            return ResponseEntity.ok(product); // Return the product with HTTP 200 status
        } catch (RuntimeException e) {
            // If product is not found, return HTTP 404 status
            return ResponseEntity.notFound().build();
        }
    }


    // add product based on the 
    @PostMapping
    public ResponseEntity<Map<String, Object>> addProduct(
                @RequestParam("title") String title,
                @RequestParam("postSlug") String postSlug,
                @RequestParam("postShortDescription") String postShortDescription,
                @RequestParam("tag") String tag,
                @RequestParam("place") String place,
                @RequestParam("date") String date,
                @RequestParam("status") String status,
                @RequestParam("image") MultipartFile image) throws IOException {

            // Convert the image to a byte array
            byte[] imageBytes = image.getBytes();  // Get image data

            // Create a new Product instance
            Products product = new Products();
            product.setTitle(title);
            product.setPostSlug(postSlug);
            product.setPostShortDescription(postShortDescription);
            product.setTag(tag);
            product.setPlace(place);
            product.setDateProduct(date);
            product.setStatus(status);
            product.setImageStore(imageBytes);  // Store image as byte array

            // Save the product in MongoDB
            Products savedProduct = productsService.addProducts(product);

            // Return a response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("product", savedProduct);
            
            return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProducts(@PathVariable String id, @RequestBody Products ProductsDetail) {
         Products updatedProducts = productsService.updateProducts(id, ProductsDetail);
         if (updatedProducts != null) {
             return ResponseEntity.ok(updatedProducts);
         }
         return ResponseEntity.notFound().build();
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteProducts(@PathVariable String id) {
         productsService.deleteProducts(id);
         return ResponseEntity.noContent().build();
     }

}