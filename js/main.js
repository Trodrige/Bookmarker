// Listen to form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
// Get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

if (!validateForm(siteName, siteUrl)) {
  return false;
}

var bookmark = {
  name: siteName,
  url: siteUrl
};

// Test if bookmark is null
if (localStorage.getItem('bookmarks') === null) {
  // Init array
  var bookmarks = [];
  // add to array
  bookmarks.push(bookmark);
  // Add to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
else {
  // Get the content of localStorage
  var bookmarks1 = JSON.parse(localStorage.getItem('bookmarks'));
  // convert it to JSON
  // add the new bookmarks
  bookmarks1.push(bookmark);
  // Send it back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks1));
}

// clear the form
document.getElementById('myForm').reset();

// Re-fetch bookmarks
fetchBookmarks();

// Prevent form from submitting
e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
  // Get localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // find the url to be deleted
  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }

  // Re-send bookmarks to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  // Get all in localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="jumbotron" style="text-align:left;padding:5px 5px 5px 5px;">' +
                                  '<h3>'+name+
                                  '<a style="float:right" target="_blank" href="'+url+'">Visit</a>' +
                                  '<a onclick="deleteBookmark(\''+url+'\')" style="float:right; color:red; margin-right:10px" target="_blank" href="#">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
  }
}

function validateForm(siteName, siteUrl) {

  if (!siteUrl || !siteName) {
    alert("Please fill the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid url");
    return false;
  }

  return true;
}
