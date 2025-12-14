import PointItemView from '../view/point-item-view.js';
import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  constructor ({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init({ point, destination, offers }) {
    this.#pointComponent = new PointItemView({
      point,
      destination,
      offers,
      onRollDownBtnClick: this.#replacePointItemToForm
    });

    this.#editPointComponent = new EditPointView({
      point,
      destination,
      offers,
      onFormSubmit: this.#replaceFormToPointItem,
      onRollUpBtnClick: this.#replaceFormToPointItem
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replacePointItemToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPointItem = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPointItem();
    }
  };
}
