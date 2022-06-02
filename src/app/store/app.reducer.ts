import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { CartReducer } from "./reducers/cart/cart.reducer";
import { GeneralReducer } from "./reducers/general/general.reducer";
import { OrderReducer } from "./reducers/order/order.reducer";
import { UserReducer } from "./reducers/user/user.reducer";

export const AppReducers: ActionReducerMap<AppState> = {
	user: UserReducer,
	cart: CartReducer,
	order: OrderReducer,
	general: GeneralReducer,
}