import React from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "./customtoolbar.css";
import { desktopEditorCfg, mobileEditorCfg } from "./editorcfg";
import { TitleInput, GetBack, EditorBox, DisabledBox } from "../../sc/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { apiURL } from '../../../const';

class Editor extends React.Component {
    render() {
        return (
            <EditorBox className="quill">
                <div style={{ display: this.props.mobile ? "block" : "none" }}>
                    <GetBack
                        onClick={() => {
                            this.props.switchView();
                            this.inputRef.value = "";
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        NOTES
                    </GetBack>
                    {this.props.mobile && (
                        <TitleInput
                            value={this.props.title}
                            ref={ref => (this.inputRef = ref)}
                            onChange={e =>
                                this.props.changeValue(
                                    e.target.value,
                                    this.props.value,
                                    this.props.activeNote
                                )
                            }
                            placeholder="Title..."
                        ></TitleInput>
                    )}
                </div>
                {this.props.active === null ? (
                    <DisabledBox>
                        <h2>Select a note or add a new one</h2>
                    </DisabledBox>
                ) : (
                    <ReactQuill
                        formats={
                            this.props.mobile
                                ? mobileEditorCfg.formats
                                : desktopEditorCfg.formats
                        }
                        modules={
                            this.props.mobile
                                ? mobileEditorCfg.modules
                                : desktopEditorCfg.modules
                        }
                        placeholder="Start typing..."
                        theme={this.props.mobile ? "bubble" : "snow"}
                        style={{
                            fontSize: "16px",
                            maxWidth: "100vw",
                            overflow: "hidden",
                            display: "grid",
                            overflowY: "auto",
                            gridTemplateRows: !this.props.mobile && "40px auto"
                        }}
                        bounds={".quill"}
                        value={this.props.value}
                        onChange={e =>
                            this.props.changeValue(
                                this.props.title,
                                e,
                                this.props.activeNote
                            )
                        }
                    />
                )}
            </EditorBox>
        );
    }
}

export default connect(
    state => {
        return {
            mobile: state.mobileDisplay,
            value: state.active.text || "",
            active: state.active.id,
            editor: state.editor,
            title: state.active.title || "",
            activeNote: state.active.noteId
        };
    },
    dispatch => {
        return {
            changeValue: (title, text, active) => {
                fetch(
                    `${apiURL}/api/note/${localStorage.getItem(
                        "loginToken"
                    )}/${active}`,
                    {
                        headers: new Headers({
                            "Content-type": "application/x-www-form-urlencoded"
                        }),
                        method: "POST",
                        body: `title=${title}&text=${text}`,
                        mode: "cors"
                    }
                );
                dispatch({ type: "_UPDATE", title, text });
            },
            switchView: () => {
                dispatch({ type: "SWITCH_VIEW", editor: false });
            }
        };
    }
)(Editor);
