/* global data */
/* exported data */
var $photoURL = document.getElementById('user-photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var entries = [];

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

// submit callback function
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
  // submit new entry will show without reloading
  $ulEntries.prepend(renderEntry(entryData));

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  return entryData;
}

$form.addEventListener('submit', handleSubmit);

// render entry & create DOM tree
var $ulEntries = document.querySelector('ul');

function renderEntry(entry) {
  var liEntry = document.createElement('li');
  liEntry.setAttribute('class', 'entry column-full ');
  $ulEntries.appendChild(liEntry);

  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'user-img column-half');
  liEntry.appendChild(divImg);

  var img = document.createElement('img');
  img.setAttribute('alt', 'user-img');
  img.setAttribute('src', entry.photo);
  divImg.appendChild(img);

  var divEntryContainer = document.createElement('div');
  divEntryContainer.setAttribute('class', 'entry-text-container column-half');
  liEntry.appendChild(divEntryContainer);

  var divTitle = document.createElement('div');
  divTitle.setAttribute('class', 'user-title');
  divEntryContainer.appendChild(divTitle);

  var heading3 = document.createElement('h3');
  heading3.textContent = entry.title;
  divTitle.appendChild(heading3);

  var divNotes = document.createElement('div');
  divNotes.setAttribute('class', 'user-notes');
  divEntryContainer.appendChild(divNotes);

  var paragraphNotes = document.createElement('p');
  paragraphNotes.textContent = entry.notes;
  divNotes.appendChild(paragraphNotes);

  return liEntry;

}

// append entries
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ulEntries.append(renderEntry(data.entries[i]));
  }
});

// show entry form
var $views = document.querySelectorAll('.view');
var $newButton = document.querySelector('a.new-button');
$newButton.addEventListener('click', handleEntryFormView);

function handleEntryFormView(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

// show entries page
var $saveButton = document.querySelector('button.save');

$saveButton.addEventListener('click', handleEntriesView);

function handleEntriesView(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entries') {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

var $noEntriesMsg = document.querySelector('p.center');
if (data.entries.length >= 1) {
  $noEntriesMsg.classList = 'center hidden';
}
