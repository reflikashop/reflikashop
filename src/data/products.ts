export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

export const categories = [
  'All',
  'Single Origin',
  'Blend',
  'Decaf',
  'Espresso',
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Single Origin',
    price: 18.50,
    weight: '250g',
    roast: 'Light',
    description: 'A bright, complex coffee from the birthplace of coffee. Grown at elevations above 1,800 meters in the Yirgacheffe region, this lot showcases the terroir of one of the world\'s most celebrated coffee-growing areas.',
    notes: ['Blueberry', 'Jasmine', 'Citrus Zest', 'Honey'],
    image: '🫘',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Single Origin',
    price: 16.00,
    weight: '250g',
    roast: 'Medium',
    description: 'Sourced from small farms in the Huila region, this Supremo grade coffee delivers a perfectly balanced cup with a silky body and sweet finish. A testament to Colombian coffee tradition.',
    notes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Walnut'],
    image: '☕',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Midnight Velvet Blend',
    origin: 'Brazil & Guatemala',
    category: 'Blend',
    price: 15.50,
    weight: '250g',
    roast: 'Dark',
    description: 'Our signature dark blend combines the chocolate richness of Brazilian beans with the smoky depth of Guatemalan highlands. Perfect for those who love a bold, full-bodied cup.',
    notes: ['Dark Chocolate', 'Smoky Oak', 'Brown Sugar', 'Dried Plum'],
    image: '🌙',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Morning Ritual Espresso',
    origin: 'Multi-Origin',
    category: 'Espresso',
    price: 17.00,
    weight: '250g',
    roast: 'Medium-Dark',
    description: 'Crafted specifically for espresso extraction, this blend produces a thick, syrupy shot with layers of complexity. Beautiful crema and a lingering sweetness make every morning special.',
    notes: ['Toasted Almond', 'Cocoa', 'Orange Peel', 'Vanilla'],
    image: '⚡',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'Single Origin',
    price: 19.00,
    weight: '250g',
    roast: 'Medium-Dark',
    description: 'Wet-hulled in the traditional Giling Basah method, this Sumatran coffee offers an earthy, full-bodied experience unlike any other. A coffee lover\'s journey to the volcanic soils of Aceh.',
    notes: ['Cedar', 'Dark Cocoa', 'Tobacco', 'Black Pepper'],
    image: '🌋',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Twilight Decaf',
    origin: 'Mexico',
    category: 'Decaf',
    price: 16.50,
    weight: '250g',
    roast: 'Medium',
    description: 'Swiss Water Process decaffeination preserves the full flavor of this Mexican highland coffee. Enjoy a rich, satisfying cup any time of day without the caffeine.',
    notes: ['Hazelnut', 'Toffee', 'Cinnamon', 'Dried Fig'],
    image: '🌅',
    rating: 4.4,
  },
];
