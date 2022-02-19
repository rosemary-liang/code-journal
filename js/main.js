/* global data */
/* exported data */
var $photoURL = document.getElementById('user-photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ulEntries = document.querySelector('ul');
var $saveButton = document.querySelector('button.save');
var $deleteButton = document.querySelector('#delete-button');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

var $noEntriesMsg = document.querySelector('p.center');

function hideNoEntriesMsg(event) {
  if (data.entries.length >= 1) {
    $noEntriesMsg.classList = 'center hidden';
  } else {
    $noEntriesMsg.classList = 'center';
  }
}

hideNoEntriesMsg();

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
  resetForm();
}

function resetForm(event) {
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
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
$newButton.addEventListener('click', saveButtonRight);

function handleEntryFormView(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

function saveButtonRight(event) {
  var $changeButtonClass = document.querySelector('#change-button-class');
  $changeButtonClass.className = 'input-container column-full button-flex-end';
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
  var $formHeader = document.getElementById('form-header');
  $formHeader.innerText = 'Edit Entry';

  function buttonSpaceBetween(event) {
    var $changeButtonClass = document.querySelector('#change-button-class');
    $changeButtonClass.className = 'input-container column-full button-space-between';
  }

  buttonSpaceBetween();

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
        $img.setAttribute('src', $photoURL.value);
      }
    }
    // edit entry, access delete button
    $deleteButton.className = 'delete';
    return data.editing;
  }
}

// delete entry modal
var $modal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.modal-cancel');
var $confirmButton = document.querySelector('.modal-confirm');

function openModal(event) {
  $modal.className = 'modal modal-on';

}

function closeModal(event) {
  $modal.className = 'modal modal-off';

}

function deleteEntry(event) {
  var $lis = document.querySelectorAll('.entry');

  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i]) {
      data.entries.splice(i, 1);
    }
  }

  for (var j = 0; j < $lis.length; j++) {
    if (data.editing.entryId === parseInt($lis[j].getAttribute('data-entry-id'))) {
      $lis[j].remove();
    }
  }

  data.editing = null;
  closeModal();
  resetForm();
  handleEntriesView();
  hideNoEntriesMsg();
}

$deleteButton.addEventListener('click', openModal);
$cancelButton.addEventListener('click', closeModal);
$confirmButton.addEventListener('click', deleteEntry);
