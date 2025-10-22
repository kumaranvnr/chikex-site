const CartData = [
    {
        id: 1,
        image: 'assets/img/shop/cart/01.jpg',
        name: 'Women Colorblock Sneakers',
        size: 8.5,
        color: 'White & Blue',
        price: 154.00
    },
    {
        id: 2,
        image: 'assets/img/shop/cart/02.jpg',
        name: 'TH Jeans City Backpack',
        color: 'Khaki',
        brand: 'Tommy Hilfiger',
        price: 79.50
    },
    {
        id: 3,
        image: 'assets/img/shop/cart/03.jpg',
        name: '3-Color Sun Stash Hat',
        brand: 'The North Face',
        color: 'Pink / Beige / Dark blue',
        price: 22.50
    },
    {
        id: 4,
        image: 'assets/img/shop/cart/04.jpg',
        name: 'Cotton Polo Regular Fit',
        size: 42,
        color: 'Light blue',
        price: 9.00
    },
];

const orderStatus = [
    { id: "ORDER_INITIATED", text: "Order Initiated", icon_text: "ci-bag", flag: "", time: "" },
    { id: "ORDER_PLACED", text: "Order Placed", icon_text: "ci-settings", flag: "", time: "" },
    { id: "ORDER_ACCEPTED", text: "Order Accepted", icon_text: "ci-cart", flag: "", time: "" },
    { id: "ORDER_READY", text: "Food Ready", icon_text: "ci-thumb-up", flag: "", time: "" },
    { id: "ORDER_TRANSIT", text: "Order Dispatched", icon_text: "ci-star", flag: "", time: "" },
    { id: "ORDER_DELIVERED", text: "Order Delivered", icon_text: "ci-package", flag: "", time: "" },

]

export { CartData, orderStatus };
