import { useState } from 'react';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard offer={offer} />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
