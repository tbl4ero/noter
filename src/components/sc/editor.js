import styled from "styled-components";
import { StyledBox } from "./mainSc";

export const TitleInput = styled.input`
  border: none;
  font-size: 20px;
  width: 45vw;
  min-height: 20px;
  margin: 2vw;
  padding: 5px;
  outline: none;
  font-style: italic;
  text-indent: 2px;
  border-bottom: 3px solid #f5f5f5;
`;

export const DisabledBox = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditorBox = styled(StyledBox)`
  display: grid;
  overflow: hidden;
  @media screen and (max-width: 850px) {
    grid-template-rows: 15vh auto;
  }
`;

export const GetBack = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;
  border-radius: 10px;
  height: 20px;
  min-height: 20px;
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