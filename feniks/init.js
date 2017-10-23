$(function () {
  // Tree of folders
  $('.b-tree li:has(ul)').addClass('b-tree__branch');
  $('.b-tree li.b-tree__branch > span').on('click', function (e) {
    var children = $(this).parent('li.b-tree__branch').find(' > ul > li');
    if (children.is(":visible")) {
      children.hide('fast');
      $(this).find('.b-icon').removeClass('open');
    } else {
      children.show('fast');
      $(this).find('.b-icon').addClass('open');
    }
    e.stopPropagation();
  });


  $('#openModalWin').on('click', function (e) {
    e.preventDefault();
    modulesModal.openModal();
  });

  $('.b-modal__close').on('click', function (e) {
    e.preventDefault();
    modulesModal.closeModal();
  });

  $('.b-modal_overlay').on('click', function (e) {
    e.preventDefault();
    modulesModal.closeModal();
  });

  $('.b-select__trigger').on('click', function (e) {
    e.preventDefault();
    $('html').one('click',function() {
      $('.b-select').removeClass('opened');
    });
    $(this).parents('.b-select').toggleClass('opened');
    e.stopPropagation();
  });
});


var modulesModal = {
  //modalWin: $('.b-modal'),
  //modalOverlay: $('.b-modal_overlay'),

  openModal: function () {
    $('.b-modal').addClass('show');
    $('.b-modal_overlay').addClass('show');
  },
  closeModal: function () {
    $('.b-modal').removeClass('show');
    $('.b-modal_overlay').removeClass('show');
  }
};