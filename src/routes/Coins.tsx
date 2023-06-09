import { Link } from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import userEvent from "@testing-library/user-event";
import {useQuery} from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CoinsList= styled.ul``

const Coin = styled.li`
    margin-bottom: 10px;
    padding: 20px;
    border: 1px solid white;
    border-radius: 15px;
    background-color: ${props => props.theme.cardBgColor};
    color: ${props=>props.theme.textColor};
    a{
        display: flex;
        padding: 20px;
        transition: color 0.3s ease-in;
        align-items: center;
    }
    &:hover{
        a {
            color: ${props=>props.theme.accentColor};
        }
    }
    
`
const Title = styled.h1`
    font-size: 48px;
    color: ${props=>props.theme.accentColor};
`
const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
interface ICoinsProps {
  
}

function Coins({}:ICoinsProps) {
    // useQuery는 첫번째 argument로 고유식별자, 두번째 argument로 fetcher함수를 가진다
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    //setterFn은 value를 설정하는 function임. 
    //setterFn은 useState의 setState와 같은 방식으로 작동함. 
    const setDarkAtom = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = () => setDarkAtom(prev => !prev)
    return (
     <Container>
        <Helmet>
            <title>
              코인
            </title>
        </Helmet>
       <Header>
         <Title>코인</Title>
         <button onClick={toggleDarkAtom}>Toggle Mode</button>
       </Header>
       {isLoading ? (
          <Loader>Loading...</Loader>
       ) : (
            <CoinsList>
              {data?.slice(0,100).map(coin => 
                <Coin key={coin.id}>
                    <Link 
                      to={{
                        pathname: `/${coin.id}`,
                        state: {name:coin.name},
                      }}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
                        {coin.name} &rarr;
                    </Link>
                    
                </Coin>
              )}
            </CoinsList>
        )}
     </Container>
    )
}
export default Coins;