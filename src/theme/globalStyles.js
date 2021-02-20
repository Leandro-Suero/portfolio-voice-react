import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
  font-family: ${(props) => props.theme.font};
  background-color: ${(props) => props.theme.color.backgroundLight};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
`;

export default GlobalStyle;
