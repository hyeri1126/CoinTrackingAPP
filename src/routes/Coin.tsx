import { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {Helmet} from "react-helmet";

// INTERFACE
interface RouteParams {
    coinId:string;
}
interface RouteState{
    name:string,
 }
interface InfoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD : {
            ath_date : string;
            ath_price : number; 
            market_cap : number; 
            market_cap_change_24h : number; 
            percent_change_1h : number; 
            percent_change_1y : number; 
            percent_change_6h : number; 
            percent_change_7d : number; 
            percent_change_12h : number; 
            percent_change_15m : number; 
            percent_change_30d : number; 
            percent_change_30m : number; 
            percent_from_price_ath : number; 
            price : number; 
            volume_24h: number;          
            volume_24h_change_24h:number;  
        }
    };
}
interface ICoinProps {
    // isDark:boolean;
}
// STYLED COMPONENT
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
const Title = styled.h1`
    font-size: 48px;
    color: ${props=>props.theme.accentColor};
`
const Loader = styled.span`
    text-align: center;
    display: block;
`
const OverView = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 15px;
`
const OverViewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child{
       font-size: 10px;
       font-weight: 400;
       text-transform: uppercase;
       margin-bottom: 5px;
    }
`
const Derscription = styled.p`
    margin: 20px 0px;
`
const Tabs = styled.div`
    display: grid;
    grid-template-columns:repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`
const Tab = styled.span<{ isActive:boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 0;
    border-radius: 10px;
   
    a {
        display: block; //전체 영역 선택 가능
        color : ${props => 
        props.isActive ? props.theme.accentColor : props.theme.textColor
    }
    }
`
function Coin({}:ICoinProps) {
    // const [loading,setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    // const location = useLocation(); location에는 pathname, coin의 name을 가진 state 등이 담겨있음
    //state는 component로부터 오는게 아니라 Location으로부터 옴. 
    const {state}=useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    
    //fetcher 함수에게 coinId를 argument로 넘겨줘야함.  
    //두 query가 같은 query key를 가짐 & query key는 배열임
    const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(
        ["info", coinId], 
        () => fetchCoinInfo(coinId)
    );
    const {isLoading:tickersLoading, data:tickersData } = useQuery<PriceData>(
        ["tickers", coinId], 
        () => fetchCoinTickers(coinId),
        {
            refetchInterval:5000,
        }
    );
    // useEffect(()=>{
    //     (async() => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json()
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json()
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // },[coinId]) 
    //coinId가 변할때마다 useEffect 다시 실행. 여기서 coinId는 URL에 위치하기 때문에 변하지 않음. 
    const loading = infoLoading || tickersLoading;
    return(
        <Container >
            <Helmet>
                <title>
                     {state?.name ? state.name : loading ? "Loading..." : infoData?.name }
                </title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name }</Title>
            </Header>
            {loading? <Loader>Loading...</Loader>:(
                <>
                    <OverView>
                        <OverViewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span> Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>Price:</span>
                            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverViewItem>
                    </OverView> 
                    <Derscription>{infoData?.description}</Derscription>
                    <OverView>
                        <OverViewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverViewItem>
                    </OverView> 

                    <Tabs>
                       
                        <Tab isActive={chartMatch !== null}> 
                            <Link to={`/${coinId}/chart`}>Chart</Link> 
                        </Tab>
                        <Tab isActive={priceMatch !== null}> 
                            <Link to={`/${coinId}/price`}>Price</Link> 
                        </Tab>
                      
                    </Tabs>
                  

                    <Switch>
                        <Route path={`/${coinId}/price`}>
                            <Price />
                        </Route>
                        <Route path={`/${coinId}/chart`}>
                            <Chart 
                              
                                coinId={coinId} 
                            />
                        </Route>
                    </Switch>     
                </>
            )}
        </Container>
    );
}
export default Coin;