# Front-end Project NC-Knews

## **my-nc-knewsii**
NC-news is a news app created for northCoders bootcamp. It is written in node.js using a library called 'React'. It keeps track of topics, articles, users and comments. An [online](https://my-nc-newsii.netlify.com) example of this application.

## REPO

The Front End repository can be accessed at https://github.com/Brlom/NC-NewsII. 
The Back End repository can be accessed at https://github.com/Brlom/my-nc-knews. 

### Getting Started

1. Fork and Clone this repository.
2. Once cloned to your machine, run `npm install` in your terminal to install all dependencies.
3. Run `npm run start` to start the node server on your local environment. 

### Deployment

This application has been deployed using netlify. [Deployment instructions](https://facebook.github.io/create-react-app/docs/deployment), should you wish to deploy your own version. 

### Built With
- Node.js 
- React
- axios
- @reach/router

### Versioning
Github has been used for versioning. For the versions available, see the tags on this repository.

### Authors
Britannia Lomax

### Acknowledgements
- [Joshtronic](https://alligator.io/react/tabs-component/) for supplying the tabs & tab components.
- Paul Copley for helping sort the chaos of the search components.
- All of the ncHelpers & tutors who helped FE2 from 07.01.19-14.01.19.

### TODO:
- There is a Warning that shows up when the page has been refreshed (after the first log-in), and I cannot figure out why this is happening.
- When logging in, the 'Home' component should be the default screen. Right now, it will go to the last page open when closing the session.
- On 'Topics' - I would like to implement queries so the user can sort the articles for each topic. 
- When a new comment has been added, it takes you back to the 'load comments' button but should re-render the comments including the new comment. 
- There are a few places where the wrong thing is rendering: on Search results - it is showing results for 'undefined'.
- Create a tab for "all articles" on 'Topics', as well as an add tab which will redirect the user to 'New Article' form.
- Add either a waiting ajax, or something similar, as a lot of the pages are currently taking a while to render.
- Add testing both with jest, and cypress. 
- Add pagination buttons for the articles and comments (when number exceeds 10).
- Fix the CSS, as there are certain elements which are not up to scratch ('Nav', 'Footer', 'CommentForm', general responsiveness)
- Clean up code - some states could be reduced by passing props down through their parents, new reusable components could be created to reduce amount of code, a mixture of inline-CSS and separate CSS files have been used - this should be consistent, a lot of div's have been used which is not as accessible as preferred.  
- Can currently create new article without title on 'topics select'.
