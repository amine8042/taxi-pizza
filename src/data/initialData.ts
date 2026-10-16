import { Product, RestaurantSettings, Order } from '../types.ts';

// Direct ESM imports so Vite bundles and resolves the assets properly in dev and production
import HERO_PIZZA from '../assets/images/hero_pizza_woodfired_1792116880280.jpg';
import SPECIAL_PIZZA from '../assets/images/pizza_special_tozeur_1792116880384.jpg';
import CHEESE_PIZZA from '../assets/images/pizza_four_cheese_1792116882001.jpg';
import CALZONE_PIZZA from '../assets/images/pizza_calzone_rustic_1792116881938.jpg';
import AMBIANCE_IMG from '../assets/images/restaurant_ambiance_tozeur_1792116881240.jpg';
import DRINKS_IMG from '../assets/images/boisson_fraiche_1792118327719.jpg';
import DESSERT_IMG from '../assets/images/dessert_tiramisu_1792118327743.jpg';

export {
  HERO_PIZZA,
  SPECIAL_PIZZA,
  CHEESE_PIZZA,
  CALZONE_PIZZA,
  AMBIANCE_IMG,
  DRINKS_IMG,
  DESSERT_IMG
};

export const DEFAULT_SIZES = [
  { name: 'm', label: 'Moyenne (30 cm)', labelAr: 'متوسطة (30 سم)', priceDelta: 0 },
  { name: 'l', label: 'Large (36 cm)', labelAr: 'كبيرة (36 سم)', priceDelta: 4.5 },
  { name: 'xl', label: 'Familiale (42 cm)', labelAr: 'عائلية (42 سم)', priceDelta: 9.0 }
];

export const PIZZA_EXTRAS = [
  { id: 'extra_cheese', name: 'Supplément Fromage Mozzarella', nameAr: 'جبن موزاريلا إضافي', price: 2.5 },
  { id: 'extra_olives', name: 'Olives Noires Marinées', nameAr: 'زيتون أسود متبل', price: 1.0 },
  { id: 'extra_harissa', name: 'Harissa Traditionnelle Piquante', nameAr: 'هريسة دياري حارة', price: 1.0 },
  { id: 'extra_mushrooms', name: 'Champignons Frais', nameAr: 'فطر طازج', price: 2.0 },
  { id: 'extra_tuna', name: 'Thon Tunisien de Qualité', nameAr: 'تونة تونسية رفيعة', price: 3.0 }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Classiques
  {
    id: 'pizza-margherita',
    nameFr: 'Pizza Margherita Di Bufala',
    nameAr: 'بيتزا مارغريتا دي بوفالا',
    descriptionFr: 'Sauce tomate San Marzano maison, mozzarella fondante, basilic frais du jardin et filet d’huile d’olive extra vierge.',
    descriptionAr: 'صلصة طماطم منزلية، موزاريلا ذائبة، حبق طازج وزيت زيتون بكر ممتاز.',
    category: 'classique',
    price: 13.5,
    image: HERO_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-reine',
    nameFr: 'Pizza Reine (Regina)',
    nameAr: 'بيتزا ريجينا الكلاسيكية',
    descriptionFr: 'Sauce tomate cuisinée, mozzarella, jambon de dinde fumé, champignons de Paris frais et origan sauvage.',
    descriptionAr: 'صلصة طماطم، موزاريلا، كاشير ديك رومي مدخن، فطر طازج وزعتر بري.',
    category: 'classique',
    price: 16.0,
    image: HERO_PIZZA,
    available: true,
    isFeatured: false,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-thon-fromage',
    nameFr: 'Pizza Thon & Mozzarella',
    nameAr: 'بيتزا التونة والموزاريلا',
    descriptionFr: 'Généreux thon de Méditerranée, mozzarella filante, câpres de Tozeur, olives noires et oignons confits.',
    descriptionAr: 'تونة متوسطية وفيرة، جبنة موزاريلا، كبار توزر، زيتون أسود وبصل محمر.',
    category: 'classique',
    price: 15.5,
    image: SPECIAL_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // Spéciales
  {
    id: 'pizza-taxi-royale',
    nameFr: 'Pizza Taxi Royale Spéciale',
    nameAr: 'بيتزا تاكسي الملكية الخاصة',
    descriptionFr: 'La signature de la maison : Viande hachée épicée, merguez artisanale de Tozeur, poivrons doux, mozzarella et œuf coulant.',
    descriptionAr: 'توقيع المحل : لحم مفروم متبل، مرقاز تقليدي من توزر، فلفل حلو، موزاريلا وبيض.',
    category: 'speciale',
    price: 19.5,
    image: SPECIAL_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-fruits-de-mer',
    nameFr: 'Pizza Royale Fruits de Mer',
    nameAr: 'بيتزا فواكه البحر الملكية',
    descriptionFr: 'Crevettes royales, calamars tendres, moules parfumées à l’ail doux, persil plat et mozzarella gratinée.',
    descriptionAr: 'جمبري ملكي، كاليمار طري، بلح البحر بنكهة الثوم اللطيف، بقدونس وموزاريلا.',
    category: 'speciale',
    price: 22.0,
    image: SPECIAL_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // 4 Fromages
  {
    id: 'pizza-quattro-formaggi',
    nameFr: 'Quattro Formaggi Gourmande',
    nameAr: 'بيتزا أربعة أجبان الفاخرة',
    descriptionFr: 'Quatre fromages d’exception : Mozzarella fiore di latte, gorgonzola crémeux, emmental affiné et copeaux de parmesan.',
    descriptionAr: 'أربعة أجبان فاخرة : موزاريلا فيوري دي لاتي، غورغونزولا كريمي، إمنتال وجبن بارميزان.',
    category: 'quatre_fromages',
    price: 18.0,
    image: CHEESE_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-formaggi-miel',
    nameFr: 'Quatre Fromages Miel & Noix',
    nameAr: 'بيتزا 4 أجبان بالعسل والجوز',
    descriptionFr: 'Accord sucré-salé irrésistible : Mozzarella, chèvre chaud, gorgonzola, filet de miel pur du Sud et éclats de noix.',
    descriptionAr: 'مزيج حلو ومالح لا يقاوم : موزاريلا، جبن ماعز، غورغونزولا، عسل طبيعي وجوز مقرمش.',
    category: 'quatre_fromages',
    price: 19.0,
    image: CHEESE_PIZZA,
    available: true,
    isFeatured: false,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // Mexicaines
  {
    id: 'pizza-mexicaine-texmex',
    nameFr: 'Pizza Mexicaine Tex-Mex',
    nameAr: 'بيتزا تكس مكس المكسيكية',
    descriptionFr: 'Bœuf haché assaisonné au piment doux, haricots rouges, maïs croquant, piments jalapeños et double fromage.',
    descriptionAr: 'لحم بقري مفروم ببهارات مكسيكية، فاصوليا حمراء، ذرة، فلفل هلابينو وجبن مضاعف.',
    category: 'mexicaine',
    price: 18.5,
    image: SPECIAL_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-fajita-poulet',
    nameFr: 'Pizza Fajita Poulet Épicé',
    nameAr: 'بيتزا فاهيتا الدجاج الحار',
    descriptionFr: 'Émincé de poulet mariné aux épices fajita, poivrons tricolores sautés, oignons rouges et sauce salsa piquante.',
    descriptionAr: 'شرائح دجاج متبلة بخلطة الفاهيتا، فلفل ألوان مشوح، بصل أحمر وصلصة صلصا حارة.',
    category: 'mexicaine',
    price: 17.5,
    image: SPECIAL_PIZZA,
    available: true,
    isFeatured: false,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // Végétariennes
  {
    id: 'pizza-vegetarienne-ortolana',
    nameFr: 'Pizza Ortolana Légumes du Sud',
    nameAr: 'بيتزا أورتولانا خضار الجنوب',
    descriptionFr: 'Courgettes grillées, aubergines au four, poivrons rouges doux, tomates cerises confites et mozzarella.',
    descriptionAr: 'كوسا مشوية، باذنجان بالفرن، فلفل أحمر حلو، طماطم كرزية مجففة وموزاريلا.',
    category: 'vegetarienne',
    price: 15.0,
    image: HERO_PIZZA,
    available: true,
    isFeatured: false,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-vegetarienne-champignons',
    nameFr: 'Végétarienne Champignons & Roquette',
    nameAr: 'نباتية بالفطر والجرجير',
    descriptionFr: 'Champignons sautés à l’huile d’ail, mozzarella crémeuse, roquette fraîche ajoutée à la sortie du four et parmesan.',
    descriptionAr: 'فطر مشوح بزيت الثوم، موزاريلا، جرجير طازج مضاف بعد الخبز وجبن بارميزان.',
    category: 'vegetarienne',
    price: 16.5,
    image: HERO_PIZZA,
    available: true,
    isFeatured: false,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // Calzones
  {
    id: 'calzone-rustico',
    nameFr: 'Calzone Rustico Traditionnel',
    nameAr: 'كالزوني روستيكو التقليدي',
    descriptionFr: 'Chausson doré au four à bois, farci de mozzarella fondante, jambon de dinde, ricotta onctueuse et origan.',
    descriptionAr: 'فطيرة كالزوني ذهبية في الفرن، محشوة بموزاريلا، كاشير ديك رومي، ريكوتا ناعمة وزعتر.',
    category: 'calzone',
    price: 16.0,
    image: CALZONE_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'calzone-tunisien',
    nameFr: 'Calzone Tunisienne Piquante',
    nameAr: 'كالزوني تونسي حار',
    descriptionFr: 'Farce généreuse au thon, harissa artisanale de Tozeur, œuf entier, mozzarella et câpres croquantes.',
    descriptionAr: 'حشوة غنية بالتونة، هريسة توزرية دياري، بيضة كاملة، جبن موزاريلا وكبار.',
    category: 'calzone',
    price: 16.5,
    image: CALZONE_PIZZA,
    available: true,
    isFeatured: true,
    sizes: DEFAULT_SIZES,
    availableExtras: PIZZA_EXTRAS
  },

  // Boissons (using our freshly generated high-res local asset DRINKS_IMG)
  {
    id: 'boisson-coca',
    nameFr: 'Coca-Cola Frais (Canette 33cl)',
    nameAr: 'كوكاكولا باردة (33 سل)',
    descriptionFr: 'Boisson rafraîchissante servie bien fraîche.',
    descriptionAr: 'مشروب غازي منعش يقدم بارداً جداً.',
    category: 'boisson',
    price: 3.0,
    image: DRINKS_IMG,
    available: true
  },
  {
    id: 'boisson-boga',
    nameFr: 'Boga Cidre Tunisienne (33cl)',
    nameAr: 'بوغة سيدر تونسية أصيلة (33 سل)',
    descriptionFr: 'Le grand classique tunisien à la caroube, incontournable avec la pizza.',
    descriptionAr: 'المشروب الغازي التونسي الكلاسيكي بنكهة الخروب المنعشة.',
    category: 'boisson',
    price: 3.0,
    image: DRINKS_IMG,
    available: true
  },
  {
    id: 'boisson-eau-safia',
    nameFr: 'Eau Minérale Safia (1L)',
    nameAr: 'مياه معدنية صافية (1 لتر)',
    descriptionFr: 'Eau minérale naturelle pure de source tunisienne.',
    descriptionAr: 'مياه معدنية طبيعية نقية من الينابيع التونسية.',
    category: 'boisson',
    price: 2.0,
    image: DRINKS_IMG,
    available: true
  },

  // Desserts (using our freshly generated high-res local asset DESSERT_IMG)
  {
    id: 'dessert-tiramisu',
    nameFr: 'Tiramisu Artisanal au Café & Cacao',
    nameAr: 'تيراميسو تقليدي بالقهوة والكاكاو',
    descriptionFr: 'Préparé chaque matin : Biscuits imbibés au café espresso serré, mascarpone léger et cacao amère.',
    descriptionAr: 'محضر طازجاً كل صباح : بسكويت مشرب بالقهوة الإسبريسو، ماسكاربوني غني ورشة كاكاو مر.',
    category: 'dessert',
    price: 7.5,
    image: DESSERT_IMG,
    available: true,
    isFeatured: true
  },
  {
    id: 'dessert-pizza-nutella',
    nameFr: 'Pizza Douce Nutella & Amandes Grillées',
    nameAr: 'بيتزا حلوة بالنوتيلا واللوز المحمص',
    descriptionFr: 'Pâte à pizza fine cuite minute, recouverte de chocolat Nutella fondu et d’amandes grillées effilées.',
    descriptionAr: 'عجينة بيتزا هشة مخبوزة على الفور، مغطاة بشوكولاتة نوتيلا دافئة ورقائق لوز محمص.',
    category: 'dessert',
    price: 11.0,
    image: DESSERT_IMG,
    available: true
  }
];

export const INITIAL_SETTINGS: RestaurantSettings = {
  name: 'Taxi Pizza',
  nameAr: 'بيتزا تاكسي',
  phone: '+216 24 210 021',
  whatsappNumber: '21624210021',
  address: 'W4C9+4W3, Avenue Al Maghreb Al Arabi, Tozeur, Tunisie',
  addressAr: 'W4C9+4W3، شارع المغرب العربي، توزر، تونس',
  rating: 4.5,
  reviewsCount: 245,
  deliveryFee: 3.0, // 3 TND
  openingHours: 'Tous les jours : 12h00 – 00h30 (Non-stop)',
  openingHoursAr: 'يومياً : من 12:00 ظهراً إلى 00:30 بعد منتصف الليل',
  homepagePromoFr: 'Bienvenue chez Taxi Pizza à Tozeur ! Pizzas croustillantes cuites à haute température, ingrédients frais sélectionnés et livraison rapide directement chez vous.',
  homepagePromoAr: 'مرحباً بكم في بيتزا تاكسي في توزر! بيتزا مقرمشة ومخبوزة بحرفية، بمكونات طازجة مختارة وتوصيل سريع إلى باب منزلك.',
  adminUsername: 'admin',
  adminPassword: 'taxipizza2026'
};

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'demo-ord-1',
    orderNumber: 'TP-2026-081',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Yassine Mansour',
    customerPhone: '+216 98 123 456',
    deliveryMethod: 'delivery',
    address: 'Cité El Bassatine, près de la Mosquée, Tozeur',
    notes: 'Bien dorée svp, sauce harissa à part',
    items: [
      {
        productId: 'pizza-taxi-royale',
        name: 'Pizza Taxi Royale Spéciale',
        sizeLabel: 'Large (36 cm)',
        extras: ['Supplément Fromage Mozzarella'],
        quantity: 1,
        unitPrice: 26.5,
        totalPrice: 26.5
      },
      {
        productId: 'boisson-coca',
        name: 'Coca-Cola Frais (Canette 33cl)',
        extras: [],
        quantity: 2,
        unitPrice: 3.0,
        totalPrice: 6.0
      }
    ],
    subtotal: 32.5,
    deliveryFee: 3.0,
    total: 35.5,
    status: 'livree',
    source: 'whatsapp'
  },
  {
    id: 'demo-ord-2',
    orderNumber: 'TP-2026-082',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    customerName: 'Sonia Trabelsi',
    customerPhone: '+216 22 789 012',
    deliveryMethod: 'takeaway',
    notes: 'Prêt pour 20h30',
    items: [
      {
        productId: 'pizza-quattro-formaggi',
        name: 'Quattro Formaggi Gourmande',
        sizeLabel: 'Moyenne (30 cm)',
        extras: [],
        quantity: 1,
        unitPrice: 18.0,
        totalPrice: 18.0
      },
      {
        productId: 'calzone-tunisien',
        name: 'Calzone Tunisienne Piquante',
        sizeLabel: 'Moyenne (30 cm)',
        extras: ['Harissa Traditionnelle Piquante'],
        quantity: 1,
        unitPrice: 17.5,
        totalPrice: 17.5
      }
    ],
    subtotal: 35.5,
    deliveryFee: 0,
    total: 35.5,
    status: 'preparation',
    source: 'whatsapp'
  }
];
