package paint.cmr.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import paint.cmr.model.User;

public interface UserRepository extends MongoRepository<User, String> {

}
