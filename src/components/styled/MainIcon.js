import styled, { css, keyframes } from "styled-components";

const Pulse = keyframes`
  0% {
    transform: scale(.9);
  }
  70% {
    transform: scale(1);
    filter: drop-shadow(2px 2px 3px rgba(0, 128, 0, 0.5));
  }
  100% {
    transform: scale(.9);
    filter: drop-shadow(1px 1px 1px rgba(0, 128, 0, 0.7));
  }
`;

export default styled.div`
  font-size: 9rem;
  color: ${(props) => props.theme.color.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      filter: drop-shadow(4px 4px 3px rgba(0, 128, 0, 0.7));
      color: green;
      animation: ${Pulse} 1.5s infinite ease-in-out;
    `}
`;
