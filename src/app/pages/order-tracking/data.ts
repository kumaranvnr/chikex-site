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
    { id: "order_placed", text: "Order placed", icon_text: "ci-bag", flag: "", },
    { id: "processing_order", text: "Processing order", icon_text: "ci-settings", flag: "", },
    { id: "order_dispatched", text: "Order Dispatched", icon_text: "ci-star", flag: "", },
    { id: "order_delivered", text: "Order Delivered", icon_text: "ci-package", flag: "", },

]

export { CartData, orderStatus };
