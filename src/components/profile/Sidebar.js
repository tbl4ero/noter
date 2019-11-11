import React from 'react';
import { SignOutBox,Circle, MainBox, ProfileBox, SideBar, ProfileIcons } from '../sc/mainSc';
import NoteList from '../NoteList';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AddNote from './AddNote';

function Sidebar(props) {
    return (
        <div>
            <SideBar display={props.editor} direction="column">
                <ProfileBox direction="column">
                    <ProfileIcons>
                        <SignOutBox>
                            <FontAwesomeIcon style={{cursor: "pointer"}} icon={faSignOutAlt} onClick={props.logout} />
                        </SignOutBox>
                    </ProfileIcons>
                    <Circle size="3vw"></Circle>
                    <h3 style={{margin: 0}}>{props.login}</h3>
                </ProfileBox>
                <AddNote></AddNote>
                <NoteList
                    active={props.active}
                    notes={[...props.notesArr]} 
                />
            </SideBar>
        </div>
    );
}

export default connect(state => ({active: state.active.id, editor: state.editor}))(Sidebar);
