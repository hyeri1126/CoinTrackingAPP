import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";
import { isDarkAtom } from "../atoms";
import {useRecoilValue} from "recoil";

interface IChartProps {
    coinId:string;
   
}
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}


function Chart({coinId}:IChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading,data} = useQuery<IHistorical[]>(["price", coinId], ()=>fetchCoinHistory(coinId))
    return(
        <div>
            {isLoading ? "Loading chart ... " : (
                <ApexChart 
                    type="line"
                    series={[
                        {
                            name : "price",
                            data: data?.slice(0,10).map((price) => price.close) as number[]
                        },
                    ]}
                    options={{
                        theme:{
                            mode: isDark? "dark" : "light" ,
                        },
                        chart : {
                            height:500, 
                            width:500,
                            // background : "transparent",
                        },
                        grid:{
                            show:false,
                        },
                        stroke:{
                            curve:"smooth",
                            width: 4,
                        }, 
                        yaxis:{
                            show: false,
                        },
                        xaxis:{
                            axisTicks:{
                                show: false,
                            },
                            // categories: data?.slice(0,10).map((price) => 
                            //     new Date(price.time_close * 1000).toISOString()
                            // )
                            
                           
                        },
                        fill : {
                            type:"gradient", 
                            gradient:{
                                gradientToColors:["#0be881"],
                                stops:[0,100],
                            },
                        },
                        colors:["yellow"],
                        tooltip: {
                            y:{
                                formatter : (value) => `$ ${value.toFixed(3)}`
                            }
                        }

                    }}  
                />
            )
             }
        </div>
    )
}
export default Chart;