import placeholderImg1 from './images/placeholder-light-restaurant.png';
import placeholderImg2 from './images/placeholder-giveaway.jpeg';
import placeholderImg3 from './images/placeholder-hardware.png';
import placeholderImg4 from './images/placeholder-chocolate.jpeg';

export const featuresBusiness = [
  {
    id: 1,
    name: "Tony's Master Of Pizza",
    theme: 'cream',
    primaryCategory: 'Restaurants, Bars & Coffees',
    categories: [{ name: 'Eat & Drink', id: 'cat-2-2', theme: 'cream' }]
  },
  {
    id: 2,
    name: 'New West Metals Inc',
    theme: 'yellow',
    primaryCategory: 'Construction',
    categories: [{ name: 'Building Materials', id: 'cat-2-2', theme: 'yellow' }]
  },
  {
    id: 3,
    name: 'Rocky Mountain Chocolate Factory',
    theme: 'lightorange',
    primaryCategory: 'Food',
    categories: [{ name: 'Chocolate', id: 'cat-2-2', theme: 'lightorange' }]
  },
  {
    id: 5,
    name: 'One Stop Meat Shop',
    theme: 'lightgreen',
    primaryCategory: 'Restaurants, Bars & Coffees',
    categories: [{ name: 'Eat & Drink', id: 'cat-2-2', theme: 'lightgreen' }]
  },
  {
    id: 6,
    name: 'Aplaplac Institute',
    theme: 'darkgreen',
    primaryCategory: 'Restaurants, Bars & Coffees',
    categories: [{ name: 'Eat & Drink', id: 'cat-2-2', theme: 'darkgreen' }]
  },
  {
    id: 4,
    name: 'Eiffel Tower Pastry Shop & Catering',
    theme: 'lightorange',
    primaryCategory: 'Food',
    secondaryCategory: 'Bakery',
    categories: [{ name: 'Bakery ', id: 'cat-2-2', theme: 'lightorange' }]
  }
];

export const stories = {
  featured: {
    id: 7,
    img: placeholderImg1,
    title: '3 new Chinese restaurants in West End',
    theme: 'lightblue',
    categories: [
      {
        theme: 'cream',
        name: 'Restaurants, Bars & Coffees'
      },
      {
        theme: 'cream',
        name: 'Eat & Drink'
      }
    ],
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  latest: [
    {
      id: 8,
      img: placeholderImg4,
      title: 'The Best Chocolate Shop in Every Region',
      categories: [
        {
          theme: 'lightorange',
          name: 'Chocolate'
        }
      ]
    },
    {
      id: 9,
      img: placeholderImg2,
      title: 'April Giveaway: Win food for a whole week!',
      categories: [
        {
          theme: 'lightblue',
          name: 'Giveaway'
        }
      ]
    },
    {
      id: 10,
      img: placeholderImg3,
      title: 'New hardware store in town',
      categories: [
        {
          theme: 'yellow',
          name: 'Hardware Store'
        }
      ]
    }
  ]
};

export const topSearch = {
  top: {
    id: 11,
    name: 'Aplaplac Institute',
    theme: 'lightgreen',
    primaryCategory: 'Learning',
    secondaryCategory: 'Fine arts school',
    categories: [{ name: 'Fine arts school', id: 'cat-2-2', theme: 'lightgreen' }]
  },
  others: [
    {
      id: 12,
      name: "Tony's Master Of Pizza",
      theme: 'cream',
      primaryCategory: 'Restaurants, Bars & Coffees',
      secondaryCategory: 'Eat & Drink',
      categories: [{ name: 'Eat & Drink', id: 'cat-2-2', theme: 'cream' }]
    },
    {
      id: 13,
      name: 'New West Metals Inc',
      theme: 'yellow',
      primaryCategory: 'Construction',
      secondaryCategory: 'Building Materials',
      categories: [{ name: 'Building Materials', id: 'cat-2-2', theme: 'yellow' }]
    },
    {
      id: 14,
      name: 'Rocky Mountain Chocolate Factory',
      theme: 'lightorange',
      primaryCategory: 'Food',
      secondaryCategory: 'Chocolate',
      categories: [{ name: 'chocolate', id: 'cat-2-2', theme: 'lightorange' }]
    },
    {
      id: 15,
      name: "Tony's Master Of Pizza",
      theme: 'cream',
      primaryCategory: 'Restaurants, Bars & Coffees',
      secondaryCategory: 'Eat & Drink',
      categories: [{ name: 'Eat & Drink', id: 'cat-2-2', theme: 'cream' }]
    }
  ]
};
