import { ICartItems } from "../menu/menu.component";

const cartdata: ICartItems[] = [];
const cart_details: { _id: string, sub: string, sub_total: number, delivery_charges: number, discount: number, total_price: number } = { _id: "", sub: "", sub_total: 0, delivery_charges: 0, discount: 0, total_price: 0 };

export { cartdata, cart_details }