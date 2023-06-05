const BASE_URL = `https://api.coinpaprika.com/v1`

// coin 정보를 fetch 하는 함수
export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response)=>
        response.json()
    );
    
}
 
// coinInfo를 fetch 하는 함수
//fetchCoinInfo의 argument로 coinId라는 이름의 string을 넘겨주겠음. 
export function fetchCoinInfo(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=>
    response.json()
    );
}

// coinTickers를 fetch 하는 함수
export function fetchCoinTickers(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=>
    response.json()
    );
}
export function fetchCoinHistory(coinId:string) {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response)=>
    response.json()
    );
}
