# when-was-that

We serve index with EJS in server.js

**React without JSX:**
ReactDOM.render(
  React.createElement('h2', null, 'Hello React'),
  document.getElementById('root')
);

**React with JSX: (a react element, not component)**
ReactDOM.render(
  <h2>Hello React with JSX -- {Math.random()}</h2>,
  document.getElementById('root')
);

**React Default Properties**
App.defaultProps = {
    headerMessage: 'Hello!'
};
