# Introduction 
Create simple REST API in NODEJS using Express framework.

Main topic of application is BLOG/Diary.

Application should allow create/read/update/delete(CRUD) posts and comments.

# Implementation

## Stage 1

- Create endpoints to CRUD operations on posts and comments.
- Data should store in serialized file (using module `fs`, etc.)
- Remember: logic should splitted to small pieces and code should implemented with main design principles `DRY` and `KISS`!

## Stage 2
- Create middleware to logging traffic to server
- Create middleware to protect our resource. Create/update/delete posts/comments should only available for granted user with special permissions. To do this implement JWT token and create endpoints to sign in

## Stage 3
- Change storing data system to MongoDB/Mongoose