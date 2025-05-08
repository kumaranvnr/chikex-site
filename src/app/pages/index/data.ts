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


export { categoryData, resturants, Reviews, location_list, menu_category }