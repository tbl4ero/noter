import React from "react";
import {
    MobileHeader,
    SignOutBox,
    ProfileBox,
    SideBar,
    ProfileIcons
} from "../sc/sidebar";
import NoteList from "../NoteList";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import AddNote from "./AddNote";

function Sidebar(props) {
    return (
        <SideBar view={props.editor} direction="column">
            <MobileHeader>
                <ProfileIcons>
                    {props.mobile ? (
                        <FontAwesomeIcon
                            onClick={props.logout}
                            icon={faSignOutAlt}
                        />
                    ) : (
                        <SignOutBox onClick={props.logout}>
                            <p style={{ padding: "3px", margin: 0 }}>
                                Sign Out
                            </p>
                        </SignOutBox>
                    )}
                </ProfileIcons>
                <ProfileBox direction="column">
                    <FontAwesomeIcon
                        style={{
                            fontSize:
                                "calc(70px + (90 - 70) * ((100vw - 350px) / (1600 - 350)))",
                            borderRadius: "50%",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            border: "1px solid white",
                            display: props.mobile && "none"
                        }}
                        icon={faUserCircle}
                    />
                    <h3>{props.login}</h3>
                </ProfileBox>
                <AddNote></AddNote>
            </MobileHeader>
            <NoteList active={props.active} notes={[...props.notesArr]} />
        </SideBar>
    );
}

export default connect(state => ({
    mobile: state.mobileDisplay,
    active: state.active.id,
    editor: state.editor
}))(Sidebar);
