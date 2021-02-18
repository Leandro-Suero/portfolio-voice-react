import styled, { css } from "styled-components";

export default styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.color.white};
  ${({ italic }) =>
    italic &&
    css`
      font-style: italic;
    `}
`;
