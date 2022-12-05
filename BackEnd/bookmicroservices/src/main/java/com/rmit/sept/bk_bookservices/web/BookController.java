package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.services.BookService;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "https://www.bookeroo.net")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final MapValidationErrorService mapValidationErrorService;

    @Autowired
    public BookController(BookService bookService, MapValidationErrorService mapValidationErrorService) {
        this.bookService = bookService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @GetMapping()
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping(path = "{bookId}")
    public Book getBook(@PathVariable("bookId") Long bookId) {
        return bookService.getBookById(bookId);
    }

    @PostMapping("/search")
    public List<Book> getBooksBySearch(@Valid @RequestBody Map<String, Object> query) {
        return bookService.queryBooks((String)query.get("query"));
    }

    @PostMapping("/sell")
    public ResponseEntity<?> listNewBook(@Valid @RequestBody Book book, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;
        bookService.addNewBook(book);
        return  new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{bookId}") //NOT IMPLEMENTED IN FRONT END
    public void deleteBook(@PathVariable("bookId") Long bookId) {
        System.out.println(("BOOK DELETE SENT"));
        bookService.deleteBook(bookId);
    }

    @PutMapping(path = "{bookId}") //NOT IMPLEMENTED IN FRONT END
    public void updateBook(
            @PathVariable("bookId") Long bookId,
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String image) {
        System.out.println(("BOOK UPDATE SENT"));
        bookService.updateBook(bookId, isbn, title, author, image);
    }
}