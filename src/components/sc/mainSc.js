import styled, { keyframes } from "styled-components";

export const anim = keyframes`
    0% {
        height: 0;
        display: none;
    }
`;

export const deAnim = keyframes`
    100% {
        display: none;
        height: 0;
    }
`;

export const StyledBox = styled.div`
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    box-sizing: border-box;
    flex-direction: ${props => props.direction};
    @media screen and (max-width: 850px) {
        width: ${props => props.mobileWidth};
        order: ${props => props.order};
        height: ${props => props.mobileHeight};
        border-top: ${props => props.border || ""};
        justify-content: ${props => (props.centered ? "center" : "")};
        align-items: ${props => (props.centered ? "center" : "")};
    }
`;

export const swipe = keyframes`
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

const viewAnim = keyframes`
  0% {
    grid-template-columns: 100vw 0;
  }
  15% {
    grid-template-columns: 85vw auto;
  }
  25% {
    grid-template-columns: 75vw auto;
  }
  35% {
    grid-template-columns: 65vw auto;
  }
  45% {
    grid-template-columns: 55vw auto;
  }
  50% {
    grid-template-columns: auto auto;
  }
  55% {
    grid-template-columns: auto 55vw;
  }
  65% {
    grid-template-columns: auto 65vw;
  }
  75% {
    grid-template-columns: auto 75vw;
  }
  85% {
    grid-template-columns: auto 85vw;
  }
  100% {
    grid-template-columns: 0 100vw;
  }
`;

const viewAnimReverse = keyframes`
  0% {
    grid-template-columns: 0 100vw;
  }
  15% {
    grid-template-columns: auto 85vw;
  }
  25% {
    grid-template-columns: auto 75vw;
  }
  35% {
    grid-template-columns: auto 65vw;
  }
  45% {
    grid-template-columns: auto 55vw;
  }
  50% {
    grid-template-columns: auto auto;
  }
  55% {
    grid-template-columns: 55vw auto;
  }
  65% {
    grid-template-columns: 65vw auto;
  }
  75% {
    grid-template-columns: 75vw auto;
  }
  85% {
    grid-template-columns: 85vw auto;
  }
  100% {
    grid-template-columns: 100vw 0;
  }
`;

export const MainBox = styled.div`
    display: grid;
    grid-template-rows: 100vh;
    height: 100vh;
    overflow: hidden;
    grid-template-columns: 15vw auto;
    @media screen and (max-width: 850px) {
        grid-template-columns: none;
        transition: 0.3s ease-in-out;
        animation: ${props => (props.view ? viewAnim : viewAnimReverse)} 0.15s
            forwards;
        @supports (-webkit-overflow-scrolling: touch) {
            grid-template-columns: ${props =>
                props.view ? "0 100vw" : "100vw 0"};
        }
    }
`;

export const MainContainer = styled.div`
    display: grid;
    grid-template-rows: 10vh auto;
`;

export const Animated = styled.div`
    height: ${props => props.height};
    overflow: hidden;
    display: flex;
    color: black;
    font-size: calc(11px + (14 - 11) * ((100vw - 1000px) / (1600 - 1000)));
    flex-direction: column;
    justify-content: center;
    background: rgba(255, 255, 255, 0.3);
    align-items: center;
    animation: ${props => (props.open ? anim : deAnim)} 0.3s forwards;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
    color: black;
    font-size: 25px;
    font-weight: 300;
    padding: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-decoration: none;
`;

export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-align: center;
    align-items: space-around;
`;

export const rotation = keyframes`
    100% {
        transform: rotate(180deg);
    }
`;

export const Loading = styled.div`
    background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 1) 100%
            )
            padding-box,
        linear-gradient(
                90deg,
                rgba(255, 255, 255, 1) 18%,
                rgba(0, 0, 0, 1) 100%
            )
            border-box;
    color: #313149;
    padding: 40px;
    border: 5px solid transparent;
    border-radius: 50%;
    display: inline-block;
    margin: 75px auto;
    animation: 0.2s ${rotation} infinite;
`;
