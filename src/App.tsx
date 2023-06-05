import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import {ReactQueryDevtools} from "react-query/devtools"
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useState } from "react";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from "./atoms";



// 전체 scope에 style 적용하기
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Source+Sans+Pro:wght@300;400;700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
    line-height: 1.2;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  // 기본으로 lightTheme으로 시작
  // const [isDark, setIsDark] = useState(false);
  // isDark의 반대를 return 하는 함수
  // const toggleDark = () => setIsDark((current)=>!current)
  return (
    <>
     <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        
        <GlobalStyle />
        <Router  />
        <ReactQueryDevtools initialIsOpen={true} />
     </ThemeProvider>
    </>  
    )
  }
   
export default App;
