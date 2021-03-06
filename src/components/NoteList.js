import Note from "./Note";
import React from "react";
import { StyledBox}  from "./sc/mainSc" 
import { SearchInputBox, SearchInput } from "./sc/noteList";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class NoteList extends React.Component {

  state = {
    filter: ""
  };

  render() {
    console.log(this.props.notes);
    return (
      <StyledBox
        style={{ marginTop: "20px", overflow: "hidden" }}
        mobileHeight="90vh"
        mobileWidth="100vw"
        direction="column"
      >
        <SearchInputBox>
            <FontAwesomeIcon icon={faSearch} />
            <SearchInput
                onChange={e => this.setState({ filter: e.target.value })}
                placeholder="Search"
            />
        </SearchInputBox>
        <StyledBox style={{overflow: "auto"}} direction="column">
          {this.props.notes.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>You don't have any notes</h1>
          ) : (
            this.props.notes
              .map((note, id) => {
                return (
                  <Note
                    note={note}
                    id={id}
                    active={id == this.props.active ? true : false}
                    key={note.noteId}
                  />
                );
              })            
              .filter(el => {
                if (
                  new RegExp(this.state.filter).test(el.props.text) ||
                  new RegExp(this.state.filter).test(el.props.title)
                ) {
                  return el;
                }
              })
          )}
        </StyledBox>
      </StyledBox>
    );
  }
}

export default connect(({ notes }) => ({notes}))(NoteList);
