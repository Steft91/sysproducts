# Etapa de build
FROM openjdk:17-jdk-alpine as builder
WORKDIR /app

COPY ./pom.xml ./
COPY ./.mvn ./.mvn
COPY ./mvnw ./

RUN ./mvnw dependency:go-offline

COPY ./src ./src

RUN ./mvnw clean package -DskipTests

# Etapa final
FROM openjdk:17-jdk-alpine
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Aquí pon el puerto que uses para categories (ejemplo 8083)
EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]
