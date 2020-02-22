import React from "react";
import { FormPage } from "./formpage/FormPage";

export const Login = props => {
    const link = {
        address: "/register",
        name: "Sign Up"
    };
    
    return (
        <FormPage
            checkUsername={() => true}
            errorMessage="Incorrect login or password"
            link={link}
            action="Sign In"
            actionDesc="Enter your login and password to sign in"
        />
    );
};