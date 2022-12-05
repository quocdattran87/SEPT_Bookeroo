package com.rmit.sept.bk_bookservices;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ms_books {

    private static final Logger LOGGER = LogManager.getLogger(ms_books.class);

    public static void main(String[] args) {
        SpringApplication.run(ms_books.class, args);

        LOGGER.info("Info level log message");
        LOGGER.debug("Debug level log message");
        LOGGER.error("Error level log message");
    }
}
