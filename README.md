# Taxi Pizza – بيتزا تاكسي | Tozeur, Tunisie

Site web vitrine, commande en ligne via WhatsApp et tableau de bord d'administration locale pour la pizzeria **Taxi Pizza** située sur l'Avenue Al Maghreb Al Arabi à Tozeur, Tunisie.

---

## 🍕 Caractéristiques Principales

- **Site Public Réactif & Gourmand** :
  - **Identité Visuelle** : Noir charbon (`#0f1012`), crème chaleureuse et rouge tomate vif.
  - **Bilingue & RTL** : Français par défaut, avec support complet de l'Arabe et direction de texte RTL (`dir="rtl"`).
  - **Aucune Inscription Requise** : Les clients n'ont jamais besoin de créer de compte ou de s'authentifier.
  - **Pages Complètes** :
    - **Accueil** : Hero cinématique avec pizzas au feu de bois, bandeau d'informations rapides (horaires, adresse, note 4.5/5 basée sur 245 avis), services (Sur place, À emporter, Livraison express), sélection du chef et avis clients.
    - **Notre Carte (Menu)** : 8 catégories complètes (*Classiques, Spéciales, 4 Fromages, Mexicaines, Végétariennes, Calzones, Boissons, Desserts*), moteur de recherche instantané, choix des tailles (Moyenne 30cm, Large 36cm, Familiale 42cm) et suppléments gourmands.
    - **Panier & Commande** : Ajustement des quantités, notes pour le pizzaiolo, calcul précis du sous-total, des frais de livraison et du total en Dinars Tunisiens (TND).
    - **Commande Directe sur WhatsApp** : Génération d'un message structuré avec récapitulatif complet et redirection sécurisée vers le numéro officiel `+216 24 210 021` (`https://wa.me/21624210021`).
    - **Notre Histoire (À propos)** : Récit authentique au cœur de l'oasis de Tozeur, maturation lente de la pâte (48h) et passion du feu de bois.
    - **Galerie** : Photothèque haute résolution avec affichage plein écran (lightbox).
    - **Contact & Accès** : Plan interactif, coordonnées, horaires (12h00 - 00h30 7j/7) et formulaire de message instantané.

- **Espace Administration Autonome (`/admin/login` ou lien discret en bas de page)** :
  - **Sécurité et Transparence** : Aucune dépendance à un serveur payant ou base de données externe. Authentification locale côté client avec identifiants démo modifiables.
  - **Tableau de Bord** : Indicateurs clés (commandes locales, commandes en cours, commandes livrées, estimation du chiffre d'affaires).
  - **Gestion du Menu** : Ajout, modification des prix en TND, catégories, statuts de disponibilité, photos (URL ou aperçu local), coup de cœur et suppression avec confirmation.
  - **Gestion des Commandes** : Suivi des commandes enregistrées dans ce navigateur, mise à jour des statuts (*Nouvelle, En préparation, En livraison, Livrée, Annulée*) et saisie manuelle de commandes téléphoniques.
  - **Réglages du Restaurant** : Téléphone, WhatsApp, adresse, horaires d'ouverture, frais de livraison, message promotionnel et changement du mot de passe admin.
  - **Sauvegarde & Restauration (JSON)** : Exportation complète en un clic de la base locale et réimportation avec validation de schéma. Bouton de remise à zéro aux données d'origine (Démo).

---

## 🛠️ Stack Technique

- **Framework** : React 19 + TypeScript + Vite
- **Styles** : Tailwind CSS v4 (avec polices *Plus Jakarta Sans* et *Alexandria* pour l'arabe)
- **Icônes & Animations** : Lucide React & Motion
- **Persistance** : `localStorage` navigateur (sans base de données serveur)

---

## 🚀 Lancement en Local

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

3. Vérifier le build de production :
   ```bash
   npm run build
   ```

---

## 🌐 Déploiement sur Vercel

Le projet est préconfiguré pour un déploiement fluide sur Vercel avec le fichier `vercel.json` qui redirige toutes les routes vers `/index.html` :

1. Poussez le projet sur GitHub.
2. Rendez-vous sur votre tableau de bord [Vercel](https://vercel.com) et importez le dépôt.
3. Configurez les options de build si nécessaire (détectées automatiquement par Vite) :
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
4. Cliquez sur **Deploy**. Votre site sera immédiatement en ligne !

---

## 🔐 Identifiants de Démonstration Gérant

- **URL d'accès** : `/admin/login` (ou via le lien « Accès Espace Gérant » en bas du site)
- **Identifiant par défaut** : `admin`
- **Mot de passe par défaut** : `taxipizza2026`

*Ces identifiants peuvent être personnalisés à tout moment depuis l'onglet « Paramètres » du tableau de bord.*

---

## 📍 Coordonnées du Restaurant

- **Nom** : Taxi Pizza – بيتزا تاكسي
- **Téléphone / WhatsApp** : +216 24 210 021
- **Adresse** : W4C9+4W3, Avenue Al Maghreb Al Arabi, Tozeur, Tunisie
- **Services** : Sur place, À emporter et Livraison à domicile
