import dayjs from 'dayjs';
import { remove, render, RenderPosition, replace } from '../framework/render';
import TripInfoView from '../view/trip-info-view.js';
import {getPointsDifferenceByDateFrom, getPointsDifferenceByDateTo} from '../utils/sorting.js';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #container = null;
  #pointsModel = null;
  #offersModel = null;

  constructor({container, pointsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#pointsModel.points.length === 0) {
      remove(this.#tripInfoComponent);
      return;
    }

    const prevComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      cities: this.#getCities(),
      dates: this.#getDates(),
      totalPrice: this.#getTotalPrice(),
    });

    if (prevComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevComponent);
    remove(prevComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getCities() {
    const points = this.#pointsModel.points.sort(getPointsDifferenceByDateFrom);
    //const allCities = points.reduce((accumulator, point) => [...accumulator, this.#destinationsModel.getDestinationById(point.destination).name], []);
    const allCities = points.map((point) => point.destination.name);

    if (allCities.length > 3) {
      return `${allCities[0]} &mdash; ... &mdash; ${allCities.at(-1)}`;
    }

    return allCities.join(' &mdash; ');
  }

  #getDates() {
    const points = this.#pointsModel.points;
    const firstDateFrom = points.sort(getPointsDifferenceByDateFrom)[0].dateFrom;
    const lastDateTo = points.sort(getPointsDifferenceByDateTo).at(-1).dateTo;

    return `${dayjs(firstDateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(lastDateTo).format('DD MMM')}`;
  }

  #getTotalPrice() {
    const points = this.#pointsModel.points;
    const allPointsPrice = points.reduce((sum, point) => sum + point.basePrice, 0);

    const allOffers = this.#offersModel.getOffersByIds(this.#offersModel.offers);
    const allOffersSum = allOffers.reduce((sum, offer) => sum + offer.price, 0);

    return allPointsPrice + allOffersSum;
  }
}
