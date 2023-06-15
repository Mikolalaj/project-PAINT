package paint.cmr.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import paint.cmr.model.User;
import paint.cmr.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns a list of all users.
     *
     * @return List of users.
     */
    public List<User> allUsers(){
        return userRepository.findAll();
    }

    /**
     * Adds a new user.
     *
     * @param user The user to add.
     * @return The added user.
     */
    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }

    /**
     * Deletes a user by its ID.
     *
     * @param id The ID of the user to delete.
     */
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    /**
     * Retrieves a user by its ID.
     *
     * @param id The ID of the user to retrieve.
     * @return The retrieved user, if found.
     */
    public Optional<User> idUser(UUID id){
        return userRepository.findById(id);
    }
}