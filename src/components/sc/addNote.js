import styled from "styled-components";

export const ErrorMessage = styled.h4`
  font-size: calc(14px + (12 - 14) * ((100vw - 350px) / (1600 - 350)));
  line-height: 0;
  margin: 0;
  padding: 0;
  color: #ec644b;
`;

export const FormWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  background: black;
  margin-left: -10px;
  border-bottom-right-radius: 10px;
  color: white;
  border-top-right-radius: 10px;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;


export const StyledInput = styled.input`
  padding: 4px;
  border: 1px solid black;
  text-indent: 5px;
  max-width: 10vw;
  border-radius: 10px;
`;

export const AddNoteButton = styled.div`
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
      content: "NEW NOTE";
      padding: 5px;
      font-size: calc(14px + (25 - 14) * ((100vw - 1000px) / (1600 - 1000)));
      display: flex;
    }
    border-radius: 10px;
    font-size: calc(20px + (20 - 20) * ((100vw - 1000px) / (1600 - 1000)));
    border: 2px solid black;
    padding: 5px;
    transition: 0.2s ease-in-out;
    :hover {
      color: white;
      background: black;
    }
  }
  @media screen and (max-width: 850px) {
    font-size: 25px;
  }
`;