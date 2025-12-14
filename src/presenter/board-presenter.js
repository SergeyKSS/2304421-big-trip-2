import SortingView from '../view/sorting-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { sortTypes } from '../const.js';
import PointPresenter from './point-presenter.js';

const tripMainElement = document.querySelector('.trip-main');


export default class BoardPresenter {
  #tripEventListComponent = new TripEventsListView();
  #boardContainer = null;
  #pointsModel = null;
  #allPoints = [];
  #currentSort = sortTypes[0].type;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#allPoints = [...this.#pointsModel.getPoints()];

    if(this.#allPoints.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new TripInfoView(), tripMainElement, 'afterbegin');
    this.#renderAllPoints();
  }

  #renderAllPoints() {
    render(new SortingView(this.#currentSort), this.#boardContainer);
    render(this.#tripEventListComponent, this.#boardContainer);

    this.#allPoints.forEach((point) => {
      const pointPresenter = new PointPresenter ({
        pointListContainer: this.#tripEventListComponent.element
      });

      pointPresenter.init({
        point,
        destination: this.#pointsModel.getDestinationById(point.destination),
        offers: this.#pointsModel.getOffersByType(point.type)
      });
    });
  }
}

