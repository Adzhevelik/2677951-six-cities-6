function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404. Page not found</h1>
            <a className="error__link" href="/">
              Go to main page
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
