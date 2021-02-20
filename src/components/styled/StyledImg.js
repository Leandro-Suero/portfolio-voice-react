import styled from "styled-components";

export default styled.img`
  width: 2.5rem;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  margin: 0;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.accent};
  color: ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
`;
