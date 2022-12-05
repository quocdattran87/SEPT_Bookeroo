# RMIT SEPT 2021 Major Project


Run the project.

Run the BackEnd folder in Intellij and run each of the microservices.
    bookmicroservice
    loginmicroservice
    ordermicroservice
    reviewmicroservice

Run the FrontEnd in visual studio use npm start to run the website.




## Members
* Adam Wuei Cherng Hannington-Chen          s3720247
* Haopeng Zhou                                               s3555521
* Quoc Tran                                                      s3827826
* Yuehan Chen                                                 s3714653

## Records

* Github repository : https://github.com/s3827826/SEPTGROUP5
* jira Board : https://sept-group5.atlassian.net/jira/software/projects/SEPT/boards/1
* Google Docs: https://drive.google.com/drive/u/1/folders/1Ep5PgnF30ErBfeH5HLO61SDaGIsNL2_3

	
## Code documentation - Release 0.1.0 - date
* feature 1 - Users can create an account
* feature 2 - Users can log in to their account
* feature 3 - Users can search books in the database

* feature 4 - Users can list a book
* feature 5 - Users can buy a book
* feature 6 - Admin can approve or reject publisher accounts
  

To run the application locally : 
1) cd into each and every microservice (ms_booking, ms_availability, ms_profiles, ms_service) and run :
2) ./mvnw package && java -jar target/ms_[microservice]-0.0.1-SNAPSHOT.jar
3) cd into FrontEnd/myfirstapp
4) run "npm install"
5) run "npm start"



