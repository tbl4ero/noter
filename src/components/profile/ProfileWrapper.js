import React from 'react';
import store from '../../redux/index';
import { Provider } from 'react-redux';
import Profile from './Profile';

class ProfileWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Profile></Profile>
            </Provider>
        );
    }
}

export default ProfileWrapper;