package com.rmit.sept.bk_bookservices.repositories;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Book getById(Long id);
    Optional<Book> getFirstByIsbn(String isbn13);
    List<Book> getBooksByAuthorContainingIgnoreCase(String query);
    List<Book> getBooksByTitleContainingIgnoreCase(String query);
    List<Book> getBooksByGenreContainingIgnoreCase(String query);
    List<Book> getBooksByIsbnContainingIgnoreCase(String query);
}
