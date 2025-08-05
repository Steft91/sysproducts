FROM openjdk:17-jdk-alpine as builder
WORKDIR /app
COPY ./pom.xml ./ 
COPY ./.mvn ./.mvn
COPY ./mvnw ./
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8003
ENTRYPOINT ["java", "-jar", "app.jar"]
