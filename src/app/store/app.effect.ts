import { CartEffects } from './effects/cart/cart.effects';
import { GeneralEffects } from './effects/general/general.effects';
import { OrderEffects } from './effects/order/order.effects';
import { UserEffects } from './effects/user/user.effects';

export const AppEffects: any = [
  UserEffects,
  CartEffects,
  OrderEffects,
  GeneralEffects,
];
