import React, { useState } from "react";
import { LoginButton, Form, FormInput } from "../sc/forms";
import { apiURL } from "../../const";

export const FormComp = props => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const handleInputChange = (evt, stateFunc) => {
        stateFunc(evt.target.value);
    };

    const handleForm = async e => {
        e.preventDefault();
        props.setLoading(true);
        await props.checkCb(login, pass);
        await fetch(`${apiURL}/api/profile/`, {
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            body: `login=${login}&pass=${pass}`,
            method: "POST",
            mode: "cors"
        })
            .then(resp => resp.json())
            .then(props.loginUser);
        props.setLoading(false);
    };

    return (
        <Form onSubmit={handleForm}>
            <FormInput
                required
                onChange={evt => handleInputChange(evt, setLogin)}
                type="text"
                value={login}
                placeholder="Login"
            />
            <FormInput
                required
                onChange={evt => handleInputChange(evt, setPass)}
                type="password"
                value={pass}
                placeholder="Password"
            />
            <LoginButton type="submit" value={props.action} />
        </Form>
    );
};