import {render} from '../framework/render.js';
import AddPointButtonVeiw from '../view/add-point-button-view.js';

export default class AddPointButtonPresenter {
  #addPointContainer = null;
  #buttonComponent = null;
  #handleButtonClick = null;

  constructor({addPointContainer}) {
    this.#addPointContainer = addPointContainer;
  }

  init({onClick}) {
    this.#handleButtonClick = onClick;
    this.#buttonComponent = new AddPointButtonVeiw({onClick: this.#buttonClickHandler});
    render(this.#buttonComponent, this.#addPointContainer);
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
