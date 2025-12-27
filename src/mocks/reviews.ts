import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1af6f711-c28d-4121-82cd-e0b462a27f00',
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2024-11-15T14:48:00.000Z',
    rating: 4.5,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: '2af6f711-c28d-4121-82cd-e0b462a27f01',
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to stay, highly recommended!',
    date: '2024-11-10T14:48:00.000Z',
    rating: 5.0,
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
];
