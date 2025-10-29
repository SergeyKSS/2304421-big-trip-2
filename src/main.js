import NewFilterView from './view/filters.js';
import NewDestinationView from './view/destination.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new NewFilterView(), filtersElement);
render(new NewDestinationView(), tripMainElement, 'afterbegin');

boardPresenter.init();
