import React from 'react';
import { NoteBox, NoteHeader, XButton } from "./sc/note";
import { Animated } from './sc/mainSc';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function formatText(incoming, len) {
    if (incoming != null) {
        incoming = incoming.replace(/<\/?[^>]+(>|$)/g, " ");
        let res = incoming.length > len
                ? `${incoming.slice(0,len)}...` 
                : incoming;
        return res;
    }
    return '';
}

class Note extends React.Component {
    
    state = {
        animate: true,
        swipe: false,
        swipeX: null,
        fullSwipe: false
    }

    constructor(props) {
        super(props);
        this.state.textPreview = formatText(this.props.text);
    }

    handleSwipe = (e) => {
        if (e.changedTouches[0].clientX < this.state.swipeX-100) {
            this.setState({swipe: false, swipeX: null, fullSwipe: true });
            setTimeout(() => this.props.deleteNote(this.props.id, this.props.noteId), 500);
        }
    }

    deleteNote = (e) => {
        e.stopPropagation();
        this.setState({animate: false});
        setTimeout(() => this.props.deleteNote(this.props.id, this.props.noteId), 300);
    }

    render() {
        return (
            <div style={{minHeight: "100px"}}>
                <Animated open={this.state.animate} height="100px" 
                    onTouchStart={e => this.setState({swipe: true, swipeX: e.touches[0].clientX})}
                    onTouchMove={this.handleSwipe} 
                    onTouchEnd={() => this.setState({swipe: false, swipeX: null})}
                >
                    <NoteBox
                        onClick={() => this.props.switchActive(this.props.id, this.props.noteId, this.props.activeText)}
                        active={this.props.active}
                        bg="rgba(197,200,200,0.1)"
                        direction="column"
                        mobileSwipe={this.state.fullSwipe}
                    >
                        <XButton>
                            <FontAwesomeIcon icon={faTimes} onClick={this.deleteNote} />
                        </XButton>
                        <NoteHeader style={{opacity: ".8"}} size={20}>{formatText(this.props.notes[this.props.id].title, 10)}</NoteHeader>
                        <NoteHeader style={{opacity: ".6"}} size={10}>{formatText(this.props.notes[this.props.id].text, 20)}</NoteHeader>
                    </NoteBox>
                </Animated>
            </div>
        );
    }
}

export default connect(
    state => ({
        noteId: state.active.noteId,
        notes: state.notes,
        activeText: state.active.text
    }),
    dispatch => {
    return {
        switchActive: async(id, noteId, text) => {
            await fetch(`https://note-r.herokuapp.com/api/note/${localStorage.getItem('loginToken')}/${noteId}`, 
                {
                    headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                    method: 'POST',
                    body: `text=${text}`,
                    mode: 'cors'
                }
            ).then(() => dispatch({active: id, type: "SELECT_NOTE"})).then(() => dispatch({type: "SWITCH_VIEW", editor: true}));
        },
        deleteNote: async(id, noteId) => {
            dispatch({ type: "DELETE_NOTE", id });
            fetch(
                `https://note-r.herokuapp.com/api/note/${localStorage.getItem('loginToken')}/${noteId}`,
                {
                    method: 'DELETE',
                    mode: 'cors'
                }
            );
        }
    };
})(Note);
