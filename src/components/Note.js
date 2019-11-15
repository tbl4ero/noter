import React from 'react';
import { NoteBox, NoteHeader, XButton, Animated } from './sc/mainSc';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';


function formatText(incoming) {
    incoming = incoming.replace(/<\/?[^>]+(>|$)/g, " ");
    let res = incoming.length > 20 
            ? `${incoming.slice(0,20)}...` 
            : incoming;
    return res;
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

    render() {
        return (
            <div style={{minHeight: "100px"}}>
                <Animated open={this.state.animate} height="100px" onTouchStart={(e) => {
                        this.setState({swipe: true, swipeX: e.touches[0].clientX});
                    }}
                    onTouchMove={this.handleSwipe} 
                    onTouchEnd={() => this.setState({swipe: false, swipeX: null})}

                >
                    <NoteBox
                        onClick={() => {
                            this.props.switchActive(this.props.id, this.props.noteId, this.props.activeText);
                        }}
                        active={this.props.active}
                        bg="rgba(197,200,200,0.1)"
                        direction="column"
                        mobileSwipe={this.state.fullSwipe}
                    >
                        <XButton>
                            <FontAwesomeIcon icon={faTimes} onClick={(e) => {
                                e.stopPropagation();
                                this.setState({animate: false});
                                setTimeout(() => this.props.deleteNote(this.props.id, this.props.noteId), 300);
                            }} />
                        </XButton>
                        <NoteHeader style={{opacity: ".8"}} size={20}>{this.props.title}</NoteHeader>
                        <NoteHeader style={{opacity: ".6"}} size={10}>{formatText(this.props.notes[this.props.id].text)}</NoteHeader>
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
            await fetch(`http://127.0.0.1:5000/api/note/${localStorage.getItem('loginToken')}/${noteId}`, 
                {
                    headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                    method: 'POST',
                    body: `text=${text}`,
                    mode: 'cors'
                }
            )
            dispatch({active: id, type: "SELECT_NOTE"});
            dispatch({type: "SWITCH_VIEW", editor: true});
        },
        deleteNote: async(id, noteId) => {
            dispatch({ type: "DELETE_NOTE", id });
            fetch(
                `http://127.0.0.1:5000/api/note/${localStorage.getItem('loginToken')}/${noteId}`,
                {
                    method: 'DELETE',
                    mode: 'cors'
                }
            );
        }
    };
})(Note);
