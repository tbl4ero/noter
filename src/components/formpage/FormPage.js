import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Animated, Loading } from "../sc/mainSc";
import { LoginHeader } from "../sc/forms";
import { FormComp } from "./FormComp";

const FormHeaders = props => (
    <Animated open height="200px">
        <LoginHeader>{props.action}</LoginHeader>
        <LoginHeader secondary>{props.actionDesc}</LoginHeader>
        {props.error && (
            <LoginHeader error secondary>
                {props.errorMessage}
            </LoginHeader>
        )}
    </Animated>
);

export const FormPage = props => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const checkCb = async (login, pass) => {
        await props.checkUsername(setError, login, pass);
    };

    const loginUser = data => {
        if (data.token === null) {
            setError(true);
        } else {
            localStorage.setItem("loginToken", data.token);
            localStorage.setItem("login", data.login);
        }
    };

    return (
        <div>
            {localStorage.getItem("login") ? (
                <Redirect to={`/profile/${localStorage.getItem("login")}`} />
            ) : (
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div>
                            <FormHeaders {...props} error={error} />
                            <FormComp
                                checkCb={checkCb}
                                error={error}
                                loginUser={loginUser}
                                setLoading={setLoading}
                                {...props}
                            />
                            <Link to={props.link.address}>
                                {props.link.name}
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
