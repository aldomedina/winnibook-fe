import placeholderImg1 from './images/placeholder-light-restaurant.png';
import placeholderImg2 from './images/placeholder-giveaway.jpeg';

export default function getPlaceDetails() {
  return {
    name: "Tony's Master Of Pizza",
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam odio erat, accumsan non condimentum sit amet, egestas in lacus. Pellentesque non libero quis odio ultrices pulvinar. Suspendisse odio velit, ornare ac magna eget, cursus pretium purus. Curabitur vitae venenatis lectus. Vestibulum luctus turpis dui, in varius arcu tristique vitae. Phasellus aliquet ut enim in rutrum. Fusce mollis rutrum pulvinar. Suspendisse fermentum volutpat lacinia.',
    short_description: '',
    latitude: '49.90348486696312 ',
    longitude: '-97.18109174481825',
    streetLine1: '190 Rupert Ave',
    streetLine2: '',
    neighbor: 'Ritchot',
    country: 'Canada',
    postcode: 'MB R3B 0N2',
    theme: 'lightorange',
    contacts: [
      {
        name: 'Main phone',
        type: 'phone',
        value: '99999-9999'
      },
      {
        name: 'Sales mail',
        type: 'email',
        value: 'a@b.com'
      }
    ],
    mainCategory: {
      name: 'Restaurants, Bars & Coffees',
      theme: 'lightorange'
    },
    categories: [
      {
        name: 'Pizza',
        theme: 'lightorange'
      },
      {
        name: 'Casual dinner',
        theme: 'lightorange'
      }
    ],
    images: [
      {
        url: 'https://s3.amazon.com/sakdjoaidjs.jpg',
        alt: 'Picture of a pizza'
      }
    ],
    links: [
      {
        name: 'Facebook',
        url: 'https://facebook.com/pizza'
      }
    ],
    tags: [
      {
        id: 'pizza',
        name: 'Pizza party'
      },
      {
        id: 'cozy',
        name: 'Cozy'
      },
      {
        id: 'kids',
        name: "Kid's friendly"
      }
    ],
    visits: 0,
    stories: [
      {
        id: 'similar-story',
        title: 'The best of little italy',
        image: placeholderImg1,
        mainCategory: {
          name: 'Restaurants, Bars & Coffees',
          theme: 'yellow'
        },
        categories: [
          { name: 'Bakery', id: 'cat-2-2', theme: 'lightorange' },
          { name: 'Banket Rooms', id: 'cat-2-3', theme: 'lightorange' }
        ]
      },
      {
        id: 'similar-sjasdjkasbjd',
        title: '3 new Chinese restaurants in West End',
        image: placeholderImg2,
        mainCategory: {
          name: 'Restaurants, Bars & Coffees',
          theme: 'yellow'
        },
        categories: [
          { name: 'Bakery', id: 'cat-2-2', theme: 'lightorange' },
          { name: 'other stuff', id: 'cat-2-3', theme: 'lightblue' }
        ]
      }
    ],
    similar: [
      {
        id: 'sad12d1wd',
        name: "Tony's Master Of Pizza",
        theme: 'cream',
        primaryCategory: 'Restaurants, Bars & Coffees',
        categories: [{ name: 'Bakery', id: 'cat-2-2', theme: 'lightorange' }]
      },
      {
        id: 'sadasd13r1d',
        name: 'New West Metals Inc',
        theme: 'yellow',
        primaryCategory: 'Construction',
        categories: [{ name: 'Bakery', id: 'cat-2-2', theme: 'lightorange' }]
      }
    ],
    internalContacts: [
      {
        name: "Mario's phone (owner)",
        type: 'phone',
        value: '99999-9999'
      },
      {
        name: "Mario's email (owner)",
        type: 'email',
        value: 'mario@gmail.com'
      }
    ]
  };
}
