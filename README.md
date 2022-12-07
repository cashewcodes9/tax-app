

## How to build the application


Tax-app is a simple tax calculation application build with Php Laravel REST API in the backend and ReactJS for the frontend.
Laravel sail is used to setup docker environment for the application (React app excluded).

Sail is the docker-compose.yml file and the sail script that is stored at the root of your project. The sail script provides a CLI with convenient methods for interacting with the Docker containers defined by the `docker-compose.yml` file.

Please follow the steps to build the application.

 1. If the application is being cloned for the first time, then, none of the application's Composer dependencies, including Sail, will be installed after you clone the application's repository to your local computer. This command uses a small Docker container containing PHP and Composer to install the application's dependencies:  
    ```
    docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php80-composer:latest \
       composer install --ignore-platform-reqs
    ```
 2. 


