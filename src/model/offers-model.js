export default class OffersModel {
  #offers = [];

  constructor (offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByIds(offersIds) {
    if (offersIds.length === 0) {
      return [];
    }

    const allOffers = this.#offers.reduce((acc, offersByType) => [...acc, ...offersByType.offers], []);

    return offersIds.reduce((acc, offerId) => {
      const chosenOffer = allOffers.find((offer) => offer.id === offerId);

      return (chosenOffer ? [...acc, chosenOffer] : acc);
    }, []);
  }
}
