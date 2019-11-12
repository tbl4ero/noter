import styled, {keyframes} from 'styled-components';

const ErrorMessage = styled.h4`
    font-size: calc(14px + (12 - 14) * ((100vw - 350px) / (1600 - 350)));
`;

const StyledBox = styled.div`
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    flex-direction: ${props => props.direction};
    @media screen and (max-width: 850px) {
        width: ${props => props.mobileWidth};
        order: ${props => props.order};
        height: ${props => props.mobileHeight};
        border-top: ${props => props.border || ''};
        justify-content: ${props => props.centered ? "center" : ""};
        align-items: ${props => props.centered ? "center" : ""};
    }
`;


const swipe = keyframes`
    0% {
        align-self: flex-start;
    }
    100% {
        width: 0;
        opacity: 0;
        padding: 0;
        align-self: flex-start;
    }
`;

const MainBox = styled.div`
    display: grid;
    grid-template-rows: 100vh;
    height: 100vh;
    overflow: hidden;
    grid-template-columns: 15vw auto;  
    @media screen and (max-width: 850px) {
        transition: .3s ease-in-out;
        grid-template-columns: ${props => props.view ? "0 100vw" : "100vw 0"};
    }

`;


const SideBar = styled(StyledBox)`
    grid-row: 100vh;
    grid-column: 15vw;
    overflow-y: auto;
    height: 100vh;
    border-right: 1px solid black;
    @media screen and (max-width: 850px) {
        display: flex;
        border-right: none;
    }
`;

const GetBack = styled.div`
    display: flex;
    align-items: center;
    margin: 4px;
    border-radius: 10px;
    height: 20px;
    margin: auto 5px;
    padding: 10px;
    color: royalblue;
    justify-content: space-around;
    width: 100px;
    font-weight: 300;
    font-size: 24px;
    @media screen and (min-width: 850px) {
        display: none;
    }
`;

const EditorBox = styled(StyledBox)`
    display: grid;
    overflow: hidden;
    @media screen and (max-width: 850px) {
        grid-template-rows: 10vh auto;
    }
`;

const NoteHeader = styled.h1`
    font-size: ${props => props.size+'px'};
    padding: 0;
    max-height: 40px;
    margin: 0;
    @media screen and (max-width: 850px) {
        font-size: ${props => props.size*1.5+'px'};
    } 
`;

const NoteBox = styled(StyledBox)`
    padding: 20px;
    padding-top: 4px;
    height: 100px;
    border-top: 3px solid white;
    width: 15vw;  
    cursor: pointer;
    background: ${props => props.active ? "rgba(0,0,0,.15)" : "#F5F5F5" };
    transition: .2s ease-in-out;
    border-right: ${props => props.active ? "4px solid black" : "4px solid rgba(0,0,0,.1)" };
    :hover {
        background: rgba(0,0,0,.2);
    }
    @media screen and (max-width: 850px) {
        width: 100vw;
         animation: ${props => props.mobileSwipe && swipe} .5s forwards;
    }
`;

const Circle = styled.div`
    width: ${props => props.size ? props.size : "50px"};
    height: ${props => props.size ? props.size : "50px"};
    border-radius: 50%;
    background: ${props => props.bg ? props.bg : "#333"};
    max-width: 50px;
    @media screen and (max-width: 850px) {
        min-width: calc(50px + (70 - 50) * ((100vw - 350px) / (850 - 350)));
        min-height: calc(50px + (70 - 50) * ((100vw - 350px) / (850 - 350)));
    }
`;

const ProfileBox = styled(StyledBox)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    font-size: calc(12px + (18 - 12) * ((100vw - 1000px) / (1600 - 1000)));
    padding-bottom: 4vh;
    @media screen and (max-width: 850px) {
        padding-bottom: 5vh;
        font-size: calc(18px + (28 - 18) * ((100vw - 350px) / (850 - 350)));
    }
`;

const XButton = styled.div`
    width: 20px;
    height: 20px;
    font-size: 25px;
    color: black;
    transition: .2s ease-in-out;
    margin-bottom: 10px;
    align-self: flex-end;
    :hover {
        color: #ec644b;
    }
    @media screen and (max-width: 850px) {
        display: none;
    }
`;

const ToggleCircle = styled.div`
    width: 50px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    height: 50px;
    display: flex;
    border: 2px solid black;
    border-radius: 50%;
    justify-content: center;
    cursor: pointer;
    font-size: 30px;
    transition: .1s ease-in-out;
    :hover {
        color: ${props => props.active ? "#8FB9A8" : "#F1828D"};
        border: 5px solid ${props => props.active ? "#8FB9A8" : "#F1828D"};
    }
    align-items: center;
`;

const NoteForm = styled.form`
    display: flex;
    max-width: 13vw;
    align-items: center;
`;

const StyledInput = styled.input`
    padding: 4px;
    border: 1px solid black;
    text-indent: 5px;
    max-width: 10vw;
    border-radius: 10px;
    @media screen and (max-width: 850px) {
        max-width: none;
        width: 40vw;
        font-size: calc(18px + (30 - 18) * ((100vw - 350px) / (850 - 350)));
    }
`;

const AddNoteButton = styled.div`
    cursor: pointer;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 20px;
    margin: 0 auto;
    font-size: 40px;
    @media screen and (min-width: 1150px) {
        ::before {
            content: 'NEW NOTE';
            padding: 5px;
            font-size: calc(14px + (25 - 14) * ((100vw - 1000px) / (1600 - 1000)));
            display: flex;
        }
        border-radius: 10px;
        font-size: calc(20px + (20 - 20) * ((100vw - 1000px) / (1600 - 1000)));
        border: 2px solid black;
        padding: 5px;
        transition: .2s ease-in-out;
        :hover {
            color: white;
            background: black;
        }
    }
    @media screen and (max-width: 850px) {
        order: 3;
        color: white;
        display: flex;
        border-radius: 50%;
        box-shadow: 0px 4px 1px 0px rgba(0,0,0,1);
        border: 1px solid black;
        align-items: center;
        justify-content: center;
        color: black;
        align-content: center;
        font-size: 75px;
        display: ${props => props.hidden ? "none" : "block"};
    }
`;

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: 10vh auto;
`;

const anim = keyframes`
    0% {
        height: 0;
        display: none;
    }
`;


const deAnim = keyframes`
    100% {
        height: 0;
    }
`;


const Animated = styled.div`
    height: ${props => props.height};
    overflow: hidden;
    display: flex;
    color: black;
    font-size: calc(11px + (14 - 11) * ((100vw - 1000px) / (1600 - 1000)));
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: ${props => props.open ? anim : deAnim} .5s forwards;
`;

const DisabledBox = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileIcons = styled.div`
    display: flex;
    font-size: 25px;
    width: 10vw;
    padding: 10px;
    justify-content: flex-start;
    @media screen and (max-width: 850px) {
        align-self: flex-start;
        font-size: calc(18px + (34 - 18) * ((100vw - 350px) / (850 - 350)));
    }
`;

const StyledButton = styled.button`
    cursor: pointer;
    background: black;
    margin-left: -10px;
    border-bottom-right-radius: 10px;
    color: white;
    border-top-right-radius: 10px;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const FormWrapper = styled.div`
    display: flex;
    @media screen and (max-width: 850px) {
        max-width: 50vw;
    }
`;

const SignOutBox = styled.div`
    border-radius: 8px;
    padding: 5px;
    font-size: 14px;
    transition: .3s ease-in-out;
    border: 2px solid black;
    :hover {
        background: black;
        color: white;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    color: black;
    font-size: 25px;
    font-weight: 300;
    padding: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
    align-items: space-around;
`;

const Form = styled.form`
    display: flex;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    max-width: 350px;
    align-items: center;
`;

const FormInput = styled.input`
    margin: 20px;
    border-radius: 20px;
    border: 1px solid black;
    font-weight: 300;
    padding: 10px;
    font-size: 20px;
`;

const LoginHeader = styled.h1`
    margin-bottom: 0;
    font-weight: ${props => props.secondary ? 400 : 300};
    font-size: ${props => props.secondary ? "24px" : "34px"};
    color: ${props => !props.secondary ? "black" : "rgba(0,0,0,.7)"};
    color: ${props => props.error && "red"};
`; 

const LoginButton = styled.input`
    padding: 10px 25px;
    border-radius: 25px;
    border: 3px solid white;
    color: white;
    cursor: pointer;
    font-weight: 300;
    background: black;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    font-size: 20px;
    transition: .25s ease-in-out;
    :hover {
        color: black;
        background: white;
        border: 3px solid black;
  
    }
`;

const rotation = keyframes`
    100% {
        transform: rotate(180deg);
    }
`;

const Loading = styled.div`
    background: 
    linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%) padding-box,
    linear-gradient(90deg, rgba(255,255,255,1) 18%, rgba(0,0,0,1) 100%) border-box;
    color: #313149;
    padding: 40px;
    border: 5px solid transparent;
    border-radius: 50%;
    display:inline-block;
    margin: 75px 0;
    animation: .2s ${rotation} infinite;
`;



export { Loading, LoginButton, LoginHeader, FormInput, Form, ContentBox, Header, MainContainer, SignOutBox, GetBack, FormWrapper, ErrorMessage, StyledButton, StyledInput,ProfileIcons, DisabledBox,AddNoteButton, StyledBox, NoteHeader, NoteBox, MainBox, Circle, ProfileBox, SideBar, EditorBox, XButton, ToggleCircle, NoteForm, Animated };
