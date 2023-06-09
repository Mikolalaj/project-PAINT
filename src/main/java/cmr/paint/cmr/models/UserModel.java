package cmr.paint.cmr.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "users")
public class UserModel {
    @Id
    private String id;
    private String username;
    private String password;
    private boolean enable;

    private String email;

    public UserModel() {
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
