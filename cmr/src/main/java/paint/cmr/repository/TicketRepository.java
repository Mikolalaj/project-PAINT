package paint.cmr.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import paint.cmr.model.Ticket;

import java.util.UUID;

public interface TicketRepository extends MongoRepository<Ticket, UUID> {
}
