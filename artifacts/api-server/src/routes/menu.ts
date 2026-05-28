import { Router } from "express";

const router = Router();

const menuItems = [
  {
    id: 1,
    name: "Classic Espresso",
    description: "A rich, bold shot of our signature espresso blend with velvety crema.",
    price: "$3.50",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80",
  },
  {
    id: 2,
    name: "Flat White",
    description: "Silky microfoam over a double ristretto — smooth and intense.",
    price: "$4.75",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80",
  },
  {
    id: 3,
    name: "Pour-Over Single Origin",
    description: "Slow-brewed to highlight the unique terroir of our seasonal beans.",
    price: "$5.50",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
  },
  {
    id: 4,
    name: "Spiced Chai Latte",
    description: "House-made masala spice blend with steamed oat milk. Warming and aromatic.",
    price: "$5.00",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80",
  },
  {
    id: 5,
    name: "Iced Cold Brew",
    description: "18-hour cold-steeped coffee, silky smooth with chocolate undertones.",
    price: "$5.25",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    id: 6,
    name: "Vanilla Iced Latte",
    description: "Espresso over ice with house-made vanilla syrup and whole milk.",
    price: "$5.50",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&q=80",
  },
  {
    id: 7,
    name: "Matcha Horchata",
    description: "Ceremonial grade matcha blended with cinnamon-spiced rice milk.",
    price: "$6.00",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=400&q=80",
  },
  {
    id: 8,
    name: "Sparkling Cascara",
    description: "Coffee cherry tea with sparkling water — bright, fruity, and effervescent.",
    price: "$5.75",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
  },
  {
    id: 9,
    name: "Avocado Toast",
    description: "Sourdough with smashed avocado, heirloom tomatoes, and everything seasoning.",
    price: "$11.00",
    category: "Food",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80",
  },
  {
    id: 10,
    name: "Shakshuka",
    description: "Eggs poached in spiced tomato sauce, served with grilled sourdough.",
    price: "$13.50",
    category: "Food",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
  },
  {
    id: 11,
    name: "Smoked Salmon Bagel",
    description: "House-cured salmon, cream cheese, capers, and pickled red onion.",
    price: "$14.00",
    category: "Food",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80",
  },
  {
    id: 12,
    name: "Croissant Sandwich",
    description: "Butter croissant with ham, gruyère, Dijon, and arugula.",
    price: "$12.50",
    category: "Food",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
  },
  {
    id: 13,
    name: "Almond Croissant",
    description: "Twice-baked with almond cream, golden and flaky. A Parisian classic.",
    price: "$5.00",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
  },
  {
    id: 14,
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers with mascarpone cream and cocoa dusting.",
    price: "$7.50",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
  },
  {
    id: 15,
    name: "Cardamom Olive Oil Cake",
    description: "Moist, fragrant cake with orange zest and a honey-labneh glaze.",
    price: "$6.50",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80",
  },
  {
    id: 16,
    name: "Chocolate Lava Brownie",
    description: "Warm dark chocolate brownie with salted caramel and vanilla bean gelato.",
    price: "$8.00",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  },
];

router.get("/menu", (_req, res) => {
  res.json(menuItems);
});

export default router;
