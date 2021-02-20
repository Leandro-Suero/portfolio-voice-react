import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 0.5rem;
  flex-basis: auto;
  & > div {
    font-size: 2rem;
    background-color: ${(props) => props.theme.color.accent};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -0.2rem;
  }
`;
