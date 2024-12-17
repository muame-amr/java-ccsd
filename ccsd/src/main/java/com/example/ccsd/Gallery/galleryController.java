package com.example.ccsd.Gallery;

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
@RequestMapping("/api/Gallery")

public class galleryController {
    
    @Autowired
    private galleryService GalleryService;

    @GetMapping
    public List<gallery> getAllGallerys() {
        List<gallery> galleryList = GalleryService.getAllGallerys();
        

        return galleryList.stream()
        .map(gallery -> {
                // Add Base64 encoded image to each
            gallery.setImage64String(gallery.getImageAsBase64());
            return gallery;
        })
        .collect(Collectors.toList()); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<gallery> getGalleryById(@PathVariable String id) {
        return GalleryService.getGalleryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

     @PostMapping
    public ResponseEntity<Map<String, Object>> addGallery(
            @RequestParam("title") String title,
            @RequestParam("postSlug") String postSlug,
            @RequestParam("postShortDescription") String postShortDescription,
            @RequestParam("tag") String tag,
            @RequestParam("place") String place,
            @RequestParam("date") String date,
            @RequestParam("status") String status,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) throws IOException {

        byte[] imageBytes = image.getBytes();

        gallery Gallery = new gallery();
        Gallery.setTitle(title);
        Gallery.setPostSlug(postSlug);
        Gallery.setpostShortDescription(postShortDescription);
        Gallery.setTag(tag);
        Gallery.setPlace(place);
        Gallery.setDate(date);
        Gallery.setStatus(status);
        Gallery.setimage(imageBytes);
        Gallery.setContent(content);  
        
        gallery savedGallery = GalleryService.addGallery(Gallery);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("product", savedGallery);
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<gallery> updategallery(@PathVariable String id, @RequestBody gallery GalleryDetails) {
        gallery updatedgallery = GalleryService.updategallery(id, GalleryDetails);
        if (updatedgallery != null) {
            return ResponseEntity.ok(updatedgallery);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletegallery(@PathVariable String id) {
        GalleryService.deletegallery(id);
        return ResponseEntity.noContent().build();
    }
   
}
