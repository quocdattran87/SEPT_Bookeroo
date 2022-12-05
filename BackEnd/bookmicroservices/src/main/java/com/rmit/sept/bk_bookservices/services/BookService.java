package com.rmit.sept.bk_bookservices.services;

import com.rmit.sept.bk_bookservices.repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.getById(id);
    }

    public List<Book> queryBooks(String query) {
        Map<Long, Book> map = new HashMap<>();
        for (Book book : bookRepository.getBooksByTitleContainingIgnoreCase(query)) {
            map.put(book.getId(), book);
        }
        for (Book book : bookRepository.getBooksByAuthorContainingIgnoreCase(query)) {
            map.put(book.getId(), book);
        }
        for (Book book : bookRepository.getBooksByGenreContainingIgnoreCase(query)) {
            map.put(book.getId(), book);
        }
        for (Book book : bookRepository.getBooksByIsbnContainingIgnoreCase(query)) {
            map.put(book.getId(), book);
        }

        List<Book> list = new ArrayList<>(map.values());
        return list;
    }

    public void addNewBook(Book book) {
        bookRepository.save(book);
    }

    public void deleteBook(Long bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new IllegalStateException("Book with Id " + bookId + " does not exist");
        }
        bookRepository.deleteById(bookId);
    }

    @Transactional
    public void updateBook(Long bookId, String isbn, String title, String author, String image) {
        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new IllegalStateException("Book with Id " + bookId + " does not exist"));

        if (isbn != null && isbn.length() > 0 && !Objects.equals(book.getIsbn(), isbn)) {
            if (bookRepository.getFirstByIsbn(isbn).isPresent()) {
                throw new IllegalStateException("Isbn13 already in use");
            } else {
                book.setIsbn(isbn);
            }
        }
        if (title != null && title.length() > 0 && !Objects.equals(book.getTitle(), title)) {
            book.setTitle(title);
        }
        if (author != null && author.length() > 0 && !Objects.equals(book.getAuthor(), author)) {
            book.setAuthor(author);
        }
        if (image != null && image.length() > 0 && !Objects.equals(book.getImage(), image)) {
            book.setImage(image);
        }
    }
}