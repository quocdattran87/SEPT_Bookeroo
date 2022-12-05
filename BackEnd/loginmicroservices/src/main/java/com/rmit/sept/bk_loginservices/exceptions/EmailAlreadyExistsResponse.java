package com.rmit.sept.bk_loginservices.exceptions;

public class EmailAlreadyExistsResponse {

    private String email;

    public EmailAlreadyExistsResponse(String email) {
        this.email = email;
    }

    public String getUsername() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
