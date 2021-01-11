# Onramp Fullstack Take Home Project

## Overview 🤖

Onramp blog is a Fullstack application that allows users to login, logout, CRUD blog posts, favorite posts, and search posts by date and title.

Given that this is my first TypeScript, Node.js/Express.js, Vue.js app, I followed this [Okta tutorial](https://developer.okta.com/blog/2018/11/15/node-express-typescript) closely for the initial setup and the authentication portions of this application.

## Techstack:

Frontend:
- TypeScript
- Vue

Backend:
- TypeScript
- Node
- Express

Other:
- Postgres database on Docker
- Okta

## Local setup
- clone this repo
- Run `npm install`
- Add a `.env` file to the root directory and the following ENV variables to it:
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
- Run `npm run dev`

## UI Design

The UI Design was focused on creating easy to find links and buttons for the user to easily see all if the actions they could perform on a specific post. Given that I have a deeper understander of the backend than the frontend of web development, I focused the UI design heavily on the initial tutorial that I followed to build the app. I added features progressively to meet all requirements and make the app intuitive for all users.

[INSERT GIF]

## DB Design

## Architecture Pattern

I spent a long time at the beginning of the project trying to find a tech stack that followed an architecture pattern that I am familiar with (MVC, Service/Facade) however I was unable to find one that I felt comfortable implementing within the time constraints. Therefore I settled on the MVVM (??) design pattern of Vue apps.

## Version Control / Project Management

I used this GitHub repo for version control for this project. I added new features on specific feature branched and merged those to my main branch through well documented pull requests. Had this been a group project, I would've added a helpful PR template and had thorough reviews and conversations within the PR.

I used the project board to plan, monitor, and keep track of my work. I made sure to document any technical debt or future work by creating issues for bugs or enhancements.

## Unit Testing

## Web Development Best Practices
- DRY use of partials
- REST
- User experience

## Feature Requirements:

At a minimum, your app should allow for users to be able to:
- [x] Create an account, login, and log out.
- [x] CRUD functionality:
  - Create a new blog post
  - Read a blog post
  - Update a post
  - Delete a post
- [ ] Search for blog posts based on at least 2 factors (date, title, etc.)
- [x] Favorite one or more blog posts at the same time.
- [x] View all of their favorites.

## What we're looking for 🌟

#### UI Design

A UI that converts all the requirements into user-friendly features. Assume the user is not tech savvy and needs the site to be intuitive. That said, do not focus all of your efforts on making a beautiful interface, it’s more important that the app works as expected and that you implement all of the requirements.

#### Architecture Pattern

You may select any architectural design pattern you want to implement for this application (MVC, etc.) You must use one and identify the one you chose to use and why in the README when you submit.

An architecture pattern enables you to define a guide for how a piece of software should function, such that it can be scalable, maintainable, and testable.

#### Version Control

Make sure to use version control with your app using a Github repository.
A large part of building a successful project is showing us the versions you had of the project so we can see the progress that you made.

#### Unit Testing

Unit testing is an important component of development. For this project, you will need to utilize a unit testing framework of your choice on at least one specific module of your application. You do not need to write integration tests or include other types of tests.


#### Web Devlopment Best Practices

It's important to subscribe to a set of best practices when designing and implementing a web app. Be mindful of these widely accepted principles:
Keep your code [DRY](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161) (don't repeat yourself).
Understand the big picture.
Start with the user experience.
Make sure your code is clean and simple.
Using these principles will result in a high quality user experience and ensuring other developers can easily navigate through your code.

#### Web Application Description

Each project submission must include a README file providing an overview of the application and details the app's overall architecture as well as your design decisions. Screenshots of the web app taken from the browser (localhost is fine) are also required. This task assesses the critical competency of communicating and documenting technical concepts.

## What we are NOT Evaluating

#### Feature depth

You won’t be earning extra points for having a bunch of features. Focus on creating a clean, simple application that addresses all of the requirements, has well-tested features, and is documented properly for submission.

## Submission Information

#### Submission Format

This repository will be your starting point. Please download (not clone or fork) this Github repository (INSERT GITHUB LINK HERE WHEN READY) and upload changes to a newly created repository. Once the web application has been completed, you'll be submitting a link to the new repository you created. Prior to submitting your project, you should update the README file to provide the following information:
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all UI Components.
- Brief description of the architectural design pattern that you leveraged.
- An overview of the best practices you implemented.
- Screenshots of each page in your application and descriptions of the overall user flow.


#### Submission Deadline + Process

You must submit your project by 9:00am PST/12:00pm EST on Wednesday, January 13 using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdtHMQzqCd1o8aVcFRbNfXOGTzijTJBMSaWvtNnx6CJbDEmJQ/viewform). Be sure that your project is viewable by the Onramp team as a **public** repository. You can make it private after 1/28/21.

Once you’ve submitted your project, you are expected to stop working on it. Any commits that occur after submission or the deadline will not be reviewed.

## Additional Resources

### Onramp Resources:

Please use the modules and resources in the [Blend Training Plan](https://www.onramp.io/training/5fce6ab55cd2a500174dc937) for resources and exercises on TypeScript and Version Control.

### Other Resources:

- [Website Design & Development](https://envisionitagency.com/blog/2018/04/best-practices-for-web-development/)
- [Development in Go](https://go.dev/solutions/webdev/)
- [Typescript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Typescript Best Practices](https://engineering.zalando.com/posts/2019/02/typescript-best-practices.html)
- [Separation of Concerns](https://youtu.be/VtF6aebWe58)
