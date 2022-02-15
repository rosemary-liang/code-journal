/* global data */
/* exported data */
var $photoURL = document.getElementById('user-photo-url');

var $img = document.querySelector('img');
$photoURL.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  $img.setAttribute('src', $photoURL.value);
}
