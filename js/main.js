/* global data */
/* exported data */
var $photoURL = document.getElementById('user-photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ulEntries = document.querySelector('ul');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});
var $noEntriesMsg = document.querySelector('p.center');
if (data.entries.length >= 1) {
  $noEntriesMsg.classList = 'center hidden';
}

var $saveButton = document.querySelector('button.save');

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

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entryData);
    // submit new entry will show without reloading
    $ulEntries.prepend(renderEntry(entryData));
    $noEntriesMsg.classList = 'center hidden';

    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();

  } else if (data.editing !== null) {
    entryData.entryId = data.editing.entryId;
    data.editing = entryData;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = data.editing;
      }
    }

    var $liEntries = document.querySelectorAll('li');
    for (var j = 0; j < $liEntries.length; j++) {
      var replaceLi = $liEntries[j];
      var liEntryId = parseInt($liEntries[j].getAttribute('data-entry-id'));
      if (data.editing.entryId === liEntryId) {
        replaceLi.replaceWith(renderEntry(entryData));
      }
    }
  }
  data.editing = null;
}

$form.addEventListener('submit', handleSubmit);

// render entry & create DOM tree

function renderEntry(entry) {
  var liEntry = document.createElement('li');
  liEntry.setAttribute('class', 'entry column-full');

  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'user-img column-half column-full');
  liEntry.appendChild(divImg);

  var img = document.createElement('img');
  img.setAttribute('alt', 'user-img');
  img.setAttribute('src', entry.photo);
  divImg.appendChild(img);

  var divEntryContainer = document.createElement('div');
  divEntryContainer.setAttribute('class', 'entry-text-container column-half column-full');
  liEntry.appendChild(divEntryContainer);

  var divTitle = document.createElement('div');
  divTitle.setAttribute('class', 'user-title');
  divEntryContainer.appendChild(divTitle);

  var heading3 = document.createElement('h3');
  heading3.textContent = entry.title;
  divTitle.appendChild(heading3);

  var editButton = document.createElement('button');
  editButton.setAttribute('class', 'btn');
  divTitle.appendChild(editButton);

  var iconPencil = document.createElement('i');
  iconPencil.setAttribute('class', 'fas fa-pen');
  editButton.appendChild(iconPencil);

  var divNotes = document.createElement('div');
  divNotes.setAttribute('class', 'user-notes');
  divEntryContainer.appendChild(divNotes);

  var paragraphNotes = document.createElement('p');
  paragraphNotes.textContent = entry.notes;
  divNotes.appendChild(paragraphNotes);

  // set entryId in DOM
  var entryId = entry.entryId;
  liEntry.setAttribute('data-entry-id', entryId);
  entryId++;

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

// edit an entry
$ulEntries.addEventListener('click', handleEdit);

function handleEdit(event) {
  if (event.target.matches('button')) {
    handleEntryFormView();

    var $closestLi = event.target.closest('li.entry');
    var liEntryId = $closestLi.getAttribute('data-entry-id');
    var $title = document.querySelector('input[name="title"]');
    var $notes = document.querySelector('textarea');

    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId === parseInt(liEntryId)) {
        // assign data object to data.editing
        data.editing = data.entries[k];
        // prepopulate editing entry
        $title.value = data.editing.title;
        $photoURL.value = data.editing.photo;
        $notes.value = data.editing.notes;
      }
    }
  }
}
