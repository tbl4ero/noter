import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Animated, Loading, LoginButton, Form, FormInput, LoginHeader } from './sc/mainSc';

class Login extends React.Component {
    
    state = {
        loggedIn: false,
        login: '',
        loading: false,
        passwd: '',
        wrongInfo: false
    }

    handleLoginChange = (evt) => {
        this.setState({login: evt.target.value});
    }

    handlePwdChange = (evt) => {
        this.setState({passwd: evt.target.value});
    }

    handleLogin = async(e) => {
        e.preventDefault();
        this.setState({loading: true});
        const fetchUser = await fetch(`https://note-r.herokuapp.com/api/profile/`, 
            {
                headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                body: `login=${this.state.login}&pass=${this.state.passwd}`,
                method: 'POST',
                mode: 'cors'
            }
        );
        await fetchUser.text().then(data => {
            let parsedData = JSON.parse(data);
            if (parsedData.token === null) {
                this.setState({wrongInfo: true});
            } else {
                localStorage.setItem('loginToken', parsedData.token);
                localStorage.setItem('login', parsedData.login);
                this.setState({loggedIn: true});
            }
        });
        this.setState({loading: false});
    }

    render() {
        return (
            <div>
                {localStorage.getItem('login') ? 
                    <Redirect to={
                        {
                            pathname:`/profile/${localStorage.getItem('loginToken')}`, 
                            loggedIn: true
                        }
                    } />
                :
                <div>
                    {this.state.loading 
                    ? 
                    <Loading />
                    :
                    <div className="login-wrapper">
                        <Animated height={"150px"} open>
                            <LoginHeader>Sign In</LoginHeader>
                            <LoginHeader secondary >Enter your login and password to sign in</LoginHeader>
                        </Animated>
                        {this.state.wrongInfo ? <LoginHeader error secondary>Incorrect login or password</LoginHeader> : ''}
                        <Form onSubmit={this.handleLogin}>
                            <FormInput required onChange={this.handleLoginChange} 
                                    type="text" 
                                    placeholder="Login" 
                                    value={this.state.login} 
                            />
                            <FormInput required onChange={this.handlePwdChange} 
                                    type="password" 
                                    placeholder="Password" 
                                    value={this.state.passwd} 
                            />
                            <LoginButton type="submit" value="Sign In" />
                        </Form>
                        <Link to="/register">Sign Up</Link>
                    </div>
                    }
                </div>
                }
            </div>
        );
    }
}

export default Login;