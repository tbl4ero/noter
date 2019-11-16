import React from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "./customtoolbar.css";
import { TitleInput, GetBack, EditorBox, DisabledBox } from "../sc/mainSc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["Ubuntu", "Roboto", "Arvo"];
ReactQuill.Quill.register(Font, true);

function Editor(props) {
  return (
    <EditorBox view={props.editor} className="quill">
      <div style={{display: window.screen.width < 850 ? "block" : "none"}}>
        <GetBack onClick={props.switchView}>
          <FontAwesomeIcon icon={faChevronLeft} />
            NOTES
        </GetBack>
        {window.screen.width < 850 && <TitleInput onChange={(e) =>{console.log(e.target.value); props.changeValue(e.target.value, null, props.activeNote)}} placeholder="Title..."></TitleInput>}
      </div>
      {props.active === null ? (
        <DisabledBox>
          <h2>Select a note or add a new one</h2>
        </DisabledBox>
      ) : (
        <ReactQuill
          formats={[
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "color",
            "background",
            "align",
            "font",
            "size",
            "code-block",
            "image",
            "video"
          ]}
          modules={{
            toolbar: [
              [{ font: Font.whitelist }],
              [{ size: ["small", "normal", "large", "huge"] }],
              [{ align: [false, "right", "center"] }],
              ["bold", "italic", "underline", "strike"],
              ["code-block", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              [
                { color: ["black", "white", "red", "blue", "yellow", "green"] },
                {
                  background: [
                    "black",
                    "white",
                    "red",
                    "blue",
                    "yellow",
                    "green"
                  ]
                }
              ],
              ["image", "video"],
              ["clean"]
            ]
          }}
          placeholder="Start typing..."
          style={{ "font-size": "16px" }}
          theme={window.screen.width > 850 ? "snow" : "bubble"}
          style={{ maxWidth: "85vw", overflow: "auto" }}
          bounds={".quill"}
          value={props.value}
          onChange={e => props.changeValue(null, e, props.activeNote)}
        />
      )}
    </EditorBox>
  );
}

export default connect(
  state => {
    return {
      value: state.active.text || "",
      initValue: state.active.id === null ? "" : state.active.text,
      active: state.active.id,
      editor: state.editor,
      activeNote: state.active
    };
  },
  dispatch => {
    return {
      changeValue: (title, val, active) => {
        fetch(
          `https://note-r.herokuapp.com/api/note/${localStorage.getItem(
            "loginToken"
          )}/${active.noteId}`,
          {
            headers: new Headers({
              "Content-type": "application/x-www-form-urlencoded"
            }),
            method: "POST",
            body: `title=${title}&text=${val}`,
            mode: "cors"
          }
        );
        dispatch({ title, activeText: val, type: "EDITOR_UPDATE" });
      },
      switchView: () => {
        dispatch({ type: "SWITCH_VIEW", editor: false });
      }
    };
  }
)(Editor);
