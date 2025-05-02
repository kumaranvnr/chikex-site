import { ICartItems } from "../menu/menu.component";

const cartdata: ICartItems[] = [];
const cart_details: { _id: string, sub: string, total_price: number } = { _id: "", sub: "", total_price: 0 };

export { cartdata, cart_details }