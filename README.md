How to setup locally  
1. Download via GitHub URL https://github.com/itzdanishsalmani/hyggex-backend.git  
2. Open in Vs Code  
3. RUN npm install
4. Add DB_URL in .env
5. RUN node index.js
6. Open in Browser http://localhost:3000/

API Testing
1. Create a User
Endpoint: POST http://localhost:3000/users/
Required Fields: email, name, age (Address is optional)
Description: This creates a new user in the database.
2. Get All Users
Endpoint: GET http://localhost:3000/users/
Description: Retrieves all users, regardless of their voting eligibility.
3. Get Eligible Users
Endpoint: GET http://localhost:3000/users/eligible
Description: Retrieves users who are eligible to vote (age ≥ 18).
4. Update User
Endpoint: PUT http://localhost:3000/users/update
Required Fields: userId, email (unique), age, name
Description: Updates user details. If the age is updated, the eligibleForVoting status is set to either "eligible" or "not eligible".
5. Create a Voting Booth
Endpoint: POST http://localhost:3000/voting-booth/createbooth
Required Fields: location
Description: Creates a voting booth with a capacity of 15. Assigned users and voting records are stored.
6. Assign Booth to a User
Endpoint: POST http://localhost:3000/voting-booth/assignbooth
Required Fields: userId, votingBoothId
Description: Assigns a user to a voting booth. A user must be assigned before voting, regardless of eligibility.
7. Cast a Vote
Endpoint: POST http://localhost:3000/voting-booth/vote
Required Fields: userId, votingBoothId
Description: Users can cast a vote if they are assigned to a booth and eligible (age ≥ 18). Voting records are stored.
8. Withdraw a Vote
Endpoint: POST http://localhost:3000/voting-booth/withdraw
Required Fields: userId, votingBoothId
Description: Users below the age of 18 can withdraw their vote or age is greater then unable to withdraw, and their record is removed from the booth's assigned users.
