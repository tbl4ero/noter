import Note from "./Note";
import React from "react";
import { StyledBox}  from "./sc/mainSc" 
import { SearchInputBox, SearchInput } from "./sc/noteList";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    filter: ""
  };

  render() {
    return (
      <StyledBox
        style={{ marginTop: "20px", overflow: "auto" }}
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
        {this.props.notes.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>You don't have any notes</h1>
        ) : (
          this.props.notes
            .map((note, id) => {
              return (
                <Note
                  id={id}
                  active={id == this.props.active ? true : false}
                  {...note}
                  key={note.noteId}
                />
              );
            })            
            .filter(el => {
                console.log(el);
                if (
                  new RegExp(this.state.filter).test(el.props.text) ||
                  new RegExp(this.state.filter).test(el.props.title)
                ) {
                  return el;
                }
              })
        )}
      </StyledBox>
    );
  }
}
export default connect(
  ({ notes }) => ({ notes }),
  dispatch => {
    return {};
  }
)(NoteList);
