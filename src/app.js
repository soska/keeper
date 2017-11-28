import React from 'react';
import AppContainer from './components/app-container';
import createDefaultListName from './utils/default-list-name';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'normalize.css';
import './utils/box-sizing-fix.css';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    background:#f9f9f9;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2NkQAKMIPbLly//i4uLM4I5MAAATV0EBCOd14sAAAAASUVORK5CYII=);
    font-family:menlo,courier,mono;
  }
`;


class App extends React.Component {

  render() {
    return (
      <Router>
        <Route path="/:list?" render={({match,history})=>{
          const {params} = match;
          const list = params.list || createDefaultListName();
          return (
            <AppContainer list={list} key={'app'}/>
          );
        }}/>
      </Router>
    );
  }
}

export default App;
