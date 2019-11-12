import React from 'react';
import Login from './components/Login';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import ProfileWrapper from './components/profile/ProfileWrapper';
import { Note } from './components/Note';
import { connect } from 'react-redux';
import { ContentBox, MainContainer, Header } from './components/sc/mainSc';

function App() {
  return (
    <div className="main-wrapper">
      <BrowserRouter>
      <Switch>
        <Route path="/profile/:token" component={ProfileWrapper} />
        <Route path="/" render={() => 
          <MainContainer>
            <Header>
                  <Link to="/" style={{ color: "black",textDecoration: "none"}}>
                    NOTER
                  </Link>      
            </Header>
            <ContentBox>
                <Switch>
                  <Route path="/" exact component={Login}></Route>
                  <Route path="/register" exact component={Register} />
                  <Route path="*" render={() => <h1 className="no-page">Страница не найдена</h1>} />
                </Switch>
            </ContentBox>
          </MainContainer>
        } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;