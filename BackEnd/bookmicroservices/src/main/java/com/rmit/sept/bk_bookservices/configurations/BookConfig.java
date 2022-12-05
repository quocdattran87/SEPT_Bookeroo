package com.rmit.sept.bk_bookservices.configurations;

import com.rmit.sept.bk_bookservices.repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class BookConfig {

    @Bean(name = "bookBean")
    CommandLineRunner commandLineRunner(BookRepository repository) {
        return args -> {
            Book book1 = Book.builder()
                    .isbn("9780545162074")
                    .title("Harry Potter Paperback Box Set (Books 1-7)")
                    .author("J. K. Rowling")
                    .genre("Fantasy")
                    .image("https://m.media-amazon.com/images/I/41XlFN304wL._SL160_.jpg")
                    .description("Second hand, in excellent condition")
                    .price(14.95)
                    .seller("Foffman")
                    .build();
            Book book2 = Book.builder()
                    .isbn("9780345538376")
                    .title("J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings")
                    .author("J.R.R. Tolkien")
                    .genre("Fantasy")
                    .image("https://m.media-amazon.com/images/I/51NrIXHzJPL._SL160_.jpg")
                    .description("Frodo goes on an epic journey")
                    .price(64.99)
                    .seller("Foffman")
                    .build();
            Book book3 = Book.builder()
                    .isbn("9781911015482")
                    .title("The Legend of Zelda: Breath of the Wild The Complete Official Guide: -Expanded Edition")
                    .author("Piggyback")
                    .genre("Instructional")
                    .image("https://m.media-amazon.com/images/I/51HTscN+TyL._SL160_.jpg")
                    .description("Well excuuuuuuuse me princess")
                    .price(29.95)
                    .seller("Mario")
                    .build();
            Book book4 = Book.builder()
                    .isbn("9780439443838")
                    .title("Rules (Scholastic Gold)")
                    .author("Lord, Cynthia - Lord, Cynthia")
                    .genre("Childrens")
                    .image("https://m.media-amazon.com/images/I/41i5CXDWqOL._SL160_.jpg")
                    .description("This cover has a duck on it")
                    .price(9.95)
                    .seller("Mario")
                    .build();
            Book book5 = Book.builder()
                    .isbn("9780323721769")
                    .title("Clinical Herbalism: Plant Wisdom from East and West")
                    .author("Lord, Rachel")
                    .genre("Educational")
                    .image("https://m.media-amazon.com/images/I/51uxgNROdsS._SL160_.jpg")
                    .description("Herbal medicine")
                    .price(34.95)
                    .seller("Bowser")
                    .build();
            Book book6 = Book.builder()
                    .isbn("9781737668114")
                    .title("Promises and Pomegranates: A Dark Contemporary Romance (Monsters & Muses)")
                    .author("Miller, Sav R.")
                    .genre("Drama")
                    .image("https://m.media-amazon.com/images/I/51cQm11NpyL._SL160_.jpg")
                    .description("Promises and Pomegranates is a full-length, standalone, dark contemporary romance based loosely on the framework/characters from the Hades and Persephone myth. It features mature themes, explicit scenes, triggers, and strong language. If you’re not a reader of the genre, this book may not be suitable for you. Reader discretion is advised.")
                    .price(19.99)
                    .seller("Bowser")
                    .build();
            Book book7 = Book.builder()
                    .isbn("9780143788577")
                    .title("Ducks for Dark Times")
                    .author("Leunig, Michael")
                    .genre("Humour")
                    .image("https://m.media-amazon.com/images/I/51YGuGuRanL._SL160_.jpg")
                    .description("A collection of cartoons about many strange and lovely things- kind words for dark days; simple poems concerning wonderful mysteries; reflections on sadness, joy, dismay, sanity, soup and beauty. Also- doubts, confessions, laments and tributes. Spirited depictions of dogs, ducks, teapots and trees, with various peculiar attempts to shine some light on dark and troubled times.")
                    .price(25.95)
                    .seller("Link")
                    .build();
            Book book8 = Book.builder()
                    .isbn("9780140148671")
                    .title("The travelling Leunig")
                    .author("Leunig, Michael")
                    .genre("Humour")
                    .image("https://m.media-amazon.com/images/I/51yulSRqhpL._SL160_.jpg")
                    .description("A collection of cartoons from an Australian cartoonist which directs a wry and off-beat humour at everyday life. Michael Leunig contributes cartoons and drawings to various papers and magazines in Australia, including the \"Melbourne Age\". His work has appeared in \"Woman's Day\" and \"London Oz\".")
                    .price(27.50)
                    .seller("Link")
                    .build();
            Book book9 = Book.builder()
                    .isbn("9781407181974")
                    .title("Goosebumps Classic (Series 1) - 10 Books Set Collection R.L. Stine")
                    .author("R.L. Stine")
                    .genre("Horror")
                    .image("https://m.media-amazon.com/images/I/51Ge6nyE+uL._SL160_.jpg")
                    .description("The Classic Goosebumps Series 10 Books Collection Set (Set 2) By R. L. Stine:\n" +
                            "\n" +
                            "Night of the Living Dummy 2:\n" +
                            "Amy's ventriloquist dummy, Dennis, has lost his head...for real. So Amy begs her family for a new dummy.\n" +
                            "\n" +
                            "The Haunted Mask:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time! With a fresh new look, GOOSEBUMPS is set to scare a whole new generation of kids.\n" +
                            "\n" +
                            "Return of the Mummy:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time! With a fresh new look.\n" +
                            "\n" +
                            "Please Don't Feed the Vampire!:\n" +
                            "The original books featuring the scariest creatures from the Goosebumps movie, in theaters October 16, 2015!\n" +
                            "\n" +
                            "One Day at Horrorland:\n" +
                            "Discover the original bone-chilling adventures that made Goosebumps one of the bestselling children's books series of all time.\n" +
                            "\n" +
                            "The Abominable Snowman of Pasadena:\n" +
                            "The original books featuring the scariest creatures from the Goosebumps movie, in theaters October 16, 2015!\n" +
                            "\n" +
                            "Vampire Breath:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time! With a fresh new look, GOOSEBUMPS is set to scare a whole new generation of kids.\n" +
                            "\n" +
                            "Say Cheese And Die!:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time! With a fresh new look.\n" +
                            "\n" +
                            "A Shocker on Shock Street:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time!\n" +
                            "\n" +
                            "Attack Of The Graveyard Ghouls:\n" +
                            "They're baa-ack! Make way for the bestselling children's series of all time! With a fresh new look, GOOSEBUMPS is set to scare a whole new generation of kids.")
                    .price(9.99)
                    .seller("Zelda")
                    .build();
            Book book10 = Book.builder()
                    .isbn("9780670874057")
                    .title("Short Notes from the Long History of Happiness")
                    .author("Leunig, Michael")
                    .genre("Humour")
                    .image("https://m.media-amazon.com/images/I/51ENJ88T3SL._SL160_.jpg")
                    .description("More ducks")
                    .price(12.99)
                    .seller("gray fox")
                    .build();


            if (repository.getFirstByIsbn(book1.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book1);
            }
            if (repository.getFirstByIsbn(book2.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book2);
            }
            if (repository.getFirstByIsbn(book3.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book3);
            }
            if (repository.getFirstByIsbn(book4.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book4);
            }
            if (repository.getFirstByIsbn(book5.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book5);
            }
            if (repository.getFirstByIsbn(book6.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book6);
            }
            if (repository.getFirstByIsbn(book7.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book7);
            }
            if (repository.getFirstByIsbn(book8.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book8);
            }
            if (repository.getFirstByIsbn(book9.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book9);
            }
            if (repository.getFirstByIsbn(book10.getIsbn()).isPresent()) {
                System.out.println("Book already exists");
            } else {
                repository.save(book10);
            }
        };
    }
}
