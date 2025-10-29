import SortingView from '../view/sorting.js';
import TripEventsListView from '../view/trip-events-list.js';
import NewRoutePoint from '../view/route-point.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new TripEventsListView;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortingView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new NewRoutePoint(), this.boardComponent.getElement());
  }
}
