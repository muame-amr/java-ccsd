To run the application go with the following steps:

1- Create a folder name db in the root folder
2- Change the admin MongoDB admin and username in line 51, 52 in docker-compose.yaml file
3- add newly created username and password in the following format in the line 53 of docker-compose.yaml:
    - mongodb://${userName}:${password}@mongo:27017/

4- Change the user name an password in for the SpringBoot application in the following directory in line 3 and 4:

- ccsd
    - src
        - main
            - java
                - resources
                    - application.properties


5- Run docker compose up -d and wait for the application to boot up

    - Note: depends on your system it can take between 1-2 minutes.

The application frontend is running in port 3000. Here are the main directories

- Landing page: localhost:3000
- Sign-In page: localhost:3000/sign-in
- Dashboard page: localhost:3000/dashboard-admin
