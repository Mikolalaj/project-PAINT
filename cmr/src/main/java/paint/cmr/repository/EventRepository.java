package paint.cmr.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import paint.cmr.model.Event;

public interface EventRepository extends MongoRepository<Event,String> {
}
