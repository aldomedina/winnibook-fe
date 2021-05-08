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
        name: 'Chinese Restaurant Xu Gan',
        theme: 'lightorange',
        categories: [{ name: 'Banket Rooms', id: 'cat-2-3', theme: 'lightorange' }]
      },
      {
        name: 'Pekin Wantan',
        theme: 'lightblue',
        categories: [
          { name: 'other', id: 'cat-2-2', theme: 'lightblue' },
          { name: 'other stuff', id: 'cat-2-3', theme: 'lightblue' }
        ]
      },
      {
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
