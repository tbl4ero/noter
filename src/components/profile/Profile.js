import React from "react";
import Sidebar from "./Sidebar";
import store from "../../redux/index";
import { Provider } from "react-redux";
import Editor from "./editor/Editor";
import { MainBox, Loading } from "../sc/mainSc";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { apiURL } from '../../const';

class Profile extends React.Component {
    state = {
        loading: true,
        notes: [],
        logged: undefined
    };

    logout = () => {
        localStorage.clear();
        this.setState({ logged: false });
        this.props.resetState();
    };

    componentDidMount = async () => {
        await fetch(
            `${apiURL}/api/profile/${localStorage.getItem(
                "loginToken"
            )}`,
            {
                headers: new Headers({
                    "Content-type": "application/x-www-form-urlencoded"
                }),
                method: "GET",
                mode: "cors"
            }
        )
            .then(resp => resp.json())
            .then(data => {
                if (data.wrongInfo === true) {
                    localStorage.clear();
                    this.setState({ logged: false });
                } else {
                    this.props.setInitialNotes(
                        data.notes.map((e, id) => Object.assign({}, e, { id }))
                    );
                    this.setState({ login: data.login });
                }
            });
        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                {this.state.logged === false ? <Redirect to="/" /> : ""}
                <Provider store={store}>
                    {this.state.loading ? (
                        <div
                            style={{
                                marginTop: "50px",
                                padding: "auto",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Loading style={{ margin: "0 auto" }} />
                        </div>
                    ) : (
                        <MainBox view={this.props.editor} direction="row">
                            <Sidebar
                                logout={this.logout}
                                notesArr={this.props.notes}
                                login={this.state.login}
                            />
                            <Editor></Editor>
                        </MainBox>
                    )}
                </Provider>
            </div>
        );
    }
}

export default connect(
    ({ notes, editor }) => {
        console.log("connect notes:", notes);
        return { notes, editor };
    },
    dispatch => {
        return {
            setInitialNotes: notes => {
                dispatch({
                    type: "SET_NOTES",
                    notes
                });
            },
            resetState: () => {
                dispatch({ type: "RESET_STATE" });
            }
        };
    }
)(Profile);
