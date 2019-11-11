import Note from './Note';
import React from 'react';
import {StyledBox} from './sc/mainSc';
import { connect } from 'react-redux';

function NoteList(props) {
    return (
        <StyledBox style={{marginTop: "20px", overflow: 'auto'}} mobileHeight="55vh" mobileWidth="100vw" direction="column">
            {props.notes.length === 0 ? <h1 style={{textAlign: "center"}}>You don't have any notes</h1> : props.notes.map((note, id) => 
                <Note
                    id={id}
                    active={id == props.active ? true : false} 
                    {...note} 
                    key={note.noteId} 
                />
            )}
        </StyledBox>
    );
}

export default connect(
    ({notes}) => ({ notes }),
    dispatch => {
        return {}
    }
)(NoteList);