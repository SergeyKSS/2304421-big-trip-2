import AbstractView from '../framework/view/abstract-view';
import { sortTypes, disabledSorts } from '../const';

function createTripSortTemplate(currentSort) {

  function isChecked(sortType) {
    return sortType === currentSort ? 'checked' : '';
  }
  function isDisabled(sortType) {
    return disabledSorts.includes(sortType) ? 'disabled' : '';
  }

  return sortTypes.map((sortType) =>
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked(sortType)} ${isDisabled(sortType)}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType[0].toUpperCase() + sortType.slice(1)}</label>
    </div>`).join('');
}

function createSortingViewTemplate(currentSort = 'day') {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createTripSortTemplate(currentSort)}
          </form>`;
}

export default class SortingView extends AbstractView {
  #currentSort = null;

  constructor(currentSort = 'day') {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSortingViewTemplate(this.#currentSort);
  }
}

