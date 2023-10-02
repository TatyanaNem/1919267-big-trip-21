import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(cities, dates, totalPrice) {
  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cities}</h1>

              <p class="trip-info__dates">${dates}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #cities = '';
  #dates = '';
  #totalPrice = 0;

  constructor ({cities, dates, totalPrice}) {
    super();
    this.#cities = cities;
    this.#dates = dates;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#cities, this.#dates, this.#totalPrice);
  }
}
