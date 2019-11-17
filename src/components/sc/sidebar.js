import styled from "styled-components";
import { StyledBox } from "./mainSc";

export const SideBar = styled(StyledBox)`
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

export const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 850px) {
    flex-direction: row;
    max-height: 10vh;
    align-items: center;
    justify-content: space-around;
  }
`;

export const SignOutBox = styled.div`
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in-out;
  border: 2px solid black;
  :hover {
    background: black;
    color: white;
  }
`;

export const ProfileBox = styled(StyledBox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  font-size: calc(12px + (18 - 12) * ((100vw - 1000px) / (1600 - 1000)));
  padding-bottom: 20px;
  @media screen and (max-width: 850px) {
    padding-bottom: 0;
    font-size: calc(18px + (28 - 18) * ((100vw - 350px) / (850 - 350)));
  }
`;

export const ProfileIcons = styled.div`
  display: flex;
  font-size: 25px;
  padding: 10px;
  padding-bottom: 40px;
  justify-content: flex-start;
  @media screen and (max-width: 850px) {
    padding-bottom: 0;
    padding: 0;
  }
`;