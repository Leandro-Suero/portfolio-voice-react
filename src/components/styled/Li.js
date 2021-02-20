import styled from "styled-components";

export default styled.li`
  font-size: 1.25rem;
  vertical-align: middle;
  display: inline-block;
  color: ${(props) => props.theme.color.background};
  & > a {
    color: ${(props) => props.theme.color.background};
    text-decoration: none;
  }
  & > a svg,
  & > svg {
    position: relative;
    top: 0.2rem;
  }
`;
