const categoryData = [
    {
        img: 'assets/img/food-delivery/category/05.jpg',
        title: 'Fried Chicken',
        url: '/menu/fried'
    },
    {
        img: 'assets/img/food-delivery/category/02.jpg',
        title: 'Kids Corner',
        url: '/menu/kds'
    },
    {
        img: 'assets/img/food-delivery/category/03.jpg',
        title: 'Moxitos',
        url: '/menu/mox'
    },
    {
        img: 'assets/img/food-delivery/category/04.jpg',
        title: 'Sides',
        url: '/menu/side'
    },
    {
        img: 'assets/img/food-delivery/category/01.jpg',
        title: 'Burger & Combo',
        url: '/menu/burger'
    },
    {
        img: 'assets/img/food-delivery/category/06.jpg',
        title: 'Wraps',
        url: '/menu/wrap'
    },

];

const resturants = [
    {
        img: 'assets/img/food-delivery/restaurants/logos/01.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/02.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/03.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/04.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/05.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/06.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/07.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/08.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/09.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/10.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/11.png'
    },
    {
        img: 'assets/img/food-delivery/restaurants/logos/12.png'
    },
]

const Reviews = [
    {
        rate: '5',
        discription: 'Very nice burgers and broasted chicken. To be frank it is tastier than the branded broasted available in the city. Good luck.',
        profile: 'assets/img/testimonial/Vaisakh Nair.png',
        name: 'Vaisakh Nair',
        date: 'April 14, 2023'
    },
    {
        rate: '3',
        discription: 'Very delicious, especially the broasted chicken and the Burger. The price is very reasonable for the quality of food they provide.',
        profile: 'assets/img/testimonial/Deepak C K.png',
        name: 'Deepak C K',
        date: 'April 18, 2023'
    },
    {
        rate: '4',
        discription: 'very good quality of food and best value of money food is delicious and fresh. Recommended dishes: French Fries, Onion Rings',
        profile: 'assets/img/testimonial/Mohamed Belal.png',
        name: 'Mohamed Belal',
        date: 'April 02, 2023'
    },
    {
        rate: '3',
        discription: 'Good.Food: 5/5 | Service: 5/5 | Atmosphere: 5/5. Recommended dishes: Chicken Burger,Fried Chicken',
        profile: 'assets/img/testimonial/buttji uae.png',
        name: 'buttji uae',
        date: 'April 19, 2023'
    },
    {
        rate: '4',
        discription: 'Their Chicken is so tender, Juicy and very flavourful. The prices are really reasonable! The atmosphere is so cool and relaxing!',
        profile: 'assets/img/testimonial/Yusra Muneeb.png',
        name: 'Yusra Muneeb',
        date: 'April 13, 2023'
    },
    {
        rate: '5',
        discription: 'This restaurant serves one of the most tender and delicious nuggets, I just loved this place and it is quite economical as well.',
        profile: 'assets/img/testimonial/Khaowithrao.png',
        name: 'Khaowithrao',
        date: 'April 04, 2023'
    },
]

const menu_category = [
    {
        menu_header_id: "deal",
        menu_icon: "po-best-deals-menu",
        menu_header_name: "Deals"
    },
    {
        menu_header_id: "kds",
        menu_icon: "po po-fries",
        menu_header_name: "kids Corner"
    },
    {
        menu_header_id: "mox",
        menu_icon: "po po-drinks",
        menu_header_name: "Moxitos"
    },
    {
        menu_header_id: "fried",
        menu_icon: "po po-on-time",
        menu_header_name: "Fried Chicken"
    },
    {
        menu_header_id: "side",
        menu_icon: "po po-salads",
        menu_header_name: "Sides"
    },
    {
        menu_header_id: "burger",
        menu_icon: "po po-burger",
        menu_header_name: "Burger & Combo"
    },
    {
        menu_header_id: "wrap",
        menu_icon: "po po-wraps",
        menu_header_name: "Wraps"
    }
]

const menu_item_list = [
    {
        product_code: "1",
        menu_code: "kds",
        filter_name: "KidsCorner",
        img_name: "Kids Pops Meal",
        img_link: "https://chikex.me/wp-content/uploads/2022/11/kids-pops-meal.jpg",
        title: "Kids Pops Meal",
        description: "Fried Chicken, Fries(R), Cola",
        display_price: "AED 12",
        price: 12.00
    },
    {
        product_code: "2", menu_code: "kds", filter_name: "KidsCorner",
        img_name: "Kids Meal Nuggets", img_link: "https://chikex.me/wp-content/uploads/2022/11/kids-meal-nuggets.jpg",
        title: "Kids Meal Nuggets", description: "Nuggets, Fries(R), Cola", display_price: "AED 12", price: 12.00
    },
    {
        product_code: "3", menu_code: "mox", filter_name: "Moxitos",
        img_name: "Blue Berry Mox", img_link: "https://chikex.me/wp-content/uploads/2022/11/bluberry-moz.jpg",
        title: "Blue Berry Mox", description: "Blue Berry Mox", display_price: "AED 10", price: 10.00
    },
    {
        product_code: "4", menu_code: "mox", filter_name: "Moxitos",
        img_name: "Rasberry Mox", img_link: "https://chikex.me/wp-content/uploads/2022/11/rassberry-mox.jpg",
        title: "Rasberry Mox", description: "Rasberry Mox", display_price: "AED 10", price: 10.00
    },
    {
        product_code: "5", menu_code: "mox", filter_name: "Moxitos",
        img_name: "Strawberry Mox", img_link: "https://chikex.me/wp-content/uploads/2022/11/strawberry-mox.jpg",
        title: "Strawberry Mox", description: "Strawberry Mox", display_price: "AED 10", price: 10.00
    },
    {
        product_code: "6", menu_code: "mox", filter_name: "Moxitos",
        img_name: "Passion Fruit Mox", img_link: "https://chikex.me/wp-content/uploads/2022/11/passion-fruit.jpg",
        title: "Passion Fruit Mox", description: "Passion Fruit Mox", display_price: "AED 10", price: 10.00
    },
    {
        product_code: "7", menu_code: "mox", filter_name: "Moxitos",
        img_name: "Mint Lemon Mox", img_link: "https://chikex.me/wp-content/uploads/2022/11/mint-lemonmox.jpg",
        title: "Mint Lemon Mox", description: "Mint Lemon Mox", display_price: "AED 10", price: 10.00
    },
    {
        product_code: "8", menu_code: "deal", filter_name: "Deals",
        img_name: "Family Bucket Small", img_link: "https://chikex.me/wp-content/uploads/2022/09/FAMILY-BUCKET-1.jpg",
        title: "Family Bucket Small",
        description: "9 Pcs Chicken, 2 Fries (R), 3 Coleslaw (R), 3 Bun, 3 Garlic, 1L Drink", display_price: "AED 55", price: 55.00
    },
    {
        product_code: "9", menu_code: "deal", filter_name: "Deals",
        img_name: "Family Bucket Medium", img_link: "https://chikex.me/wp-content/uploads/2022/09/FAMILY-BUCKET-1.jpg",
        title: "Family Bucket Medium",
        description: "12 Pcs Chicken, 3 Fries (R), 4 Coleslaw (R), 4 Bun, 4 Garlic, 1L Drink", display_price: "AED 75", price: 75.00
    },
    {
        product_code: "10", menu_code: "deal", filter_name: "Deals",
        img_name: "Family Bucket Big", img_link: "https://chikex.me/wp-content/uploads/2022/09/FAMILY-BUCKET-1.jpg",
        title: "Family Bucket Big",
        description: "15 Pcs Chicken, 4 Fries (R), 5 Coleslaw (R), 5 Bun, 5 Garlic, 1L Drink", display_price: "AED 95", price: 95.00
    },
    {
        product_code: "11", menu_code: "deal", filter_name: "Deals",
        img_name: "Famil Bucket Strips", img_link: "https://chikex.me/wp-content/uploads/2022/09/FAMILY-BUCKET-strips.jpg",
        title: "Famil Bucket Strips",
        description: "15 Pcs Strips, 3 Fries (R), 3 Coleslaw (R), 3 Bun, 3 Garlic, 1L Drink", display_price: "AED 55", price: 55.00
    },
    {
        product_code: "12", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Tender Strip Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/5-pcs-tender-strips-meal.jpg",
        title: "Tender Strip Meal",
        description: "5 Pcs Tender Strips, Fries (R), Coleslaw, coke & Bun", display_price: "AED 20", price: 20.00
    },
    {
        product_code: "13", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Economic Combo Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/economic-combo-meal.jpg",
        title: "Economic Combo Meal",
        description: "4 Pcs Chicken, Fries(R), coleslaw, coke & Bun", display_price: "AED 24", price: 24.00
    },
    {
        product_code: "14", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Budget Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/budget-meal.jpg",
        title: "Budget Meal",
        description: "4 Pcs Chicken, Fries (R) & Bun", display_price: "AED 18", price: 18.00
    },
    {
        product_code: "15", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Rice Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/rice-bowl.jpg",
        title: "Rice Meal",
        description: "3 Pcs Chicken, Coke & Rice", display_price: "AED 17", price: 17.00
    },
    {
        product_code: "16", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Small Tender Strips Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/3-pcs-tender-strips-meal.jpg",
        title: "Small Tender Strips Meal",
        description: "3 Pcs Tender Strips, Fries(R) & Bun", display_price: "AED 12", price: 12.00
    },
    {
        product_code: "17", menu_code: "fried", filter_name: "FriedChicken",
        img_name: "Snack Meal", img_link: "https://chikex.me/wp-content/uploads/2022/11/Snack-Meal-1.jpg",
        title: "Snack Meal",
        description: "2Pcs Chicken, Fries (R) & Bun", display_price: "AED 12", price: 12.00
    },
    {
        product_code: "18", menu_code: "side", filter_name: "Sides",
        img_name: "Pops Large", img_link: "https://chikex.me/wp-content/uploads/2022/11/pops-large.jpg",
        title: "Pops Large", description: "Pops Large", display_price: "AED 12", price: 12.00
    },
    {
        product_code: "19", menu_code: "side", filter_name: "Sides",
        img_name: "Garlic Sauce", img_link: "https://chikex.me/wp-content/uploads/2022/11/Garlic-Sause.jpg",
        title: "Garlic Sauce", description: "Garlic Sauce", display_price: "AED 1", price: 1.00
    },
    {
        product_code: "20", menu_code: "side", filter_name: "Sides",
        img_name: "Coleslaw", img_link: "https://chikex.me/wp-content/uploads/2022/11/coleslaw.jpg",
        title: "Coleslaw", description: "Coleslaw Regular", display_price: "AED 5", price: 5.00
    },
    {
        product_code: "21", menu_code: "side", filter_name: "Sides",
        img_name: "French Fries Large", img_link: "https://chikex.me/wp-content/uploads/2022/11/French-Fries-Large.jpg",
        title: "French Fries", description: "French Fries Large", display_price: "AED 11", price: 11.00
    },
    {
        product_code: "22", menu_code: "side", filter_name: "Sides",
        img_name: "French Fries Regular", img_link: "https://chikex.me/wp-content/uploads/2022/11/Frenh-Fries-Regular.jpg",
        title: "French Fries", description: "French Fries Regular", display_price: "AED 6", price: 6.00
    },
    {
        product_code: "23", menu_code: "side", filter_name: "Sides",
        img_name: "Pops Small", img_link: "https://chikex.me/wp-content/uploads/2022/11/pops-small.jpg",
        title: "Pops Small", description: "Pops Small", display_price: "AED 7", price: 7.00
    },
    {
        product_code: "24", menu_code: "side", filter_name: "Sides",
        img_name: "Onion Rings", img_link: "https://chikex.me/wp-content/uploads/2022/11/oinon-Rings.jpg",
        title: "Onion Rings", description: "Onion Rings", display_price: "AED 7", price: 7.00
    },
    {
        product_code: "25", menu_code: "side", filter_name: "Sides",
        img_name: "Plain Rice", img_link: "https://chikex.me/wp-content/uploads/2022/11/plain-rice.jpg",
        title: "Plain Rice", description: "Plain Rice", display_price: "AED 6", price: 6.00
    },
    {
        product_code: "26", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Super X Supreme S/W", img_link: "https://chikex.me/wp-content/uploads/2022/11/super-x-supreme-sw.jpg",
        title: "Super X Supreme S/W", description: "Super x Supreme Sandwitch", display_price: "AED 16", price: 16.00
    },
    {
        product_code: "27", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Super X Supreme S/W Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/super-x-supreme-sw-combo.jpg",
        title: "Super X Supreme S/W Combo", description: "Sandwitch, Fries(R), Coke", display_price: "AED 22", price: 22.00
    },
    {
        product_code: "28", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "X Supreme S/W Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/x-supreme-sw-combo.jpg",
        title: "X Supreme S/W Combo", description: "Krispy X sandwitch, Fries(R), Coke", display_price: "AED 21", price: 21.00
    },
    {
        product_code: "29", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Krispy Burger Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/krispy-x-burger-combo.jpg",
        title: "Krispy Burger Combo", description: "Chicken Burger, Fries(R), Coke", display_price: "AED 20", price: 20.00
    },
    {
        product_code: "30", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "X Supreme S/W", img_link: "https://chikex.me/wp-content/uploads/2022/11/x-supreme-sw.jpg",
        title: "X Supreme S/W", description: "Krispy X Sandwitch", display_price: "AED 15", price: 15.00
    },
    {
        product_code: "31", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Krispy X Burger", img_link: "https://chikex.me/wp-content/uploads/2022/11/krispy-x-burger.jpg",
        title: "Krispy X Burger", description: "Krispy Chicken Burger", display_price: "AED 14", price: 14.00
    },
    {
        product_code: "32", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Chicken Burger", img_link: "https://chikex.me/wp-content/uploads/2022/11/chicken-burger.jpg",
        title: "Chicken Burger", description: "Chicken Burger", display_price: "AED 12", price: 12.00
    },
    {
        product_code: "33", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Beef Burger", img_link: "https://chikex.me/wp-content/uploads/2022/11/beef-burger.jpg",
        title: "Beef Burger", description: "Beef Burger", display_price: "AED 14", price: 14.00
    },
    {
        product_code: "34", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Beef Burger Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/beef-burger-combo.jpg",
        title: "Beef Burger Combo", description: "Beef Burger, Fries (R), Coke", display_price: "AED 20", price: 20.00
    },
    {
        product_code: "35", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Chicken Burger Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/chicken-burger-combo.jpg",
        title: "Chicken Burger Combo", description: "Chicken Burger, Fries (R), Coke", display_price: "AED 18", price: 18.00
    },
    {
        product_code: "36", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Peri Peri Burger", img_link: "https://chikex.me/wp-content/uploads/2022/11/peri-peri-burger.png",
        title: "Peri Peri Burger", description: "Peri Peri Burger", display_price: "AED 22", price: 22.00
    },
    {
        product_code: "37", menu_code: "burger", filter_name: "BurgerCombo",
        img_name: "Cheese Chicken Burger", img_link: "https://chikex.me/wp-content/uploads/2022/11/cheese-chicken-burger.png",
        title: "Cheese Chicken Burger", description: "Cheese Chicken Burger", display_price: "AED 16", price: 16.00
    },
    {
        product_code: "38", menu_code: "wrap", filter_name: "Wraps",
        img_name: "Chikex Wrap Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/chikex-wrap-combo.jpg",
        title: "Chikex Wrap Combo", description: "Chicken wrap, Fries (R) & Coke", display_price: "AED 15", price: 15.00
    },
    {
        product_code: "39", menu_code: "wrap", filter_name: "Wraps",
        img_name: "Chikex Wrap", img_link: "https://chikex.me/wp-content/uploads/2022/11/chikex-wrap.jpg",
        title: "Chikex Wrap", description: "Chikex Wrap", display_price: "AED 9", price: 9.00
    },
    {
        product_code: "40", menu_code: "wrap", filter_name: "Wraps",
        img_name: "Wrap Burger Combo", img_link: "https://chikex.me/wp-content/uploads/2022/11/wrap-burger-combo.png",
        title: "Wrap Burger Combo", description: "Wrap Burger Combo", display_price: "AED 49", price: 49.00
    }
];

const location_list = [
    {
        loc_id: 1,
        loc_name: "Al Rumaila",
        loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28831.635162984603!2d55.40192247910154!3d25.406337099999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f57461b869c27%3A0x1d70f5cd1b703279!2sChikex%20-%20Al%20Rumaila%20Branch!5e0!3m2!1sen!2sae!4v1678516807830!5m2!1sen!2sae",
        loc_contact_number: "+971 65 21 4298",
        loc_whatsapp: "97165214298",
        email: "info.chikex@gmail.com",
        loc_lat: 25.406458240279647,
        loc_long: 55.43720962078445,
        working_hours: "12:00 PM - 02:00 AM",
        address: "Shop #1, Geepas building 6, Al Rumaila 1, Ajman, UAE.",
        status: 0,
        mail_id: "",
        loc_map: "https://goo.gl/maps/VpkfjFgetj8w2Nhe9"
    },
    {
        loc_id: 2, loc_name: "Al Nuaimiya", loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28831.635162984603!2d55.40192247910154!3d25.406337099999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5937c5de6743%3A0x68824fe1ef78d49b!2zQ2hpa2V4IC0gQWptYW4gQWwgTnVhaW1peWEgQnJhbmNoIC0g2LTZitmD2YPYsyAtINmB2LHYuSDYudis2YXYp9mGINin2YTZhti52YrZhdmK2Kkt!5e0!3m2!1sen!2sae!4v1678516880122!5m2!1sen!2sae",
        loc_contact_number: "+971 65 22 3775", loc_whatsapp: "971565341361", email: "info.chikex@gmail.com",
        loc_lat: 25.387293699734556, loc_long: 55.45431849119858, working_hours: "12:00 PM - 02:00 AM",
        address: "Shop #1 , A Block Paris Tower , Al Nuaimiya, Ajman , UAE.", status: 0, mail_id: "",
        loc_map: "https://goo.gl/maps/Y3eGVA3iRrPgnGce6"
    },
    {
        loc_id: 3, loc_name: "Clock tower", loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28842.512956846662!2d55.359890079101554!3d25.36078680000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f59ea79ce6ef9%3A0x4543498f45ae4974!2zQ2hpa2V4IC0gU2hhcmphaCBDbG9jayBUb3dlciBCcmFuY2gg2LTZitmD2YPYsyAtINmB2LHYuSDYqNix2Kwg2LPYp9i52Kkg2KfZhNi02KfYsdmC2Kk!5e0!3m2!1sen!2sae!4v1678516919797!5m2!1sen!2sae",
        loc_contact_number: "+971 65 23 7537", loc_whatsapp: "971565341452", email: "info.chikex@gmail.com",
        loc_lat: 25.36124245866072, loc_long: 55.3949620214384, working_hours: "12:00 PM - 02:00 AM",
        address: "Near NMC Royal Hospital Sharjah Al Zahra St, Near Clock Tower - Sharjah.", status: 0, mail_id: "",
        loc_map: "https://goo.gl/maps/Ay5Muhz3ZZUMtWJd8"
    },
    {
        loc_id: 4, loc_name: "Habtoor", loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28842.512956846662!2d55.359890079101554!3d25.36078680000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b00c4e4e097%3A0xaa4a495aecd9c7fd!2sChikex%20-%20AI%20Qasimia%2CSharjah!5e0!3m2!1sen!2sae!4v1678516953813!5m2!1sen!2sae",
        loc_contact_number: "+971 65 79 6912", loc_whatsapp: "971501839353", email: "info.chikex@gmail.com",
        loc_lat: 25.339986126134463, loc_long: 55.390190179314814, working_hours: "12:00 PM - 02:00 AM",
        address: "Shop #6, AI Habtoor Tower, AI Qasimia, AI Nud, Sharjah.", status: 0, mail_id: "",
        loc_map: "https://goo.gl/maps/2AM9UPv3aUxMN6mo6"
    },
    {
        loc_id: 5, loc_name: "Warsan", loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.9592969792743!2d55.39461681473356!3d25.170852183908345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67b64888d0b3%3A0x9242079d6645dbe1!2sChikex%20-%20Al%20Warsan%20Branch!5e0!3m2!1sen!2sae!4v1678517000686!5m2!1sen!2sae",
        loc_contact_number: "+971 43 93 0253", loc_whatsapp: "971501839378", email: "info.chikex@gmail.com",
        loc_lat: 25.1710464011169, loc_long: 55.39684779260305, working_hours: "12:00 PM - 02:00 AM",
        address: "AI Warsan Nesto Hypermarket Building AI Warsan - Shop 6,7 International City Dubai.", status: 0, mail_id: "",
        loc_map: "https://goo.gl/maps/ird5VnVGipYG2BWZ9"
    },
    {
        loc_id: 6, loc_name: "Arjan", loc_map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.2098805020623!2d55.23418241473113!3d25.060874583959734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f65b4c3d0fd%3A0x71866b8df5fc7944!2zQ2hpa2V4IC0gQXJqYW4gQnJhbmNoIC0g2LTZitmD2YrZg9izIC0g2YHYsdi5INin2LHYrNin2YY!5e0!3m2!1sen!2sae!4v1678517032044!5m2!1sen!2sae",
        loc_contact_number: "+971 45 85 7378", loc_whatsapp: "971501839360", email: "info.chikex@gmail.com",
        loc_lat: 25.06120564103484, loc_long: 55.23637046396534, working_hours: "12:00 PM - 02:00 AM",
        address: "Arjan Geepas Tower 1 - Arjan-Dubai land - Al Barsha South - Dubai.", status: 0, mail_id: "",
        loc_map: "https://goo.gl/maps/DaSwdt9TWZW9p25j9"
    },
]


export { categoryData, resturants, Reviews, menu_item_list, location_list, menu_category }