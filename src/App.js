import React from 'react';
import {Login} from './components/Login';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import ProfileWrapper from './components/profile/ProfileWrapper';
import { ContentBox, MainContainer, Header } from './components/sc/mainSc';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/profile/:login" component={ProfileWrapper} />
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
                  <Route path="*" render={() => <h1 className="no-page">The page you requested was not found</h1>} />
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
