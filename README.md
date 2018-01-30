# Readacity
This is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.
This project built wiht React, React-router-dom, Semantic-ui-react and start with create react app.

## Project preview
[Demo Link](https://react-myreads.firebaseapp.com/)

## BackEnd
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Install
```
git clone https://github.com/YuhanLin1105/react-readacity.git
npm install
```
## Run
```
npm start
```
## Development experience
* Used `componentWillUpdate()` to check if the component updated as i want.
* Used `shouldComponentUpdate(nextProps, nextState)` to imporve performance.
* Used `localStorage` to imporve performance.

## License
The content of this repository is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).
