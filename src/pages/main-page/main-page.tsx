import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { changeCity } from '../../store/slices/city-slice';
import { logout } from '../../store/action';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import SortOptions from '../../components/sort-options/sort-options';
import CityList from '../../components/city-list/city-list';
import Spinner from '../../components/spinner/spinner';
import { SortType } from '../../constants/sort';
import { sortOffers } from '../../utils/sort';
import { Offer } from '../../types/offer';
import { AuthorizationStatus } from '../../constants/auth';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.city.currentCity);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const isOffersLoading = useSelector((state: RootState) => state.offers.isLoading);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  const user = useSelector((state: RootState) => state.user.user);

  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city]
  );

  const sortedOffers = useMemo(
    () => sortOffers(cityOffers, currentSort),
    [cityOffers, currentSort]
  );

  const handleCityChange = useCallback((newCity: string) => {
    dispatch(changeCity(newCity));
  }, [dispatch]);

  const handleLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">3</span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList currentCity={city} onCityChange={handleCityChange} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {city}</b>
              <SortOptions currentSort={currentSort} onSortChange={setCurrentSort} />
              <OfferList offers={sortedOffers} onOfferHover={setSelectedOffer} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={cityOffers} selectedOffer={selectedOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
