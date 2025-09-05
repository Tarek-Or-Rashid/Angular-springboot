package com.tendersys.tendert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.tendersys")
@EntityScan(basePackages = "com.tendersys.model") 
@EnableJpaRepositories(basePackages = "com.tendersys.repository")

public class TendertApplication {
    public static void main(String[] args) {
        SpringApplication.run(TendertApplication.class, args);
    }
}

