import React from 'react';
import Sidebar from './Sidebar';
import store from '../../redux/index';
import { Provider } from 'react-redux';
import Editor from './Editor';
import { MainBox } from '../sc/mainSc';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {

    state = {
        loading: true,
        notes: [],
        logged: undefined
    }

    logout = () => {
        localStorage.clear();
        this.setState({logged: false});
        this.props.resetState();
    }

    componentDidMount = async() => {
        await fetch(`http://127.0.0.1:5000/api/profile/${localStorage.getItem('loginToken')}`, 
            {
                headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                method: 'GET',
                mode: 'cors'
            }
        ).then(resp => resp.json()).then(data => {
            if (data.wrongInfo === true) {
                localStorage.clear();
                this.setState({logged: false});
                return;
            } else {
                this.props.setInitialNotes(data.notes);
                this.setState({login: data.login});
            }
        });
        this.setState({loading: false});
    }

    render() {
        return (
        <div>
            
            {this.state.logged === false ? <Redirect to="/" /> : ""}
            <Provider store={store}>
                <MainBox view={this.props.editor} direction="row">
                    <Sidebar logout={this.logout} notesArr={this.props.notes} login={this.state.login} />
                    <Editor></Editor>
                </MainBox>
            </Provider>
        </div>
        );
    }
}

export default  connect(
    state => ({ notes: state.notes, editor: state.editor }),
    dispatch => {
        return {
            setInitialNotes: (notes) =>  {
                dispatch({ type: "SET_NOTES", active: notes.length != 0 ? 0 : null, notes: notes});
            },
            resetState: () => {
                dispatch({ type: "RESET_STATE" });
            }
        }
    }
)(Profile);