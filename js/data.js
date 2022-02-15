/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('code-journal');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {
  var entriesJSON = JSON.stringify(data);
  this.localStorage.setItem('code-journal', entriesJSON);
});
