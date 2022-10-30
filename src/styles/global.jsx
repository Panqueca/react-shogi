import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height:100%;
    overflow-y: hidden;
    color: #fff;
  }

  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(124.43deg, #3562FF -1000.2%, #1B1B1B 55.78%) right top no-repeat;
    font-family: "HomepageBaukastenBook";
  }

  a {
    text-decoration: none;
    color: #4ba1f4;
    font-size: 12px;
  }

  option {
    background-color: #000;
    color: #fff;
  }
`
export default GlobalStyle
