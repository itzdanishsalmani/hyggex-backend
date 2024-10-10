## Introduction
# Hey coder!
Welcome to the Voting Platform! This platform provides a backend system to manage voting eligibility, booth assignment, and voting processes efficiently. The primary purpose of this codebase is to ensure that all operations are performed securely and consistently, adhering to the rules of eligibility and capacity.

But coder! This codebase contains several bugs and challenges intentionally included for you to solve. Addressing these issues will help ensure the platform works as intended and adheres to voting rules. Here's an overview of what needs to be solved

## Issues Overview

1. **Ineligible Voting**: Some users are able to vote even when they are not eligible.

   - **Eligibility Criteria**: Users must be at least 18 years old to be eligible to vote.
   - **Expected Outcome**: Only users who meet the eligibility criteria should be allowed to vote.

2. **Incorrect Vote Withdrawal**: Users are allowed to withdraw their votes regardless of their age condition.

   - **Age Condition**: Only users below the age of 18 should be allowed to withdraw their votes.
   - **Expected Outcome**: Only users under the specified age should be allowed to withdraw their votes.

3. **Wrong Voting Booth Assignment**: Users are assigned to a voting booth without checking the booth's capacity.

   - **Maximum Capacity**: Each voting booth should have a maximum capacity of 15 users.
   - **Expected Outcome**: Voting booths should not exceed their maximum capacity when assigning users.

4. **Random Voting Allowance**: Users are sometimes allowed to vote based on a random decision instead of proper eligibility checks.

   - **Expected Outcome**: Voting eligibility should be consistently validated without randomness.

5. **Counting Eligible Users Incorrectly**: The system is unable to correctly determine the number of eligible users for voting.

   - **Expected Outcome**: The count of eligible users should always be accurate and consistent.

**Crushed all those issues? Great! It's time to level up—head on to the next section!**

## Implement the Following Changes in the Codebase

1. Update the votingBoothSchema to limit the number of users that can be assigned to a voting booth (max capacity: 15).

2. Write a function to assign a voting booth to a user, ensuring that the booth's capacity is not exceeded.

3. Before allowing a user to vote, check if the user has been assigned a voting booth.

4. Ensure the entire voting logic respects the assignment and capacity constraints throughout the codebase.


### Instructions ( Must be followed )

Please follow these formal guidelines to ensure proper workflow, maintain code quality, and uphold the integrity of the platform:

1. **Bug Resolution and Feature Implementation**: All identified bugs must be resolved, and assigned features should be implemented thoroughly before considering any task complete.

2. Branch Usage: Push code only in your respective branch. Alternatively, you may create a new repository and copy the code there for experimentation, but do not change the existing organized workflow.

3. Adhere to Timelines: Respect the project deadlines and adhere to the timelines provided for each task. Ensure timely communication if any delays are anticipated.

4. **Respect Privacy**: Do not share the codebase or any part of the project with unauthorized individuals. Always maintain confidentiality regarding project details.

5. Code Quality Standards: Write clean, maintainable, Ensure that proper comments are added where necessary and code follows the agreed-upon standards.


## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)


## Contact

If you have any questions or issues regarding the platform, feel free to reach out to the maintainers or open an issue in the repository.

