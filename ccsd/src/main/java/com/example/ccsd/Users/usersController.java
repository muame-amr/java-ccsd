//usersController.java

package com.example.ccsd.Users;



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
@RequestMapping("/api/users")
public class usersController {

    @Autowired
    private usersService usersService;

    // @GetMapping
    // public List<users> getAllUsers() {
    //     return usersService.getAllUsers();

    // }

    //  // Endpoint to get all users
    //  @GetMapping
    //  public ResponseEntity<List<users>> getAllUsersTeam() {
    //      List<users> usersList = usersService.getAllUsers();
    //      return ResponseEntity.ok(usersList);
    //  }
 
   

    
    @GetMapping
    public List<users> getAllUsers() {
    List<users> usersList = usersService.getAllUsers();  // Get all products

    // Process each users in the list
    return usersList.stream()
            .map(users -> {
                // Add Base64 encoded image to each users
                users.setImageStore64String(users.getImageAsBase64());
                return users;
            })
            .collect(Collectors.toList());  // Collect the processed users back into a list
    }

    // get user by id 
    @GetMapping("/{id}")
    public ResponseEntity<users> getUserById(@PathVariable String UserId) {
        return usersService.getUserById(UserId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // @PostMapping
    // public users addUser(@RequestBody users users) {
    //     return usersService.addUser(users);
  
    // }

    //prev addUser
    // @PostMapping
    // public users addUser(@RequestBody users users, @RequestParam("file") MultipartFile profPic) {
    //     return usersService.addUser(users);
  
    // }
// addUser v2
    ////////////////////////////////////////////
    /// //email, password, firstName, lastName, phone, address, role, userName, dob, image --sir's example
    
 @PostMapping
    public ResponseEntity<Map<String, Object>> addUser(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("address") String address,
            @RequestParam("role") String role,
            @RequestParam("username") String username,
            @RequestParam("dob") String dob,
           
           
            @RequestParam("profPic") MultipartFile profPic) throws IOException {

        // Convert the image to a byte array
        byte[] imageBytes = profPic.getBytes();  // Get image data

        // Create a new users instance
        users users = new users();
        users.setEmail(email);
        users.setPassword(password);
        users.setFirstName(firstName);
        users.setLastName(lastName);
        users.setPhoneNumber(phoneNumber);
        users.setAddress(address);
        users.setRole(role);
        users.setUsername(username);
        users.setDob(dob);
       
      
        users.setProfPic(imageBytes); //store image as byte array


        // Save the users in MongoDB
        users savedusers = usersService.addUser(users);

        // Return a response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("users", savedusers);
        
        return ResponseEntity.ok(response);
    }

//     @RestController
// @RequestMapping("/api")
// public class TeamController {

    // @Autowired
    // private UserRepository userRepository;

    // @GetMapping("/team")
    // public List<users> getTeam() {
    //     return usersService.findAll()
    //             .stream()
    //             .map(user -> new users(user.getFirstName(), user.getRole(), user.getProfPic()))
    //             .collect(Collectors.toList());
    // }





    ///////////////////////////////////////

//     @PostMapping("/{id}/uploadImage")
// public ResponseEntity<String> uploadUserImage(@PathVariable String id,@RequestParam("file") MultipartFile file) {
//     try {
//         // Validate file type
//         if (!file.getContentType().startsWith("image/")) {
//             return ResponseEntity.badRequest().body("File type not supported. Please upload an image.");
//         }

//         // Save the file (in database or file system)
//         String imageUrl = usersService.addUser(users, profPic);
        
//         return ResponseEntity.ok(imageUrl); // Return the file URL or success message
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(500).body("Error uploading the file.");
//     }

    @PutMapping("/{id}")
    public ResponseEntity<users> updateUser(@PathVariable String id, @RequestBody users usersDetails) {
        users updatedusers = usersService.updateUser(id, usersDetails);
        if (updatedusers != null) {
            return ResponseEntity.ok(updatedusers);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        usersService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }



    //  @PostMapping("auth/createAd")
    // public Ads createAd(
    //     @RequestParam("adsImages") MultipartFile[] adsImages,
    //     // Add other parameters
    // ) {
    //     String uploadDirectory = "src/main/resources/static/images/ads";
    //     String adsImagesString = "";

    //     for (MultipartFile imageFile : adsImages) {
    //         adsImagesString += usersService.addUser(uploadDirectory, imageFile) + ",";
    //     }

    //     // Save the adsImagesString in your database
    //     // You can also associate it with other data in your Ads object
    // }

    // @PostMapping("/signin")
    // public ResponseEntity<?> signIn(@RequestBody users signInRequest) {
    //     boolean isValidUser = usersService.getUserByEmailPassword(users.getEmail(), users.getPassword());

    //     if (isValidUser ) {
          

    //          // Return a success response with a redirection URL
    //          Map<String, String> response = new HashMap<>();
    //          response.put("redirectUrl", "http://localhost:3000/dashboard-admin");
    //          return ResponseEntity.ok(response);
    //     } else {
    //         // Return an error response
    //         return ResponseEntity.status(401).body("Invalid email or password.");
    //     }
    // }

    @PostMapping("/signin")
public ResponseEntity<?> signIn(@RequestBody users signInRequest) {
    // Use the service to fetch the user by email
    users existingUser = usersService.getUserByEmail(signInRequest.getEmail());
    
    // Check if the user exists and passwords match
    if (existingUser != null && existingUser.getPassword().equals(signInRequest.getPassword())) {
        // If valid, prepare the redirection URL
        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", "http://localhost:3000/dashboard-admin");
        return ResponseEntity.ok(response);
    } else {
        // Return an error response for invalid credentials
        return ResponseEntity.status(401).body("Invalid email or password.");
    }
}
 

}


    

