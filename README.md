# when-was-that

We serve index with EJS in server.js

**React without JSX:**
ReactDOM.render(
  React.createElement('h2', null, 'Hello React'),
  document.getElementById('root')
);

**React with JSX: (a react element, not component)**
```html
ReactDOM.render(
  <h2>Hello React with JSX -- {Math.random()}</h2>,
  document.getElementById('root')
);
```

**React Default Properties**
```html
App.defaultProps = {
    headerMessage: 'Hello!'
};
```

**CSS**
https://www.w3schools.com/cssref/css_websafe_fonts.asp

## Setup Notes to Self
* confidental.js is ignored from the repo
* `npm i`
* add `.\node_modules\.bin` to path
* `npm start` or `node public\server.js`
* `npm run dev`
