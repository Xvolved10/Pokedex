This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.






API Pokémon : https://pokeapi.co/

Étape 1 : Configuration initiale

Créez une nouvelle application React avec NextJS avec npx create-next-app@latest.
Installez Tailwind CSS si vous souhaitez utiliser ce framework pour le style de votre application.
Installez TypeScript.
Familiarisez-vous avec l'API Pokémon, qui sera votre source de données.


Étape 2 : Définition des composants

page.tsx : Le composant principal qui gère l'état global de l'application, comme la liste des Pokémon et le type de filtre actuel.
PokemonList : Affiche la liste des Pokémon. Il récupère la liste depuis l'état global de l'application.
PokemonCard : Un composant pour afficher les informations d'un Pokémon individuel. Utilisé dans PokemonList.
TypeFilter : Permet aux utilisateurs de sélectionner un type de Pokémon pour filtrer la liste.


Étape 3 : Gestion de l'état et du contexte

Utilisez useState pour gérer l'état local dans chaque composant (par exemple, la liste des Pokémon dans PokédexApp, le type sélectionné dans TypeFilter).
Utilisez useEffect pour charger la liste des Pokémon depuis l'API Pokémon lors du montage du composant PokédexApp.
Considérez l'utilisation de useContext pour passer le type de filtre sélectionné et la fonction pour le modifier de PokédexApp à TypeFilter et PokemonList sans prop drilling.


Étape 4 : Chargement et affichage des données

Dans PokédexApp, utilisez useEffect pour faire une requête à l'API Pokémon et stocker les résultats dans l'état. Vous pourriez vouloir paginer les résultats ou charger plusieurs types de données en parallèle.
Affichez les Pokémon dans PokemonList, en utilisant PokemonCard pour chaque Pokémon.
Implémentez la logique de filtrage dans PokédexApp ou PokemonList pour afficher uniquement les Pokémon qui correspondent au type sélectionné dans TypeFilter.


Étape 5 : Filtrage par type

TypeFilter doit permettre aux utilisateurs de choisir un type de Pokémon (comme Eau, Feu, Plante, etc.). Cette sélection met à jour l'état global de l'application pour refléter le filtre actif.
Le composant PokemonList utilise ce filtre pour ajuster la liste des Pokémon affichés.


Conseils de développement

Gestion des erreurs : Implémentez la gestion des erreurs pour les appels API pour traiter les cas où l'API est indisponible ou retourne une erreur.
Vos extensions de fichiers doivent être en .tsx
Ne pas hésiter à séparer vos routes d'api dans des dossiers/fichiers différents.