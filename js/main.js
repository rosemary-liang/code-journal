/* global data */
/* exported data */
var $photoURL = document.getElementById('user-photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var entries = [];

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

function handleSubmit(event) {
  event.preventDefault();
  var title = $form.elements.title.value;
  var photo = $form.elements.photo.value;
  var notes = $form.elements.notes.value;
  var entryData = {
    title: title,
    photo: photo,
    notes: notes,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  entries.push(entryData);
  data.entries.unshift(entryData);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$form.addEventListener('submit', handleSubmit);
