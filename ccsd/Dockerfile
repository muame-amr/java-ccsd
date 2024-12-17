FROM maven:3.9.9-ibm-semeru-23-jammy
WORKDIR /app
EXPOSE 8082
COPY . .
RUN mvn clean package
CMD ["./mvnw", "spring-boot:run"]