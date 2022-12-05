package com.rmit.sept.bk_loginservices.configurations;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class UserConfig {
    @Bean()
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User user1 = User.builder()
                    .username("admin")
                    .firstName("admin")
                    .lastName("admin")
                    .email("admin@admin.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Admin")
                    .isActive(true)
                    .about("If there are any issues with the website, please contact us and we will fix it right away")
                    .image("//cdn.shopify.com/s/files/1/2775/5576/products/IMG_5530_200x.jpg?v=1616280403 200w")
                    .build();
            User user2 = User.builder()
                    .username("mario")
                    .firstName("mario")
                    .lastName("luigi")
                    .email("mario@luigi.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Publisher")
                    .abn("1234567899")
                    .isActive(false)
                    .about("Itsa me!")
                    .image("https://assets.nintendo.com/image/upload/f_auto,q_auto/ncom/en_US/merchandising/curated%20list/Jump%20for%20joy%20with%20Super%20Mario/515x325_gameStore_mario?v=2021091719")
                    .build();
            User user3 = User.builder()
                    .username("foffman")
                    .email("foffman@hotmail.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Regular")
                    .isActive(true)
                    .about("FOFF MAN")
                    .image("https://www.petsial.com/wp-content/uploads/2019/04/Why-Are-My-Rabbits-Fighting-All-of-a-Sudden-696x696.jpg")
                    .build();
            User user4 = User.builder()
                    .username("bowser")
                    .firstName("king")
                    .lastName("kooper")
                    .email("bowser@hotmail.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Publisher")
                    .abn("111111199")
                    .isActive(false)
                    .about("RAWROAR!")
                    .image("https://mario.wiki.gallery/images/thumb/7/7d/MSOGT_Bowser.png/300px-MSOGT_Bowser.png")
                    .build();
            User user5 = User.builder()
                    .username("gray fox")
                    .firstName("frank")
                    .lastName("jaegar")
                    .email("ninja@hotmail.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Publisher")
                    .abn("222222222")
                    .isActive(false)
                    .about("I am like you, I have no name")
                    .image("https://i.pinimg.com/236x/96/e0/65/96e0656d877c290cbfb289e917c80725.jpg")
                    .build();
            User user6 = User.builder()
                    .username("link")
                    .firstName("link")
                    .lastName("link")
                    .email("link@link.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Publisher")
                    .abn("1234567899")
                    .isActive(false)
                    .about("...")
                    .image("https://goombastomp.com/wp-content/uploads/2016/12/Link-300x268.png")
                    .build();
            User user7 = User.builder()
                    .username("zelda")
                    .firstName("hylia")
                    .email("zelda@hylia.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .accountType("Regular")
                    .isActive(true)
                    .about("The flow of time is cruel")
                    .image("https://cdn.vox-cdn.com/uploads/chorus_image/image/68623025/image__47_.0.png")
                    .build();

            if (repository.getByEmail(user1.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user1.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user1);
            }
            if (repository.getByEmail(user2.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user2.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user2);
            }
            if (repository.getByEmail(user3.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user3.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user3);
            }
            if (repository.getByEmail(user4.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user4.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user4);
            }
            if (repository.getByEmail(user5.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user5.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user5);
            }
            if (repository.getByEmail(user6.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user6.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user6);
            }
            if (repository.getByEmail(user7.getEmail()).isPresent() || repository.getByUsernameIgnoreCase(user7.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user7);
            }
        };
    }
}
