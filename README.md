

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
       laravelsail/php81-composer:latest \
       composer install --ignore-platform-reqs
    ```
 2. The `tax-app` directory has a `.env.example` file which need to be duplicated and renamed as `.env`. This file contains all the environment variables necessary to run the application.

 3. In order to run the docker containers, `./vendor/bin/sail build`. Alternatively, after setting up the alias for `vendor/bin/sail` only `sail build` command will work. 
 Create an alias by adding `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'` line to your shell configuration file in your home directory, such as ~/.zshrc or ~/.bashrc, and then restart your shell. The documentation will assume that you have added the alias and include `sail` instead of `./vendor/bin/sail`.

 4. Run `sail up` to run docker containers

 5. Now, our backend is up and running on docker containers. The database migration need to run. Run `sail artisan migrate:fresh` to migrate the tables in the database. A demo data seeder can be used to test the application. Run `sail artisan db:seed` to seed demo data.
 6. The `frontend` directory have the ReactJs application inside it. Go inside this directory and run `npm install && npm start`
 
 4. Now you can visit [Localhost](http://localhost:3000) and use the application.

#### Running tests:
Backend Test: Run `sail artisan test` command in your terminal inside project directory

Frontend Test: Inside `frontend` directory in your terminal run `npm test`



 ## No time to build, feel free to check my demo video.

 If you want to take a quick look at the app with it's functionality and review the code, access the demo video [HERE](https://www.youtube.com/watch?v=oUMV22C3zf8)
 

 


