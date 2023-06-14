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
    @GetMapping("/users")
    public String allUsers(){
        return userService.allUsers().toString();
    }
    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }
    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable UUID id){
        userService.delete(id);
    }
}
