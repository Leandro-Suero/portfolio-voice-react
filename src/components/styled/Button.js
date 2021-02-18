import styled, { css } from "styled-components";

export default styled.button`
  padding: 0.5rem 1.5rem;
  background-color: ${(props) => props.theme.color.accent};
  border: none;
  border-radius: ${(props) => props.theme.radius};
  font-size: 1.25rem;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.25);
  ${({ mt }) =>
    mt &&
    css`
      margin-top: ${mt};
    `}
`;
