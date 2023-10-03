import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import FilterModel from './model/filter-model.js';
import { offers } from './mock/offers.js';
import {mockPoints} from './mock/points.js';
import { destinations } from './mock/destinations.js';
import AddPointButtonPresenter from './presenter/add-point-button-presenter.js';
import OffersModel from './model/offers-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './service/points-api-service.js';

const AUTHORIZATION = 'Basic nasN1CG3L9Is9t0A';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const tripInfoContainer = document.querySelector('.trip-controls');
const pointsBoardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const offersModel = new OffersModel(offers);
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const addPointButtonPresenter = new AddPointButtonPresenter({
  addPointContainer: tripMainContainer
});

const eventsBoardPresenter = new BoardPresenter({
  pointsBoardContainer,
  pointsModel,
  filterModel,
  offersModel,
  addPointButtonPresenter
});
const filtersPresenter = new FiltersPresenter({
  filterContainer,
  pointsModel,
  filterModel
});

const tripInfoPresenter = new TripInfoPresenter({
  container: tripInfoContainer,
  pointsModel,
  offersModel
});

tripInfoPresenter.init();
addPointButtonPresenter.init({
  onClick: eventsBoardPresenter.createPoint
});
filtersPresenter.init();
eventsBoardPresenter.init();
