package paint.cmr.controller;

import org.springframework.web.bind.annotation.*;
import paint.cmr.model.User;
import paint.cmr.service.UserService;

import java.util.UUID;

@RestController
@RequestMapping
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint for retrieving all users.
     *
     * @return A string representation of all users.
     */
    @GetMapping("/users")
    public String allUsers() {
        return userService.allUsers().toString();
    }

    /**
     * Endpoint for adding a new user.
     *
     * @param user The user object to be added.
     * @return The added user object.
     */
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    /**
     * Endpoint for deleting a user by ID.
     *
     * @param id The ID of the user to be deleted.
     */
    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable UUID id) {
        userService.delete(id);
    }
}