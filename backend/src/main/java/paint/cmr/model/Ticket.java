package paint.cmr.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "tickets")
public class Ticket {
    @Id
    private UUID id;

    /**
     * The name of the ticket.
     */
    private String name;

    /**
     * The description of the ticket.
     */
    private String description;

    /**
     * The list of users assigned to the ticket.
     */
    @DocumentReference
    private List<User> assignedTo;

    /**
     * Indicates whether the ticket is marked as done or not.
     */
    private boolean isDone;
}