import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusCircle,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import {
  FormWrapper,
  ErrorMessage,
  StyledInput,
  AddNoteButton,
  StyledButton
} from "../sc/addNote.js";
import { Animated, StyledBox } from "../sc/mainSc";
import { apiURL } from '../../const';

class AddNote extends React.Component {
  state = {
    hidden: true,
    noteTitle: "",
    noTitle: false,
    mobileHidden: false,
    mobile: this.props.mobile
  };

  handleNoteAdd = () => {
    if (this.state.noteTitle == "") {
      this.setState({ noTitle: true });
      return;
    }
    setTimeout(() => this.setState({ mobileHidden: false }), 500);
    this.setState({
      hidden: !this.state.hidden,
      noteTitle: "",
      noTitle: false
    });
    this.props.addNewNote(this.state.noteTitle);
  };

  render() {
    return (
      <StyledBox
        centered
        direction="column"
      >
        <Animated height="100px" open={!this.state.mobileHidden}>
          {this.state.mobile ? (
            <AddNoteButton>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={async () => {
                  await this.props.addNewNote("");
                }}
              />
            </AddNoteButton>
          ) : (
            <AddNoteButton
              onClick={() => {
                this.setState({
                  hidden: !this.state.hidden,
                  noTitle: this.state.noTitle ? false : null,
                  mobileHidden: true
                });
              }}
              hidden={this.state.mobileHidden}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </AddNoteButton>
          )}
        </Animated>

        <Animated height="100px" open={!this.state.hidden}>
          <FormWrapper>
            <StyledInput
              placeholder="Note title"
              value={this.state.noteTitle}
              onChange={e => this.setState({ noteTitle: e.target.value })}
            />
            <StyledButton onClick={this.handleNoteAdd}>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </StyledButton>
          </FormWrapper>
          {this.state.noTitle && (
            <Animated height="35px" open={this.state.noTitle}>
              <ErrorMessage>
                * you must specify a title
              </ErrorMessage>
            </Animated>
          )}
        </Animated>
      </StyledBox>
    );
  }
}

export default connect(
  state => ({ mobile: state.mobileDisplay }), 
  dispatch => {
  return {
    addNewNote: async (title = '') => {
      let noteId;
      await fetch(
        `${apiURL}/api/note/${localStorage.getItem(
          "loginToken"
        )}`,
        {
          headers: new Headers({
            "Content-type": "application/x-www-form-urlencoded"
          }),
          method: "PUT",
          body: `title=${title}&text=`,
          mode: "cors"
        }
      )
        .then(resp => resp.json())
        .then(data => (noteId = data.noteId));
      dispatch({
        type: "ADD_NOTE",
        note: { title, text: "", noteId }
      });
      dispatch({
        type: "SELECT_NOTE",
        active: { id: 0, title, text: "", noteId }
      });
      dispatch({ type: "SWITCH_VIEW", editor: true });
    }
  };
})(AddNote);
