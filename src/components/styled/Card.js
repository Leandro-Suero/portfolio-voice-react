import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.color.backgroundLight};
  border-radius: ${(props) => props.theme.radius};
`;
