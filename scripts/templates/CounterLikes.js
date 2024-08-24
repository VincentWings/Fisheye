class CounterLike {
  constructor(likes, price) {
    this._likes = likes;
    this._price = price;
  }

  createCounterLike() {
    const element = document.createElement("div");
    element.className = "likes-counter";
    const elementContent = `
        <span class='likes'>
          <p id='totalLike'>
            ${this._likes}
          </p>
          <i class="fa-solid fa-heart"></i>
        </span>

        <span class='price'>
          ${this._price}€ / jour
        </span>
     `;

    element.innerHTML = elementContent;

    return element;
  }
}