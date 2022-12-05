package com.rmit.sept.bk_loginservices.services;


import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.EmailAlreadyExistsException;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;



@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByID(Long id) { return userRepository.getById(id); }

    public User getUserByUsername(String username) {return userRepository.getByUsernameIgnoreCase(username).get(); }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalStateException("User with Id " + id + " does not exist");
        }
        userRepository.deleteById(id);
    }

    public User saveUser (User newUser){
        final boolean UsernameAlreadyExists = userRepository.getByUsernameIgnoreCase(newUser.getUsername()).isPresent();
        final boolean EmailAlreadyExists = userRepository.getByEmail(newUser.getEmail()).isPresent();

        try {
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setConfirmPassword(newUser.getConfirmPassword());
            newUser.setEmail(newUser.getEmail());
            return userRepository.save(newUser);
        } catch (Exception e) {
            if (UsernameAlreadyExists) {
                throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
            } else if (EmailAlreadyExists) {
                throw new EmailAlreadyExistsException("Email '" + newUser.getEmail() + "' already exists");
            }
        }
        return userRepository.save(newUser);
    }

    @Transactional
    public void approveUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));
        user.setIsActive(true);
    }

    @Transactional
    public void updateUser(Long id, String firstName, String lastName, String email, String phone, String abn, String about, String image) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));

        final boolean FirstNameIsNew = !Objects.equals(user.getFirstName(), firstName);
        final boolean LastNameIsNew = !Objects.equals(user.getLastName(), lastName);
        final boolean EmailIsNew = !Objects.equals(user.getEmail(), email);
        final boolean PhoneIsNew = !Objects.equals(user.getPhone(), phone);
        final boolean AbnIsNew = !Objects.equals(user.getAbn(), abn);
        final boolean AboutIsNew = !Objects.equals(user.getAbn(), abn);
        final boolean ImageIsNew = !Objects.equals(user.getImage(), image);

        final boolean EmailIsPresent = email != null && email.length() > 0;
        final boolean AbnIsPresent = abn != null && abn.length() > 0;
        final boolean EmailAlreadyExists = userRepository.getByEmail(email).isPresent();

        if (FirstNameIsNew) {
            user.setFirstName(firstName);
        }
        if (LastNameIsNew) {
            user.setLastName(lastName);
        }
        if (EmailIsPresent && EmailIsNew) {
            if (EmailAlreadyExists) {
                throw new EmailAlreadyExistsException("Email '" + email + "' already exists");
            }
            user.setEmail(email);
        }
        if (PhoneIsNew) {
            user.setPhone(phone);
        }
        if (AbnIsPresent && AbnIsNew) {
            user.setAbn(abn);
        }
        if (AboutIsNew) {
            user.setAbout(about);
        }
        if (ImageIsNew) {
            user.setImage(image);
        }
    }
}
