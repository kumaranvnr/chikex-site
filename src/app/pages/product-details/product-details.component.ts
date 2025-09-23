import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: Product = {
    id: 1,
    name: "Premium Organic Quinoa Bowl",
    category: "Healthy Foods",
    description: "A nutritious and delicious organic quinoa bowl packed with fresh vegetables and superfoods.",
    detailedDescription: "Our Premium Organic Quinoa Bowl is carefully crafted with the finest organic ingredients. This nutrient-dense meal combines fluffy quinoa with a colorful array of fresh vegetables, creating a perfect balance of taste and nutrition. Each bowl is prepared with love and attention to detail, ensuring you get the best quality meal every time.",
    currentPrice: 99.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    maxQuantity: 10,
    images: [
      'assets/logo.png',
      'assets/logo.png',
      'assets/logo.png',
      'assets/logo.png',
    ],
    sizes: [
      { name: 'Small', available: true },
      { name: 'Medium', available: true },
      { name: 'Large', available: false }
    ],
    colors: [
      { name: 'Original', hex: '#8B4513', available: true },
      { name: 'Spicy', hex: '#FF4500', available: true },
      { name: 'Mild', hex: '#90EE90', available: true }
    ],
    ingredients: [
      'Organic Quinoa',
      'Fresh Avocado',
      'Cherry Tomatoes',
      'Red Bell Pepper',
      'Cucumber',
      'Red Onion',
      'Fresh Herbs',
      'Lemon Dressing'
    ],
    specifications: [
      { name: 'Weight', value: '350g' },
      { name: 'Serving Size', value: '1 Bowl' },
      { name: 'Shelf Life', value: '3 Days' },
      { name: 'Storage', value: 'Refrigerate' }
    ],
    nutrition: [
      { name: 'Calories', value: '420 kcal' },
      { name: 'Protein', value: '15g' },
      { name: 'Carbohydrates', value: '65g' },
      { name: 'Fat', value: '12g' },
      { name: 'Fiber', value: '8g' },
      { name: 'Sugar', value: '6g' }
    ],
    allergens: ['May contain traces of nuts', 'Gluten-free'],
    reviews: [
      {
        id: 1,
        userName: 'Sarah Johnson',
        userAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        comment: 'Absolutely delicious! The quinoa was perfectly cooked and the vegetables were fresh and crispy. Will definitely order again.',
        date: new Date('2024-01-15'),
        images: ['/placeholder.svg?height=100&width=100']
      },
      {
        id: 2,
        userName: 'Mike Chen',
        rating: 4,
        comment: 'Great healthy option. The portion size was good and it kept me full for hours. The dressing was particularly tasty.',
        date: new Date('2024-01-10')
      },
      {
        id: 3,
        userName: 'Emma Wilson',
        userAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        comment: 'Perfect for my diet plan. Fresh ingredients and great taste. The packaging was also eco-friendly which I appreciate.',
        date: new Date('2024-01-08')
      }
    ]
  };

  relatedProducts: RelatedProduct[] = [
    {
      id: 2,
      name: 'Mediterranean Salad Bowl',
      image: '/placeholder.svg?height=200&width=200',
      price: 89.99,
      rating: 4.3,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'Protein Power Bowl',
      image: '/placeholder.svg?height=200&width=200',
      price: 119.99,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: 4,
      name: 'Vegan Buddha Bowl',
      image: '/placeholder.svg?height=200&width=200',
      price: 94.99,
      rating: 4.4,
      reviewCount: 203
    },
    {
      id: 5,
      name: 'Asian Fusion Bowl',
      image: '/placeholder.svg?height=200&width=200',
      price: 104.99,
      rating: 4.6,
      reviewCount: 78
    }
  ];

  ratingBreakdown: RatingBreakdown[] = [
    { stars: 5, count: 78, percentage: 61 },
    { stars: 4, count: 32, percentage: 25 },
    { stars: 3, count: 12, percentage: 9 },
    { stars: 2, count: 3, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  selectedImage: string = '';
  selectedSize: ProductSize | null = null;
  selectedColor: ProductColor | null = null;
  quantity: number = 1;
  isInWishlist: boolean = false;
  hasMoreReviews: boolean = true;

  carouselConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: {
      clickable: true
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedImage = this.product.images[0];
    if (this.product.sizes && this.product.sizes.length > 0) {
      this.selectedSize = this.product.sizes.find(size => size.available) || null;
    }
    if (this.product.colors && this.product.colors.length > 0) {
      this.selectedColor = this.product.colors.find(color => color.available) || null;
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  selectSize(size: ProductSize): void {
    if (size.available) {
      this.selectedSize = size;
    }
  }

  selectColor(color: ProductColor): void {
    if (color.available) {
      this.selectedColor = color;
    }
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.maxQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getDiscountPercentage(): number {
    if (this.product.originalPrice > this.product.currentPrice) {
      return Math.round(((this.product.originalPrice - this.product.currentPrice) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  addToCart(): void {
    if (!this.product.inStock) return;

    const cartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.currentPrice,
      quantity: this.quantity,
      size: this.selectedSize?.name,
      color: this.selectedColor?.name,
      image: this.selectedImage
    };

    // Add to cart logic here
    console.log('Adding to cart:', cartItem);
    // You can implement your cart service here
    // this.cartService.addToCart(cartItem);
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
    // Implement wishlist logic here
    console.log('Wishlist toggled:', this.isInWishlist);
  }

  openImageModal(image?: string): void {
    // Implement image modal/zoom functionality
    const imageToShow = image || this.selectedImage;
    console.log('Opening image modal for:', imageToShow);
    // You can use a modal library like ng-bootstrap modal here
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  loadMoreReviews(): void {
    // Implement load more reviews functionality
    console.log('Loading more reviews...');
    // You can load more reviews from your service here
    this.hasMoreReviews = false; // Set to false when no more reviews
  }
}


interface ProductSize {
  name: string;
  available: boolean;
}

interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductNutrition {
  name: string;
  value: string;
}

interface ProductReview {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  maxQuantity: number;
  images: string[];
  sizes?: ProductSize[];
  colors?: ProductColor[];
  ingredients: string[];
  specifications: ProductSpecification[];
  nutrition: ProductNutrition[];
  allergens: string[];
  reviews: ProductReview[];
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
}

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}