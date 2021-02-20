import styled from "styled-components";

export default styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.color.backgroundLight};
  z-index: 100;
`;
