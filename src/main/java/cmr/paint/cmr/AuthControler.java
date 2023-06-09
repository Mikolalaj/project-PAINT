package cmr.paint.cmr;

import cmr.paint.cmr.models.AuthenticationRequest;
import cmr.paint.cmr.models.AuthenticationResponse;
import cmr.paint.cmr.models.UserModel;
import cmr.paint.cmr.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthControler {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    private ResponseEntity<?> newUser(@RequestBody AuthenticationRequest authenticationRequest){
        String username = authenticationRequest.getName();
        String password = authenticationRequest.getPassword();
        String email = authenticationRequest.getEmail();
        UserModel userModel = new UserModel();

        userModel.setEmail(email);
        userModel.setName(username);
        userModel.setPassword(password);
        userModel.setEnable(false);
        try {
            userRepository.insert(userModel);
        }catch (Exception e){
            return  ResponseEntity.ok(new AuthenticationResponse("Error"));

        }

        return  ResponseEntity.ok(new AuthenticationResponse("Succes"+username));
    }

}
