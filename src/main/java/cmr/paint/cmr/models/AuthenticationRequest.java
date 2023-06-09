package cmr.paint.cmr.models;

public class AuthenticationRequest {
    public AuthenticationRequest() {
    }
    private String id;
    private String name;
    private String password;
    private boolean enable;

    private String email;


    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
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
