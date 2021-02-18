import styled from "styled-components";
import { Link } from "react-router-dom";

export default styled(Link)`
  color: ${(props) => props.theme.color.accent};
  margin-top: 0.5rem;
  display: inline-block;
`;
