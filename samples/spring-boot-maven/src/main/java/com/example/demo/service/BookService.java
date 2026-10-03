package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> findAll() { return repository.findAll(); }

    public Optional<Book> findById(Long id) { return repository.findById(id); }

    public Book save(Book book) { return repository.save(book); }

    public void deleteById(Long id) { repository.deleteById(id); }
}
