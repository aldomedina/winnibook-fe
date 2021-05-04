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
      theme: 'yellow'
    },
    categories: [
      {
        name: 'Pizza'
      },
      {
        name: 'Casual dinner'
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
        name: 'Pizza party'
      },
      {
        name: 'Cozy'
      },
      {
        name: "Kid's friendly"
      }
    ],
    visits: 0,
    stories: [
      {
        title: 'The best of little italy',
        mainCategory: {
          name: 'Restaurants, Bars & Coffees',
          theme: 'yellow'
        }
      },
      {
        title: '3 new Chinese restaurants in West End',
        mainCategory: {
          name: 'Restaurants, Bars & Coffees',
          theme: 'yellow'
        }
      }
    ],
    similar: [
      {
        id: 1,
        name: "Tony's Master Of Pizza",
        theme: 'cream',
        primaryCategory: 'Restaurants, Bars & Coffees',
        secondaryCategory: 'Eat & Drink'
      },
      {
        id: 2,
        name: 'New West Metals Inc',
        theme: 'yellow',
        primaryCategory: 'Construction',
        secondaryCategory: 'Building Materials'
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
