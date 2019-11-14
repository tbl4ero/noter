import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {GetBack, EditorBox, DisabledBox} from '../sc/mainSc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Editor(props) {
    return (
        <EditorBox view={props.editor} className="quill">
            <GetBack onClick={props.switchView}>
                <FontAwesomeIcon icon={faChevronLeft} />
                NOTES
            </GetBack>
            {
            props.active === null
            ? 
            <DisabledBox>
                <h2>Select a note or add a new one</h2>
            </DisabledBox>
            :
            <ReactQuill
                modules = {{
                    toolbar: [
                    [{ 'header': [1, 2, 3, 4, false] }],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                    ]}}
                    formats={[
                        'header',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image', 'video'
                ]}
                style={{"font-size": "16px"}}
                theme="snow"
                style={{width: 'inherit'}}
                bounds={".quill"}
                value={props.value}
                onChange={(e) => props.changeValue(e, props.activeNote)} 
            />           
            }
        </EditorBox>
    );
}

export default connect(
    state => {
        return {
            value: state.active.text || '',
            initValue: state.active.id === null ? '' : state.active.text, 
            active: state.active.id,
            editor: state.editor,
            activeNote: state.active
        }
    }, 
    dispatch => {
        return {
            changeValue: (val, active) => {
                fetch(`http://127.0.0.1:5000/api/note/${localStorage.getItem('loginToken')}/${active.noteId}`, 
                    {
                        headers: new Headers({'Content-type': 'application/x-www-form-urlencoded'}),
                        method: 'POST',
                        body: `text=${val}`,
                        mode: 'cors'
                    }
                )
                dispatch({ activeText: val, type: "EDITOR_UPDATE" });
            },
            switchView: () => {
                dispatch({type: "SWITCH_VIEW", editor: false});
            }
        }
    })
    (Editor);