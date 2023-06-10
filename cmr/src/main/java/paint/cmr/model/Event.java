package paint.cmr.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collation = "events")
public class Event {
    @Id
    private String  id;
    private String title;
    private String text;
    @DocumentReference
    private List<User> userIds;

}
