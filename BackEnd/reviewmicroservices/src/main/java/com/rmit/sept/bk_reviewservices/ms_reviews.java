package com.rmit.sept.bk_reviewservices;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ms_reviews {

    private static final Logger LOGGER = LogManager.getLogger(ms_reviews.class);

    public static void main(String[] args) {
        SpringApplication.run(ms_reviews.class, args);

        LOGGER.info("Info level log message");
        LOGGER.debug("Debug level log message");
        LOGGER.error("Error level log message");
    }
}
