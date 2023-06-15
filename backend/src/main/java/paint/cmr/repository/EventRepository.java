package paint.cmr.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import paint.cmr.model.Event;

import java.util.UUID;

public interface EventRepository extends MongoRepository<Event, UUID> {
}
