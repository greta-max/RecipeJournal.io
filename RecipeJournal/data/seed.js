
(function seedRecipes() {
  const CUSTOM_KEY = 'ss_custom_recipes';
  const existing = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
  if (existing.length > 0) return;

  const SEED_RECIPES = [

    
    {
      id: 'c_seed_1',
      category: 'cooking',
      tags: ['chicken'],
      name: 'Adobong Chicken Feet',
      image: 'images/feet.jpg',
      prepTime: '20 min',
      cookTime: '45 min',
      servings: 4,
      ingredients: [
        '1 kg chicken feet, cleaned and nails trimmed',
        '½ cup soy sauce',
        '½ cup white vinegar',
        '1 head garlic, crushed',
        '3 bay leaves',
        '1 tsp whole black peppercorns',
        '1 tsp sugar',
        '1 cup water',
        '3 tbsp cooking oil',
        'Salt to taste'
      ],
      steps: [
        'Boil chicken feet in water for 15 minutes. Drain and set aside.',
        'Heat oil in a pan over medium heat. Sauté garlic until golden.',
        'Add chicken feet and lightly brown for 3–4 minutes.',
        'Pour in soy sauce, vinegar, and water. Do not stir yet — let it come to a boil.',
        'Add bay leaves, peppercorns, and sugar.',
        'Stir and simmer over low heat for 25–30 minutes until chicken feet are tender and sauce thickens.',
        'Season with salt if needed. Serve hot with steamed white rice.'
      ]
    },
    {
      id: 'c_seed_2',
      category: 'cooking',
      tags: ['vegetarian'],
      name: 'Chop Suey',
      image: 'images/chopseuy.jpg',
      prepTime: '15 min',
      cookTime: '20 min',
      servings: 4,
      ingredients: [
        '200g chicken breast or shrimp (optional)',
        '1 cup cauliflower florets',
        '1 cup cabbage, chopped',
        '1 medium carrot, sliced diagonally',
        '1 cup snow peas',
        '1 bell pepper, sliced',
        '3 stalks celery, sliced',
        '1 medium onion, sliced',
        '4 cloves garlic, minced',
        '1 cup chicken broth',
        '2 tbsp oyster sauce',
        '1 tbsp soy sauce',
        '1 tbsp cornstarch dissolved in 2 tbsp water',
        '2 tbsp cooking oil',
        'Salt and pepper to taste'
      ],
      steps: [
        'Heat oil in a wok or large pan over high heat.',
        'Sauté garlic and onion until fragrant, about 2 minutes.',
        'Add chicken or shrimp if using; cook until done.',
        'Add carrots and cauliflower; stir-fry 3 minutes.',
        'Add cabbage, snow peas, bell pepper, and celery. Toss well.',
        'Pour in chicken broth, oyster sauce, and soy sauce.',
        'Cover and cook 3–4 minutes until vegetables are tender-crisp.',
        'Add cornstarch slurry and stir until sauce thickens.',
        'Season with salt and pepper. Serve immediately over rice.'
      ]
    },
    {
      id: 'c_seed_3',
      category: 'cooking',
      tags: ['seafood'],
      name: 'Grilled Bangus',
      image: 'images/inihaw na bangus.jpg',
      prepTime: '30 min',
      cookTime: '25 min',
      servings: 4,
      ingredients: [
        '2 whole bangus (milkfish), cleaned and butterflied',
        '3 medium tomatoes, diced',
        '1 medium onion, diced',
        '1 thumb ginger, minced',
        '3 cloves garlic, minced',
        '2 tbsp soy sauce',
        '1 tsp fish sauce',
        '½ tsp ground black pepper',
        '2 tbsp calamansi or lemon juice',
        '2 tbsp cooking oil',
        'Banana leaves or aluminum foil for wrapping',
        'Salt to taste'
      ],
      steps: [
        'Score the flesh of the bangus with diagonal cuts. Rub with salt, pepper, and calamansi juice inside and out. Marinate 20 minutes.',
        'Mix together tomatoes, onion, ginger, garlic, soy sauce, and fish sauce for the stuffing.',
        'Stuff the cavity of each bangus generously with the tomato mixture.',
        'Brush the outside with cooking oil.',
        'Wrap each fish in banana leaves or foil, securing tightly.',
        'Grill over medium-hot coals or a grill pan for 10–12 minutes per side.',
        'Unwrap and serve hot with steamed rice, spiced vinegar, or toyomansi dipping sauce.'
      ]
    },
    {
      id: 'c_seed_4',
      category: 'cooking',
      tags: ['beef'],
      name: 'Nilagang Baka',
      image: 'images/nilagang baka.jpg',
      prepTime: '15 min',
      cookTime: '1 hr 30 min',
      servings: 6,
      ingredients: [
        '1 kg beef brisket or short ribs, cut into large chunks',
        '2 medium potatoes, quartered',
        '1 medium cabbage, cut into wedges',
        '3 pieces saba banana, halved',
        '2 corn cobs, cut into thirds',
        '1 medium onion, quartered',
        '1 tsp whole black peppercorns',
        '2 tsp fish sauce (patis)',
        '8 cups water',
        'Salt to taste',
        'Green onions to garnish'
      ],
      steps: [
        'Place beef and onion in a large pot. Pour in water and bring to a boil.',
        'Skim off the foam and scum that rises to the surface.',
        'Add peppercorns and season with fish sauce and salt.',
        'Lower heat, cover, and simmer for 1 hour until beef is tender.',
        'Add corn and banana; cook 10 minutes.',
        'Add potatoes; cook another 10 minutes until tender.',
        'Add cabbage last and cook 3–5 minutes until just wilted.',
        'Adjust seasoning. Serve hot in deep bowls with steamed rice and patis on the side.'
      ]
    },
    {
      id: 'c_seed_5',
      category: 'cooking',
      tags: ['pasta'],
      name: 'Tagalog Spaghetti',
      image: 'images/spaghnabawas.jpg',
      prepTime: '15 min',
      cookTime: '35 min',
      servings: 6,
      ingredients: [
        '500g spaghetti noodles',
        '500g ground pork',
        '6 hotdogs, sliced diagonally',
        '1 can (250g) tomato sauce',
        '1 can (250g) banana ketchup',
        '1 medium onion, diced',
        '5 cloves garlic, minced',
        '1 cup evaporated milk',
        '2 tbsp brown sugar',
        '2 tbsp cooking oil',
        'Salt and pepper to taste',
        'Grated cheese for topping'
      ],
      steps: [
        'Cook spaghetti according to package instructions until al dente. Drain and set aside.',
        'Heat oil in a large pan over medium heat. Sauté garlic and onion until soft.',
        'Add ground pork and cook until browned, breaking it up as it cooks.',
        'Add sliced hotdogs and cook 2 minutes.',
        'Pour in tomato sauce and banana ketchup. Stir well.',
        'Add brown sugar, salt, and pepper. Simmer 15 minutes, stirring occasionally.',
        'Stir in evaporated milk and simmer another 5 minutes.',
        'Toss cooked spaghetti with the sauce until fully coated.',
        'Serve topped with grated cheese.'
      ]
    },


    {
      id: 'c_seed_6',
      category: 'baking',
      tags: ['brownies'],
      name: 'Brownie',
      image: 'images/cement.jpg',
      prepTime: '15 min',
      cookTime: '25 min',
      servings: 16,
      ingredients: [
        '1 cup (225g) unsalted butter',
        '2 cups sugar',
        '4 large eggs',
        '1 tsp vanilla extract',
        '1 cup all-purpose flour',
        '¾ cup unsweetened cocoa powder',
        '½ tsp baking powder',
        '½ tsp salt',
        '1 cup chocolate chips (optional)',
        'Powdered sugar for dusting (optional)'
      ],
      steps: [
        'Preheat oven to 175°C (350°F). Grease and line a 9×13 inch baking pan with parchment paper.',
        'Melt butter in a saucepan over low heat. Remove from heat and stir in sugar.',
        'Beat in eggs one at a time, then add vanilla extract.',
        'Sift in cocoa powder, flour, baking powder, and salt. Fold until just combined — do not overmix.',
        'Fold in chocolate chips if using.',
        'Pour batter into the prepared pan and spread evenly.',
        'Bake for 22–25 minutes until a toothpick inserted in the center comes out with moist crumbs.',
        'Cool completely in the pan before slicing into 16 squares. Dust with powdered sugar if desired.'
      ]
    },
    {
      id: 'c_seed_7',
      category: 'baking',
      tags: ['cookies'],
      name: 'Crinkles',
      image: 'images/crinkles.jpg',
      prepTime: '20 min',
      cookTime: '12 min',
      servings: 30,
      ingredients: [
        '1 cup all-purpose flour',
        '¼ cup unsweetened cocoa powder',
        '1 tsp baking powder',
        '¼ tsp salt',
        '1 cup sugar',
        '¼ cup vegetable oil',
        '2 large eggs',
        '1 tsp vanilla extract',
        '½ cup powdered sugar for rolling',
        '2 tbsp granulated sugar for rolling'
      ],
      steps: [
        'Whisk together flour, cocoa powder, baking powder, and salt in a bowl. Set aside.',
        'In another bowl, mix sugar and oil until combined. Beat in eggs one at a time, then vanilla.',
        'Gradually fold in the flour mixture until a soft dough forms.',
        'Cover the dough and refrigerate for at least 2 hours or overnight.',
        'Preheat oven to 180°C (350°F). Line baking sheets with parchment paper.',
        'Roll dough into 1-inch balls. Roll first in granulated sugar, then generously in powdered sugar.',
        'Place on prepared sheets 5 cm apart.',
        'Bake 10–12 minutes until tops are set and crackled. They will look underdone but firm up as they cool.',
        'Cool on the pan for 5 minutes before transferring to a wire rack.'
      ]
    },
    {
      id: 'c_seed_8',
      category: 'baking',
      tags: ['pastry'],
      name: 'Egg Pie',
      image: 'images/eggpie.jpg',
      prepTime: '25 min',
      cookTime: '50 min',
      servings: 8,
      ingredients: [
        'For the crust:',
        '1½ cups all-purpose flour',
        '½ tsp salt',
        '½ cup cold butter, cubed',
        '3–4 tbsp ice cold water',
        'For the filling:',
        '1 can (390ml) evaporated milk',
        '1 can (390ml) condensed milk',
        '5 large eggs',
        '1 tsp vanilla extract',
        '¼ tsp cream of tartar'
      ],
      steps: [
        'Make the crust: mix flour and salt. Cut in cold butter until crumbly. Add ice water one tbsp at a time until dough comes together.',
        'Roll out dough and press into a 9-inch pie pan. Trim edges and crimp. Refrigerate 15 minutes.',
        'Preheat oven to 175°C (350°F).',
        'Separate 2 eggs. Set whites aside. Beat the 2 yolks with the remaining 3 whole eggs.',
        'Mix in evaporated milk, condensed milk, and vanilla extract until smooth.',
        'Beat the 2 egg whites with cream of tartar until stiff peaks form. Gently fold into the milk mixture.',
        'Pour filling into the chilled crust.',
        'Bake 45–50 minutes until the top is golden brown and the center is just set.',
        'Cool completely before slicing. The filling will firm up as it cools.'
      ]
    },
    {
      id: 'c_seed_9',
      category: 'baking',
      tags: ['bread'],
      name: 'Pandesal',
      image: 'images/pandehamreno.jpg',
      prepTime: '20 min',
      cookTime: '15 min',
      servings: 20,
      ingredients: [
        '4 cups all-purpose flour',
        '1 packet (7g) instant yeast',
        '¼ cup sugar',
        '1 tsp salt',
        '1 cup warm milk',
        '¼ cup warm water',
        '1 egg',
        '3 tbsp unsalted butter, softened',
        '½ cup fine breadcrumbs for coating'
      ],
      steps: [
        'Combine flour, yeast, sugar, and salt in a large bowl.',
        'Add warm milk, warm water, egg, and butter. Mix until a soft dough forms.',
        'Knead on a lightly floured surface for 8–10 minutes until smooth and elastic.',
        'Place in a greased bowl, cover with a damp cloth, and let rise 1 hour until doubled.',
        'Punch down the dough. Divide into 20 equal pieces and shape each into a smooth oval roll.',
        'Roll each piece in breadcrumbs and place on a lined baking sheet.',
        'Cover and let rise another 30 minutes.',
        'Preheat oven to 190°C (375°F).',
        'Bake 13–15 minutes until light golden brown.',
        'Serve warm. Best eaten fresh with butter, cheese, or filling of your choice.'
      ]
    },
    {
      id: 'c_seed_10',
      category: 'baking',
      tags: ['cakes'],
      name: 'Ube Biko',
      image: 'images/ricecake.jpg',
      prepTime: '20 min',
      cookTime: '45 min',
      servings: 12,
      ingredients: [
        '3 cups glutinous rice (malagkit), washed and drained',
        '2 cans (400ml each) coconut milk',
        '1½ cups sugar',
        '1 cup ube halaya (purple yam jam)',
        '1 tsp ube extract',
        '¼ tsp salt',
        'For latik topping:',
        '1 can (400ml) coconut cream',
        '2 tbsp brown sugar'
      ],
      steps: [
        'Make latik: simmer coconut cream in a pan over medium heat, stirring often, until curds form and turn golden. Set aside.',
        'Combine glutinous rice and coconut milk in a large pot. Cook over medium heat, stirring constantly, until rice absorbs most of the liquid (about 20 minutes).',
        'Add sugar, ube halaya, ube extract, and salt. Stir vigorously until fully incorporated and mixture thickens and pulls away from the sides.',
        'Preheat oven to 180°C (350°F). Grease a 9×13 inch baking pan.',
        'Transfer the rice mixture into the pan and press down firmly and evenly.',
        'Sprinkle latik and brown sugar evenly over the top.',
        'Bake for 20–25 minutes until the top is set and lightly caramelized.',
        'Cool completely before cutting into squares. Serve at room temperature.'
      ]
    }
  ];

  localStorage.setItem(CUSTOM_KEY, JSON.stringify(SEED_RECIPES));
})();
