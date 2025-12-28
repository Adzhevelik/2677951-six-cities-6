import { MouseEvent } from 'react';
import { CITIES } from '../../constants/cities';

type CityListProps = {
  currentCity: string;
  onCityChange: (city: string) => void;
};

function CityList({ currentCity, onCityChange }: CityListProps): JSX.Element {
  const handleCityClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    city: string
  ) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  currentCity === city ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(evt) => handleCityClick(evt, city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CityList;
