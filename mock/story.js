import placeholderImg1 from './images/placeholder-light-restaurant.png';

export default function getStoryData() {
  return {
    createdAt: 1620484966000,
    id: 7,
    slug: 'mock-story',
    img: placeholderImg1,
    title: '3 new Chinese restaurants in West End',
    subtitle:
      'Lorem ipsum dolor sit amet, ea eum vitae bonorum, omittam intellegam his ea. Verear blandit vim ea, dolore oblique mediocritatem ad nam. ',
    categories: [
      {
        id: '7c6e2dd4-3b9d-4716-9241-5ccd7bd58f37 ',
        theme: 'lightorange',
        name: 'Restaurants, Bars & Coffees'
      },
      {
        id: 'e4f230eb-0a95-4860-a979-9b787da54b42',
        theme: 'lightorange',
        name: 'Eat & Drink'
      }
    ],
    places: [
      {
        id: '42b54b28-0d8d-48b4-bdf9-d761dc425302',
        name: 'Chinese Restaurant Xu Gan',
        theme: 'lightorange',
        categories: [{ name: 'Banket Rooms', id: 'cat-2-3', theme: 'lightorange' }]
      },
      {
        id: '18961a7a-c6b4-4964-86fe-a43f4811a006',
        name: 'Pekin Wantan',
        theme: 'lightblue',
        categories: [
          { name: 'other', id: 'cat-2-2', theme: 'lightblue' },
          { name: 'other stuff', id: 'cat-2-3', theme: 'lightblue' }
        ]
      },
      {
        id: '0361f3d7-46e3-41ea-9544-5c28d7adfbd1',
        name: 'I Love Spring Rolls',
        location: 'Mchenry',
        theme: 'cream',
        categories: [
          { name: 'Bakery', id: 'cat-2-2', theme: 'cream' },
          { name: 'Banket Rooms', id: 'cat-2-3', theme: 'cream' }
        ]
      }
    ]
  };
}
