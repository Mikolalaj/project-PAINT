package paint.cmr.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import paint.cmr.model.User;
import paint.cmr.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService{
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }

    public void delete(UUID id) {userRepository.deleteById(id);
    }
    public Optional<User> idUser(UUID id){return userRepository.findById(id);}

}
