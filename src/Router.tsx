import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

// Router가 prop으로 function을 받는다면 function이 어떻게 생겼는지 함수의 type을 명시해야함.
// 즉 toggleDark는 argument를 받지 않고, return값이 없는 것을 명시해야함. 
interface IRouterProps {
    // toggleDark: () => void;
    // isDark: boolean;
}

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin  />
                </Route>
                <Route path="/">
                    <Coins  />
                </Route>
                
            </Switch>
                
        </BrowserRouter>
    )
}
export default Router;