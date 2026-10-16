import { Language } from '../types.ts';

export const translations = {
  fr: {
    // Nav
    navHome: 'Accueil',
    navMenu: 'Notre Carte',
    navAbout: 'Notre Histoire',
    navGallery: 'Galerie',
    navContact: 'Contact & Accès',
    cartButton: 'Panier',
    orderWhatsApp: 'Commander',
    
    // Services
    serviceDineIn: 'Sur place',
    serviceTakeaway: 'À emporter',
    serviceDelivery: 'Livraison express à Tozeur',
    
    // Hero
    heroBadge: 'Pizzeria Artisanale à Tozeur',
    heroTitle: 'L’art authentique de la pizza au cœur du Sud',
    heroSubtitle: 'Pâtes maturées 48h, cuisson au four à haute température, fromages fondants et saveurs généreuses inspirées du terroir tozeurois.',
    heroViewMenu: 'Découvrir la carte',
    heroOrderNow: 'Commander rapidement',
    
    // Quick Info Strip
    infoHoursTitle: 'Ouvert 7j / 7',
    infoHoursDesc: '12h00 – 00h30 sans interruption',
    infoLocationTitle: 'Tozeur, Avenue Maghreb Arabe',
    infoLocationDesc: 'Au centre-ville de Tozeur',
    infoPhoneTitle: 'Commandes directes',
    infoPhoneDesc: '+216 24 210 021',
    infoRatingTitle: 'Note des gourmets',
    infoRatingDesc: '4.5 / 5 (245 avis vérifiés)',
    
    // Categories
    catAll: 'Toutes les pizzas & délices',
    catClassique: 'Classiques',
    catSpeciale: 'Spéciales Taxi',
    catQuatreFromages: '4 Fromages',
    catMexicaine: 'Mexicaines',
    catVegetarienne: 'Végétariennes',
    catCalzone: 'Calzones',
    catBoisson: 'Boissons',
    catDessert: 'Desserts',

    // Product Card
    fromPrice: 'À partir de',
    tnd: 'TND',
    customizeAndAdd: 'Personnaliser & Ajouter',
    addToCart: 'Ajouter au panier',
    available: 'Disponible',
    unavailable: 'Momentanément épuisé',
    featured: 'Coup de cœur',

    // Product Modal
    chooseSize: '1. Choisissez votre taille',
    chooseExtras: '2. Suppléments & extras gourmands',
    specialNotes: 'Remarques ou instructions spéciales pour le pizzaiolo',
    notesPlaceholder: 'Ex: Bien cuite, sans oignons, piment à part...',
    quantity: 'Quantité',
    totalProductPrice: 'Prix total',

    // Cart & Checkout
    cartTitle: 'Votre Panier Gourmand',
    emptyCartTitle: 'Votre panier est vide',
    emptyCartDesc: 'Explorez notre sélection de pizzas et ajoutez vos créations préférées.',
    viewMenuBtn: 'Voir le menu',
    deliveryMethod: 'Mode de dégustation',
    methodDineIn: 'Sur place (Table au restaurant)',
    methodTakeaway: 'À emporter (Prêt à récupérer)',
    methodDelivery: 'Livraison à domicile (Tozeur)',
    deliveryAddressLabel: 'Adresse exacte de livraison à Tozeur',
    deliveryAddressPlaceholder: 'Quartier, rue, repère connu (ex: près de l’école ou mosquée)...',
    customerNameLabel: 'Votre Nom complet',
    customerNamePlaceholder: 'Ex: Mohamed Ali',
    customerPhoneLabel: 'Numéro de téléphone portable',
    customerPhonePlaceholder: 'Ex: 24 210 021 ou 98 000 000',
    orderNotesLabel: 'Instructions ou heure souhaitée',
    orderNotesPlaceholder: 'Ex: Prêt à 20h45 svp...',
    subtotal: 'Sous-total',
    deliveryFee: 'Frais de livraison',
    totalOrder: 'Total de la commande',
    orderViaWhatsAppBtn: 'Confirmer & Commander sur WhatsApp',
    whatsAppNoticeTitle: 'Fonctionnement de la commande via WhatsApp :',
    whatsAppNoticeBody: 'En cliquant sur le bouton, votre récapitulatif sera formaté et envoyé directement au restaurant sur WhatsApp au +216 24 210 021. Notre équipe vous répond immédiatement pour confirmer la préparation.',
    
    // About
    aboutTitle: 'Taxi Pizza Tozeur',
    aboutSubtitle: 'La passion de la bonne pizza, au carrefour de la tradition italienne et de la générosité tunisienne.',
    aboutP1: 'Installé sur la célèbre Avenue Al Maghreb Al Arabi à Tozeur, Taxi Pizza est devenu le rendez-vous incontournable des amoureux de pizzas croustillantes, généreuses et parfumées.',
    aboutP2: 'Notre secret réside dans une pâte levée lentement pendant au moins 48 heures pour une digestibilité parfaite, une sauce mijotée aux herbes méditerranéennes, et des garnitures fraîches sélectionnées quotidiennement.',
    aboutP3: 'Que vous soyez de passage dans la splendide région du Djérid ou habitant de Tozeur, notre équipe vous accueille avec chaleur pour un repas sur place, un retrait rapide ou une livraison rapide à domicile.',

    // Gallery
    galleryTitle: 'Notre Univers en Images',
    gallerySubtitle: 'Découvrez l’atmosphère chaleureuse de Taxi Pizza, nos fournées dorées et nos préparations.',

    // Contact
    contactTitle: 'Contactez-nous & Rendez-nous visite',
    contactSubtitle: 'Nous sommes impatients de vous régaler à Tozeur.',
    contactAddress: 'Adresse',
    contactPhone: 'Téléphone & WhatsApp',
    contactHours: 'Horaires d’ouverture',
    contactDirectionsBtn: 'Ouvrir l’itinéraire Google Maps',
    callNowBtn: 'Appeler le restaurant',

    // Admin
    adminPortal: 'Espace Administration Locale',
    adminLoginTitle: 'Connexion Espace Gérant',
    adminLoginSubtitle: 'Interface de gestion locale du menu, des commandes et des paramètres.',
    adminDisclaimer: 'Note de sécurité : Cette interface utilise le stockage local de votre navigateur (localStorage). Aucun mot de passe n’est envoyé à un serveur tiers.',
    username: 'Identifiant',
    password: 'Mot de passe',
    loginBtn: 'Se connecter',
    logoutBtn: 'Déconnexion',
    invalidCredentials: 'Nom d’utilisateur ou mot de passe incorrect.',
    
    adminTabOverview: 'Tableau de bord',
    adminTabMenu: 'Gestion du Menu',
    adminTabOrders: 'Commandes Locales',
    adminTabSettings: 'Paramètres du Restaurant',
    adminTabBackup: 'Sauvegarde & Données',
    
    demoCredentialsHint: 'Identifiants de démonstration configurés : admin / taxipizza2026',
    
    // Admin stats
    statTotalOrders: 'Commandes enregistrées (ce navigateur)',
    statPendingOrders: 'En cours de préparation',
    statCompletedOrders: 'Commandes livrées',
    statSampleRevenue: 'Chiffre d’affaires local cumulé',
    statLocalNotice: 'Données locales enregistrées uniquement dans ce navigateur',
    
    // Admin menu
    addProduct: 'Ajouter un nouveau produit',
    editProduct: 'Modifier le produit',
    deleteProduct: 'Supprimer',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce produit de la carte ?',
    productNameFr: 'Nom du produit (Français)',
    productNameAr: 'Nom du produit (Arabe)',
    productCategory: 'Catégorie',
    productPrice: 'Prix de base (TND)',
    productImage: 'URL de l’image',
    productImageHelp: 'Entrez une URL d’image web ou sélectionnez une photo depuis votre appareil.',
    productDescFr: 'Description (Français)',
    productDescAr: 'Description (Arabe)',
    productAvailable: 'Produit disponible à la vente',
    productFeatured: 'Mettre en avant sur la page d’accueil',
    saveChanges: 'Enregistrer les modifications',
    cancel: 'Annuler',

    // Admin orders
    newOrderManual: 'Enregistrer une commande manuellement',
    orderId: 'N° Commande',
    customer: 'Client',
    status: 'Statut',
    items: 'Articles',
    total: 'Montant',
    actions: 'Actions',
    source: 'Origine',

    statusNouvelle: 'Nouvelle',
    statusPreparation: 'En préparation',
    statusLivraison: 'En livraison',
    statusLivree: 'Livrée',
    statusAnnulee: 'Annulée',

    // Backup
    backupTitle: 'Sauvegarde et Restauration des Données',
    backupDesc: 'Vous pouvez exporter toutes les données de votre carte, des commandes et des réglages sous forme de fichier JSON pour les sauvegarder ou les transférer vers un autre navigateur.',
    exportJsonBtn: 'Télécharger la sauvegarde JSON',
    importJsonBtn: 'Restaurer depuis un fichier JSON',
    resetDemoBtn: 'Réinitialiser aux données d’origine (Démo)',
    resetConfirm: 'Êtes-vous sûr de vouloir réinitialiser la carte et les paramètres aux valeurs d’origine ? Toutes vos modifications locales seront écrasées.',
    
    // Footer
    footerRights: 'Tous droits réservés. Pizzeria artisanale à Tozeur.',
    footerAdminLink: 'Accès Espace Gérant'
  },
  ar: {
    // Nav
    navHome: 'الرئيسية',
    navMenu: 'قائمة الطعام',
    navAbout: 'قصتنا',
    navGallery: 'معرض الصور',
    navContact: 'اتصل بنا والوصول',
    cartButton: 'السلة',
    orderWhatsApp: 'اطلب الآن',
    
    // Services
    serviceDineIn: 'تناول بالمطعم',
    serviceTakeaway: 'طلبات سريعة للتسلم',
    serviceDelivery: 'توصيل سريع داخل توزر',
    
    // Hero
    heroBadge: 'بيتزا حرفية أصيلة في توزر',
    heroTitle: 'فن البيتزا الأصيل في قلب واحة الجنوب',
    heroSubtitle: 'عجينة مخمرة بعناية، خبز في درجات حرارة مثالية، أجبان فاخرة ونكهات غنية مستوحاة من كرم واحة توزر.',
    heroViewMenu: 'استكشف القائمة',
    heroOrderNow: 'اطلب عبر واتساب',
    
    // Quick Info Strip
    infoHoursTitle: 'مفتوح كامل أيام الأسبوع',
    infoHoursDesc: 'من 12:00 ظهراً إلى 00:30 ليلاً',
    infoLocationTitle: 'توزر، شارع المغرب العربي',
    infoLocationDesc: 'في قلب مدينة توزر',
    infoPhoneTitle: 'الطلبات المباشرة',
    infoPhoneDesc: '+216 24 210 021',
    infoRatingTitle: 'تقييم زبائننا',
    infoRatingDesc: '4.5 / 5 (بناءً على 245 تقييماً)',
    
    // Categories
    catAll: 'جميع الأطباق والبيتزا',
    catClassique: 'الكلاسيكية',
    catSpeciale: 'خاصة تاكسي',
    catQuatreFromages: '4 أجبان',
    catMexicaine: 'مكسيكية',
    catVegetarienne: 'نباتية',
    catCalzone: 'كالزوني',
    catBoisson: 'مشروبات',
    catDessert: 'تحليات',

    // Product Card
    fromPrice: 'ابتداءً من',
    tnd: 'د.ت',
    customizeAndAdd: 'تخصيص وإضافة',
    addToCart: 'أضف إلى السلة',
    available: 'متوفر',
    unavailable: 'غير متوفر حالياً',
    featured: 'الأكثر طلباً',

    // Product Modal
    chooseSize: '1. اختر الحجم المناسب',
    chooseExtras: '2. الإضافات والمكملات اللذيذة',
    specialNotes: 'ملاحظات أو طلبات خاصة للشيف',
    notesPlaceholder: 'مثال: محمصة جيداً، بدون بصل، هريسة منفصلة...',
    quantity: 'الكمية',
    totalProductPrice: 'السعر الإجمالي',

    // Cart & Checkout
    cartTitle: 'سلة طلباتك الشهية',
    emptyCartTitle: 'سلتك فارغة حالياً',
    emptyCartDesc: 'استعرض قائمة البيتزا وأضف ما يحلو لك من أطباقنا الطازجة.',
    viewMenuBtn: 'عرض القائمة',
    deliveryMethod: 'طريقة الاستلام',
    methodDineIn: 'تناول بالمطعم (حجز طاولة)',
    methodTakeaway: 'استلام ذاتي من المحل',
    methodDelivery: 'توصيل للمنزل (داخل توزر)',
    deliveryAddressLabel: 'العنوان الكامل للتوصيل في توزر',
    deliveryAddressPlaceholder: 'الحي، الشارع، علامة مميزة (قرب المدرسة أو المسجد)...',
    customerNameLabel: 'الاسم الكامل',
    customerNamePlaceholder: 'مثال: محمد علي',
    customerPhoneLabel: 'رقم الهاتف الجوال',
    customerPhonePlaceholder: 'مثال: 24 210 021 أو 98 000 000',
    orderNotesLabel: 'ملاحظات إضافية أو وقت الاستلام المفضل',
    orderNotesPlaceholder: 'مثال: جاهزة عند الساعة 20:30 من فضلكم...',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'معلوم التوصيل',
    totalOrder: 'المجموع الإجمالي',
    orderViaWhatsAppBtn: 'تأكيد وإرسال الطلب عبر واتساب',
    whatsAppNoticeTitle: 'كيفية معالجة الطلب عبر واتساب :',
    whatsAppNoticeBody: 'بالضغط على الزر، سيتم تلخيص طلبك وتجهيز الرسالة لإرسالها مباشرة إلى واتساب المطعم (+216 24 210 021). سيقوم فريقنا بالرد الفوري لتأكيد الطلب ووقت التجهيز.',
    
    // About
    aboutTitle: 'بيتزا تاكسي – توزر',
    aboutSubtitle: 'شغف البيتزا الحقيقية عند ملتقى التقاليد الإيطالية وكرم الضيافة التونسية.',
    aboutP1: 'يقع بيتزا تاكسي في شارع المغرب العربي الشهير في توزر، وأصبح الوجهة المفضلة لعشاق البيتزا المقرمشة والغنية بالنكهات اللذيذة.',
    aboutP2: 'سر تميزنا يكمن في عجينتنا المخمرة لأكثر من 48 ساعة لسهولة الهضم، وصلصة الطماطم المحضرة بالأعشاب الطبيعية والمكونات الطازجة يومياً.',
    aboutP3: 'سواء كنت زائراً لربوع الجريد الساحرة أو من أبناء توزر الأوفياء، نسعد باستقبالك في جو دافئ أو بتوصيل وجبتك ساخنة مباشرة إلى بيتك.',

    // Gallery
    galleryTitle: 'أجواء بيتزا تاكسي بالصور',
    gallerySubtitle: 'استكشف أجواء مطعمنا المريحة، وأفراننا الدافئة وتحضيراتنا اليومية.',

    // Contact
    contactTitle: 'تواصل معنا وزيارتنا',
    contactSubtitle: 'يسعدنا دائماً خدمتكم واستقبالكم في توزر.',
    contactAddress: 'العنوان',
    contactPhone: 'الهاتف والواتساب',
    contactHours: 'أوقات العمل',
    contactDirectionsBtn: 'فتح الاتجاهات عبر خرائط جوجل',
    callNowBtn: 'اتصال مباشر بالمطعم',

    // Admin
    adminPortal: 'بوابة الإدارة المحلية',
    adminLoginTitle: 'تسجيل دخول الإدارة',
    adminLoginSubtitle: 'إدارة قائمة الطعام والطلبات والإعدادات محلياً.',
    adminDisclaimer: 'تنبيه أمان : تعتمد هذه الواجهة على التخزين المحلي لمتصفحك فقط (localStorage) ولا تخزن البيانات على خادم خارجي.',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    loginBtn: 'تسجيل الدخول',
    logoutBtn: 'تسجيل الخروج',
    invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
    
    adminTabOverview: 'نظرة عامة',
    adminTabMenu: 'إدارة القائمة',
    adminTabOrders: 'الطلبات المحلية',
    adminTabSettings: 'إعدادات المطعم',
    adminTabBackup: 'النسخ الاحتياطي والبيانات',
    
    demoCredentialsHint: 'بيانات الدخول التجريبية : admin / taxipizza2026',
    
    // Admin stats
    statTotalOrders: 'الطلبات المسجلة (بهذا المتصفح)',
    statPendingOrders: 'قيد التحضير والتجهيز',
    statCompletedOrders: 'الطلبات المستلمة',
    statSampleRevenue: 'إجمالي المبيعات المحلية التقديرية',
    statLocalNotice: 'بيانات تجريبية محلية مسجلة في هذا المتصفح فقط',
    
    // Admin menu
    addProduct: 'إضافة صنف جديد',
    editProduct: 'تعديل الصنف',
    deleteProduct: 'حذف',
    confirmDelete: 'هل أنت متأكد من رغبتك في حذف هذا الصنف من القائمة ؟',
    productNameFr: 'اسم الصنف (بالفرنسية)',
    productNameAr: 'اسم الصنف (بالعربية)',
    productCategory: 'الفئة',
    productPrice: 'السعر الأساسي (د.ت)',
    productImage: 'رابط الصورة',
    productImageHelp: 'أدخل رابط ويب للصورة أو اختر صورة من جهازك كمعاينة.',
    productDescFr: 'الوصف (بالفرنسية)',
    productDescAr: 'الوصف (بالعربية)',
    productAvailable: 'الصنف متاح للطلب',
    productFeatured: 'عرض في مميزات الصفحة الرئيسية',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',

    // Admin orders
    newOrderManual: 'تسجيل طلب يدوياً',
    orderId: 'رقم الطلب',
    customer: 'الزبون',
    status: 'الحالة',
    items: 'الأصناف',
    total: 'المبلغ',
    actions: 'إجراءات',
    source: 'المصدر',

    statusNouvelle: 'جديدة',
    statusPreparation: 'قيد التحضير',
    statusLivraison: 'في طريق التوصيل',
    statusLivree: 'تم التسليم',
    statusAnnulee: 'ملغاة',

    // Backup
    backupTitle: 'النسخ الاحتياطي واستعادة البيانات',
    backupDesc: 'يمكنك تصدير كافة بيانات القائمة والطلبات والإعدادات كملف JSON لنسخها احتياطياً أو نقلها إلى متصفح آخر.',
    exportJsonBtn: 'تحميل نسخة JSON احتياطية',
    importJsonBtn: 'استرجاع من ملف JSON',
    resetDemoBtn: 'إعادة التعيين إلى البيانات التجريبية الافتراضية',
    resetConfirm: 'هل أنت متأكد من إعادة تعيين القائمة والإعدادات إلى القيم الأصلية؟ سيتم محو كافة التعديلات المحلية.',
    
    // Footer
    footerRights: 'جميع الحقوق محفوظة. بيتزا تاكسي توزر.',
    footerAdminLink: 'دخول مسؤولي المطعم'
  }
};
