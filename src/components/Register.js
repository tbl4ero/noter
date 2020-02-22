import React from 'react';
import { apiURL } from '../const';
import { FormPage } from './formpage/FormPage';

const Register = props => {
    const link = {
        address: "/",
        name: "Sign In"
    };

    const checkUsername = async(setError, login, pass) => {
        await fetch(`${apiURL}/api/reg/${login}`, {
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            body: `login=${login}&pass=${pass}`,
            method: "POST",
            mode: "cors"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.userExists == true) {
                    setError(true);
                }
            });
    };

    return (
        <FormPage
            checkUsername={checkUsername}
            errorMessage="Username already exists"
            link={link}
            action="Sign Up"
            actionDesc="Create a new account"
        />
    );
};

export default Register;