SYSTEM REQUIREMENT SPECIFICATION (SRS) SURVEY HUB

SUPERVISE BY  Eng. YUVEN Carlson.            

1. Introduction
SurveyHub is a web application where users create an account, build online surveys (quizzes, checkbox surveys, job interview forms), publish them to get a unique link, and send that link to the people who should answer.
It is built with the CRUD stack using react postgresql express et node js and deploy on vercel and Figma for the UI Design (https://www.figma.com/design/RAS8zXsNANypVlSzlg8cCC/SurveyHub?node-id=3-306&t=Y7fNC4PNmAXBvkmV-1).

3. Functional requirements
1. A visitor shall create an account with full name, email and password.
2. The system shall reject an email that is already registered.
3. The system shall store passwords only in hashed form.
4. A registered user shall log in with email and password.
5. After a successful login the system shall give the user a session token (JWT).
6. A logged-in user shall log out.
7. A user shall reset a forgotten password by email.
8. A user shall create a survey and choose its type.
9. A user shall add, edit, delete and reorder questions.
10. A user shall publish a survey, and the system shall generate a unique link.
11. A respondent shall open the link and submit answers without an account.
12. The owner shall view responses as a list and as charts.
13. The owner shall export responses to CSV.
14. The owner shall close or delete a survey.
3. Non-functional requirements
1. Performance: pages load in under 3 seconds on a 3G connection.
2. Security: HTTPS only, bcrypt for passwords, and input checked on the server.
3. Security: a user can only see and change their own surveys.
4. Usability: the interface works on phones from 320 px wide.
5. Availability: the system is available 99% of the time.
6. Maintainability: code is split into modules (routes, controllers, models).
7. Compatibility: works on the latest Chrome, Firefox, Edge and Safari

8. Scalability: the server holds no session data, so more servers can be added.
4. Object modelling (see Diagram 2)
Classes: User, Survey, Question, Response, Answer.
•	A User creates many Surveys.
•	A Survey contains one or more Questions, and receives many Responses.
•	A Response has one or more Answers.
5. Dynamic modelling
•	Sequence diagram (Diagram 3): shows the order of messages in signup and login between the user, the React app, the Express API and MongoDB.
•	State diagram (Diagram 4): a survey moves from Draft to Published to Closed to Archived, and can be deleted.
6. Functional mapping (each requirement traced to the code that will deliver it)
Requirement	Screen	API route	Database collection

