# Spring Boot + Maven sample

A small REST API for books built with Spring Boot 3, Spring Data JPA and an in-memory H2 database.

## Requirements

- Java 17+
- Maven 3.8+

## Run

```bash
mvn spring-boot:run
```

The API is at http://localhost:8080/api/books.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/{id}` | Get one book |
| `POST` | `/api/books` | Create a book |
| `PUT` | `/api/books/{id}` | Update a book |
| `DELETE` | `/api/books/{id}` | Delete a book |

## Test and package

```bash
mvn test
mvn package          # builds target/spring-boot-maven-sample-0.0.1-SNAPSHOT.jar
java -jar target/spring-boot-maven-sample-0.0.1-SNAPSHOT.jar
```

## H2 console

http://localhost:8080/h2-console with JDBC URL `jdbc:h2:mem:demo`, user `sa`, empty password. These are local demo defaults for an in-memory database.

## CI

`.github/workflows/spring-ci.yml` at the repo root builds with JDK 17, runs the tests and uploads the jar as a build artifact.
