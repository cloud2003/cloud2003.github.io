"use strict";

document.addEventListener("DOMContentLoaded", function() {

  var addBtn = document.querySelector('#addBtn');
  var hexInput = document.querySelector('#hexValue');
  var favoriteBtn = document.querySelector('#favoriteBtn');
  var colorList = [
    {hex: 'FAaa80', fav: 0},
    {hex: '000002', fav: 0},
    {hex: 'ff33aa', fav: 0},
    {hex: 'FACEaa', fav: 0},
    {hex: 'CECE80', fav: 0},
    {hex: '5AC580', fav: 0}
  ];

  function createCardOfColor(data, i) {
    return `
  <div class="b-card" data-id="${i}">
      <div class="b-card__color" style="background-color: #${data.hex};"></div>
      <div class="b-card__color-name">#${data.hex}</div>
      <div class="b-card__fav ${data.fav ? 'selected' : ''}" >
          <span class="icon icon-sm">
              <svg class="icon-svg">
                  <use xlink:href="#favorite" />
              </svg>
          </span>
      </div>
      <div class="b-card__del">
          <span class="icon icon-sm">
              <svg class="icon-svg">
                  <use xlink:href="#delete" />
              </svg>
          </span>
      </div>
  </div>`;
  }

  function updateCardOfList (data) {
    let totalStr = '';

    data.forEach(function(item, i) {
      totalStr += createCardOfColor(item, i);
    });
    document.getElementById('content').innerHTML = totalStr;
  }

  function isHex(h) {
    let a = parseInt(h, 16);
    return (a.toString(16) === h.toLowerCase());
  }

  if (window.localStorage.hasOwnProperty('colorListLocalStorage')) {
    colorList = JSON.parse(localStorage.getItem('colorListLocalStorage'));
  }
  updateCardOfList(colorList);

  // add color
  addBtn.addEventListener('click', function (e) {
    if ( isHex(hexInput.value) ) {
      colorList.unshift({
        hex: hexInput.value,
        fav: 0
      });
      hexInput.value = '';
      updateCardOfList(colorList);
      localStorage.setItem('colorListLocalStorage', JSON.stringify(colorList));
    } else {
      alert('Неверный формат');
    }
  });

  // delete card
  document.getElementById('content').addEventListener('click', function(e) {
    var currentID = e.target.closest('.b-card').dataset.id;

    if ( e.target.closest('.b-card__del') ) {
      e.target.closest('.b-card').classList.add('visible');
      setTimeout(function () {
        colorList.splice(currentID, 1);
        updateCardOfList(colorList);
        localStorage.setItem('colorListLocalStorage', JSON.stringify(colorList));
      }, 300);
    }
    if ( e.target.closest('.b-card__fav') ) {
      e.target.closest('.b-card__fav').classList.toggle('selected');
      colorList[currentID].fav = (colorList[currentID].fav == 0 ) ? 1 : 0;
      localStorage.setItem('colorListLocalStorage', JSON.stringify(colorList));
    }
  });

  // favorite card
  favoriteBtn.addEventListener('click', function (e) {
    if (this.classList.contains('selected')) {
      this.classList.remove('selected');
      updateCardOfList(colorList);
    } else {
      this.classList.add('selected');
      var colorListFav = colorList.filter(function(obj) {
        return obj.fav == 1;
      });
      updateCardOfList(colorListFav);
    }
  });
});