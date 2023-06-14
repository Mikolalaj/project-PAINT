package paint.cmr.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import paint.cmr.model.User;

import java.util.UUID;

public interface UserRepository extends MongoRepository<User, UUID> {

}
