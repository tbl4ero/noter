import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormWrapper, ErrorMessage, StyledButton,StyledInput,ToggleCircle, CenteredBox, StyledBox, NoteForm, SubmitButton, AddNoteButton, Animated } from '../sc/mainSc';

class AddNote extends React.Component {

    state = {
        hidden: true,
        noteTitle: '',
        noTitle: false,
        mobileHidden: false
    }

    constructor(props) {
        super(props);
    }

    handleNoteAadd = () => {
            if (this.state.noteTitle ==  '') {
                this.setState({noTitle: true});
            } else {
                this.props.addNewNote(this.state.noteTitle);
                this.setState({hidden: !this.state.hidden, noteTitle: '', noTitle: false,});
                setTimeout(() => this.setState({ mobileHidden: false}), 500)
            }
    }

    render() {
        return (
            <StyledBox bg="rgba(0,0,0,.2)" centered mobileHeight="30vw" order={0} direction="column">
                <Animated open={!this.state.mobileHidden}>
                    <AddNoteButton hidden={this.state.mobileHidden} onClick={() => {this.setState({
                        hidden: !this.state.hidden, 
                        noTitle: this.state.noTitle ? false : null,
                        mobileHidden: true
                        })}}>
                            <FontAwesomeIcon style={{borderRadius: "50%"}} icon={faPlusCircle} />             
                    </AddNoteButton>
                </Animated>

                <Animated open={!this.state.hidden}>
                        <FormWrapper>
                            <StyledInput 
                                placeholder="Note title"
                                value={this.state.noteTitle} 
                                onChange={(e) => this.setState({noteTitle: e.target.value})} 
                            />
                            <StyledButton onClick={this.handleNoteAadd}>
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            </StyledButton>
                        </FormWrapper>
                        {
                            this.state.noTitle &&
                            <Animated style={{height: 35}} open={this.state.noTitle} >
                                <ErrorMessage style={{lineHeight: 0, margin: 0, padding: 0, color: "#ec644b"}}>* you must specify a title</ErrorMessage>
                            </Animated>
                        }
                </Animated>
            </StyledBox>
        );
    }

}

export default connect(null, dispatch => {
    return {
        addNewNote: async(title) => {
            let noteId;
            await fetch(`http://127.0.0.1:5000/api/note/${localStorage.getItem('loginToken')}`, 
                {
                    headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                    method: 'PUT',
                    body: `title=${title}&text=`,
                    mode: 'cors'
                }
            ).then(resp => resp.json()).then(data => noteId = data.noteId);
            dispatch({type: "ADD_NOTE", note: { title: title, text: "", noteId: noteId }});
        }
    }
})(AddNote);