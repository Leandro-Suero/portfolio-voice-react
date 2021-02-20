import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  0%{
    opacity: 0
  }
  100%{
    opacity: 1
  }
`;

export default styled.nav`
  position: fixed;
  top: 5rem;
  right: 0.5rem;
  animation: 0.4s ${FadeIn} ease-in;
`;
