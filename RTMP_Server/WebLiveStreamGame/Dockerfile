FROM openjdk:17
# ADD target/springboot-docker-compose.jar springboot-docker-compose.jar
# ENTRYPOINT [ "java", "-jar", "/springboot-docker-compose.jar" ]

WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]

# WORKDIR /app
# COPY . /app
# CMD ["./mvnw", "spring-boot:run"]

