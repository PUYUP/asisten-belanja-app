import { CartState } from "./reducers/cart/cart.reducer";
import { GeneralState } from "./reducers/general/general.reducer";
import { OrderState } from "./reducers/order/order.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
	user: UserState,
	cart: CartState,
	order: OrderState,
	general: GeneralState,
}