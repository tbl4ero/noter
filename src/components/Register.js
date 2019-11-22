import React from 'react';
import { Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import { Animated, Loading } from './sc/mainSc'; 
import { LoginButton, Form, FormInput, LoginHeader } from './sc/forms';

const headers = (
    <Animated open height={"150px"}>
        <LoginHeader >Sign Up</LoginHeader>
        <LoginHeader secondary>Enter login and and password for your new account</LoginHeader>
    </Animated>
);

class Register extends React.Component {
    state = {
        login: '',
        pass: '',
        regDone: false,
        loading: false
    }
    
    handleLoginChange = (evt) => {
        this.setState({login: evt.target.value});
    }

    handlePwdChange = (evt) => {
        this.setState({pass: evt.target.value});
    }

    doReg = async() => {
        let fetched = await fetch(`https://note-r.herokuapp.com/api/reg/${this.state.login}`, {
            headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
            body: `login=${this.state.login}&pass=${this.state.pass}`,
            method: 'POST',
            mode: 'cors'
        });
        await fetched.text().then(data => {
            if (JSON.parse(data).userExists == true) {
                this.setState({userExists: true, loading: false});
            }
        });
    }

    handleReg = async (e) => {
        this.setState({userExists: false, loading: true});
        e.preventDefault();
        await this.doReg();
        if (!this.state.userExists) {
            let fetchUser = await fetch(`https://note-r.herokuapp.com/api/profile/`, {
                headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                body: `login=${this.state.login}&pass=${this.state.pass}`,
                method: 'POST',
                mode: 'cors'
            });
            let userToken;
            await fetchUser.text().then(data => {
                data = JSON.parse(data);
                userToken = data.token;
                localStorage.setItem('loginToken', userToken);
                localStorage.setItem('login', this.state.login);
                this.setState({regDone: true, loading: false});
            });
        }
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    render() {
        return (
        <div>
            {
                localStorage.getItem('login') 
                ? 
                <Redirect to={`/profile/${localStorage.getItem('login')}`} />
                : 
                <div> 
                    {this.state.loading ? 
                    <Loading />
                    :  
                    <div>
                        {headers}
                        {this.state.userExists && <LoginHeader error secondary>Chosen username is already taken</LoginHeader>}
                        <Form  onSubmit={this.handleReg}>
                            <FormInput 
                                required 
                                onChange={this.handleLoginChange} 
                                type="text" 
                                value={this.state.login} 
                                placeholder="Login" />
                            <FormInput 
                                required 
                                onChange={this.handlePwdChange} 
                                type="password" value={this.state.pass} 
                                placeholder="Password" />
                            <LoginButton type="submit" value="Sign Up" />
                        </Form>
                        <Link to="/">Sign In</Link>
                    </div>  
                    }
                </div>
            }
        </div>);
    }
}

export default Register;