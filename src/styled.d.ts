import 'styled-components';

// styled component의 Theme(테마) 정보를 확장시키기
declare module 'styled-components' {
    export interface DefaultTheme {
        // theme이 어떻게 보일지, theme의 속성들을 설명하는 부분
        // 우리가 사용할 theme(테마)
        textColor:string;
        bgColor:string;
        accentColor:string;
        cardBgColor:string;
    }
}