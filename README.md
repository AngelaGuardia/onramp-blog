# Onramp Fullstack Take Home Project

## Overview 🤖

Onramp blog is a Fullstack application that allows users to login, logout, CRUD blog posts, favorite posts.

Given that this is my first TypeScript, Node.js/Express.js, Vue.js app, I followed this [Okta tutorial](https://developer.okta.com/blog/2018/11/15/node-express-typescript) closely for the initial setup and the authentication portions of this application.

## Table of Contents
1. [Techstack](#Techstack)
1. [Local Setup](#localsetup)
1. [Project Retro](#retro)
1. [UI Design](#ui)
1. [DB Design](#db)
1. [Architecture Pattern](#architecture)
1. [Version Control / Project Management](#versioncontrol)
1. [Unit Testing](#testing)
1. [Web Development Best Practices](#bestpractices)
1. [Feature Completion](#completion)

## Techstack <a name="Techstack"></a>

- Frontend: TypeScript, Vue.js
- Backend: TypeScript, Node.js, Express.js
- Other: PostgreSQL database on Docker, Okta for Authentication

## Local setup <a name="localsetup"></a>
- Clone this repo
- Run `npm install`
- Add a `.env` file to the root directory and add the following ENV variables to it:
```
NODE_ENV=development
HOST_URL=http://localhost:8080
SESSION_SECRET=OnRamp
SERVER_PORT=8080
OKTA_ORG_URL=https://{yourOktaDomain}
OKTA_CLIENT_ID={yourClientId}
OKTA_CLIENT_SECRET={yourClientSecret}
PGHOST=localhost
PGUSER=postgres
PGDATABASE=postgres
PGPASSWORD=onrampblog
PGPORT=5432
```
- Get Okta keys [here](https://developer.okta.com/)
- Run `npm run initdb`
- Run `npm run dev`
- Visit the site [here](http://localhost:8080)

- For the purposes of making this project easier to review here are Okta keys and credentials to a generic account:
```
OKTA_ORG_URL=https://dev-1204909.okta.com
OKTA_CLIENT_ID=0oa3qn6w1RAK44W8I5d6
OKTA_CLIENT_SECRET=PV8g1w7Zxy7jxkj1lsC4GlT-qIp_jF35po4ENHWJ
```
`username: onrampbloguser@gmail.com`

`password: blend123`

## Project Retro <a name="retro"></a>

**Achievements:**
- Given the time constraints and the fact that this was my first attempt at building an application with this tech stack, I am proud about having completed all required features with the exception of the search functionality.
- [Fixed](https://github.com/AngelaGuardia/onramp-blog/pull/39) some major bugs before the deadline

**Challenges:**
- The time constraints presented a huge challenge when learning a whole new tech stack
- My experience is heavily focused on backend development so implementing frontend functionality with Vue.js was a challenge (and a really fun one at that!)

**Known Bugs:**
- I used [this project board](https://github.com/AngelaGuardia/onramp-blog/projects/1) to track my work and keep track of any [known bugs](https://github.com/AngelaGuardia/onramp-blog/projects/1?card_filter_query=label%3Abug). You can look at the issue descriptions for details on the approaches I would take to solve these bugs.

**Future Improvements:**
- You can find all tracked [enhancements](https://github.com/AngelaGuardia/onramp-blog/projects/1?card_filter_query=label%3Aenhancement) as issues on the project board. Here are the most prominent ones:
    - Add unit testing
    - Add an ORM to improve security and protect from sequel injection
    - Add better error handling to improve user experience
    - Add a post show page

## UI Design <a name="ui"></a>

The UI Design was focused on creating easy to find links and buttons for the user to easily see all the actions they could perform on a specific post. Given that I have a deeper understanding of the backend than the frontend of web development, I focused the UI design heavily on the initial tutorial that I followed to build the app. I added features progressively to meet all requirements and make the app intuitive for all users.

![ONRAMPBLOG1](https://user-images.githubusercontent.com/47278429/104373911-f3cd0900-54d5-11eb-96e3-a0a4ed1db076.gif)

## DB Design <a name="db"></a>

My initial database design included three tables, USERS, POSTS, and FAVORITES. Where USERS have many POSTS (that belong to users), and USERS have many favorites posts through FAVORITES (join table). The idea behind this design was to account for future scalability. By including a FAVORITES join table I could eventually allow users to favorite each other's posts and allow posts to be favorited by multiple users.

![Initial](https://user-images.githubusercontent.com/47278429/104373663-95a02600-54d5-11eb-8548-8d06ea3a69c9.png)

As the project developed, my database design changed. Since I used Okta for authentication, I no longer needed a USERS table. Additionally, given the time constraints I simplified the db design for this initial iteration by eliminating the FAVORITES table. Instead, I added a favorites column to the posts table that holds a boolean. This made the implementation of the favorites feature easier for the time being.  

![Final](https://user-images.githubusercontent.com/47278429/104373670-9769e980-54d5-11eb-801b-55f383faa476.png)

One major improvement I would like to make to this application is eliminating the use of raw sequel to query the database. This can be done by using an ORM like Sequelize.

## Architecture Pattern <a name="architecture"></a>

I spent a long time at the beginning of the project trying to find a tech stack that followed an architecture pattern that I am familiar with (MVC, Service/Facade). However, I was unable to find one that I felt comfortable implementing within the time constraints. Therefore I settled on the [MVVM design pattern](https://012.vuejs.org/guide/) of Vue.js apps. The Model-View-Viewmodel design pattern in Vue.js focuses on creating Vue objects (viewmodels) that connect the Views that the user sees and the Models via two-way data bindings. Most of the logic lives inside the viewmodels and is performed by directives and filters.

## Version Control / Project Management <a name="versioncontrol"></a>

I used this GitHub repo for version control for this project. I added new features on specific feature [branches](https://github.com/AngelaGuardia/onramp-blog/branches) and merged those to my main branch through well documented [pull requests](https://github.com/AngelaGuardia/onramp-blog/pulls?q=is%3Apr+is%3Aclosed). Had this been a group project, I would've added a helpful PR template and had thorough reviews and conversations within each PR.

I used the [project board](https://github.com/AngelaGuardia/onramp-blog/projects/1) to plan, monitor, and keep track of my work. I made sure to document any technical debt or future work by creating issues for bugs or enhancements.

## Unit Testing <a name="testing"></a>

Unfortunately, I did not have time to add unit testing to this application. I tried to set up tests in Jest but had some configuration issues. I decided to skip these for now and focus on completing the features. Out of all the required improvements to my code in this project, this is the most important to me. I've come to really embrace Test Driven Design so I would've liked to be able to do that here. For reference to some fully testes applications that I have built you can see these sample projects:
- [Crate](https://github.com/AngelaGuardia/Crate/tree/main/code/api/src/modules/user/tests) (Jest)
- [Viewing Party](https://github.com/ckccameron/viewing_party/tree/main/spec) (Rspec)

## Web Development Best Practices <a name="bestpractices"></a>

- I started my project by creating User Stories to plan my work. This allowed me to keep the user experience at the forefront of all my development work.
- I followed the REST convention when creating all my API points for ease of use and understanding for other developers that may look at this work. I also took the liberty of creating one non-RESTful endpoint to implement the favorites toogle functionality. I believe that web development best practices are important and should be followed as much as possible when applicable, but should also be approached with flexibility when the situation warrants it!
- I attempted to keep my code DRY by using view partials but had issues with rendering them. One major place where repeated code can be found is in all of the Favorites functionality. This code could use partials to DRY up the views and could use some more logic to DRY up the viewmodel.

## Feature Completion <a name="completion"></a>

At a minimum, your app should allow for users to be able to:
- [x] Create an account, login, and log out.
- [x] CRUD functionality:
  - [x] Create a new blog post
  - [x] Read a blog post
  - [x] Update a post
  - [x] Delete a post
- [ ] Search for blog posts based on at least 2 factors (date, title, etc.)
- [x] Favorite one or more blog posts at the same time.
- [x] View all of their favorites.


#### Submission Deadline + Process

You must submit your project by 9:00am PST/12:00pm EST on Wednesday, January 13 using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdtHMQzqCd1o8aVcFRbNfXOGTzijTJBMSaWvtNnx6CJbDEmJQ/viewform). Be sure that your project is viewable by the Onramp team as a **public** repository. You can make it private after 1/28/21.

Once you’ve submitted your project, you are expected to stop working on it. Any commits that occur after submission or the deadline will not be reviewed.
