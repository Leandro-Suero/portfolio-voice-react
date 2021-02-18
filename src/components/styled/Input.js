import styled from "styled-components";

export default styled.input`
  width: 100%;
  display: inline-block;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.radius};
  border: none;
  margin: 0.5rem 0 1rem 0;
`;
