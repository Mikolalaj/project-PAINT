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
@Document(collection = "events")
public class Event {
    @Id
    private UUID id;
    private String title;
    private String text;
    @DocumentReference
    private List<User> userIds;

}
