import styled from "styled-components";
import { StyledBox, swipe } from "./mainSc";

export const NoteHeader = styled.h1`
  font-size: ${props => props.size + "px"};
  padding: 0;
  max-height: 40px;
  margin: 0;
  @media screen and (max-width: 850px) {
    font-size: ${props => props.size * 1.5 + "px"};
  }
`;

export const NoteBox = styled(StyledBox)`
  padding: 20px;
  padding-top: 4px;
  height: 100px;
  border-top: 3px solid white;
  width: 15vw;
  cursor: pointer;
  background: ${props => (props.active ? "rgba(0,0,0,.15)" : "#F5F5F5")};
  transition: 0.2s ease-in-out;
  border-right: ${props =>
    props.active ? "4px solid black" : "4px solid rgba(0,0,0,.1)"};
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
    animation: ${props => props.mobileSwipe && swipe} 0.5s forwards;
  }
`;

export const XButton = styled.div`
  width: 20px;
  height: 20px;
  font-size: 25px;
  color: black;
  transition: 0.2s ease-in-out;
  margin-bottom: 10px;
  align-self: flex-end;
  :hover {
    color: #ec644b;
  }
  @media screen and (max-width: 850px) {
    display: none;
  }
`;