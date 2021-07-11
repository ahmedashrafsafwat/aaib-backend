# AAIB FULLSTACK Task (BACKEND)

### IMOBRTANT BEFORE RUNNING:

 If you want to run the application locally set in environment variables `.env` file the `USING_DOCKER` key to 0, but if you want to use docker containers then set the value to 1

### To run this project you can run:

1. the following comands

run `npm install`

run `npm run start` or `nodemon start` (if you have nodemon installed in your development enviornment)

then test by heading over to:

   `http://localhost:5000/reports`

the default port is 5000 and the service on 5001 make sure they are avaliable

2. using Docker by running this commands:
   => first change the `USING_DOCKER` in the `.env` to `1`


   => then run type these commands
   
   `docker-compose build`
   `docker-compose up`

   then test by heading over to:

   `http://localhost:5000/reports`

the default port is 5000and the service on 5001  make sure they are avaliable

### To run the unit api tests

 unit api test: `npm run test`


For any questions or issues when running the task please contact me at ahmedashrafsafwat@gmail.com

Looking forward to hear from you