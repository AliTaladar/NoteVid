// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb6pxh4V5mto7jSyRkpCdv5Q5eWumBCPo",
    authDomain: "test-firebase-6d7ae.firebaseapp.com",
    databaseURL: "https://test-firebase-6d7ae-default-rtdb.firebaseio.com",
    projectId: "test-firebase-6d7ae",
    storageBucket: "test-firebase-6d7ae.appspot.com",
    messagingSenderId: "633611342041",
    appId: "1:633611342041:web:38a051f622f75372b1eec8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Set database variable
  var database = firebase.database()
  
  function save() { // Add data to the dataset 
    var bookmarkId = document.getElementById('bookmarkId').value
    var vidId = document.getElementById('vidId').value
    var bookmarkName = document.getElementById('bookmarkName').value
    var bookmarkTime = document.getElementById('bookmarkTime').value
    var bookmarkNotes = document.getElementById('bookmarkNotes').value
    var user = document.getElementById('user').value
  
    database.ref('users/'+ user+ '/' + vidId + '/bookmarks/' + bookmarkId).set({
      bookmarkId : bookmarkId,
      vidId : vidId,
      bookmarkName : bookmarkName,
      bookmarkTime : bookmarkTime,
      bookmarkNotes : bookmarkNotes
    })
  
  }
  
  function get() { // Fetch data from the dataset 
    var bookmarkId = document.getElementById('bookmarkId').value
    var vidId = document.getElementById('vidId').value
    var  user = document.getElementById('user').value
    var bookmark_ref = database.ref('users/'+ user+ '/' + vidId + '/bookmarks/' + bookmarkId)
    bookmark_ref.on('value', function(snapshot) {
      var data = snapshot.val()
      //extract the data desired with data.vidId for example
  
      
  
    })
  
  }
  
  function update() { // Update the only values that can be updated (bookmarkName, bookmarkNotes, summary)
    var bookmarkId = document.getElementById('bookmarkId').value
    var bookmarkName = document.getElementById('bookmarkName').value
    var bookmarkNotes = document.getElementById('bookmarkNotes').value
    var summary = document.getElementById('summary').value
    var vidId = document.getElementById('vidId').value
    var user = document.getElementById('user').value

  
    var updatesN = {
      bookmarkName : bookmarkName,
      bookmarkNotes : bookmarkNotes,
    }
    var updatesSum = {
      summary : summary
    }
  
    database.ref('users/'+ user+ '/' + vidId + '/bookmarks/' + bookmarkId).update(updatesN)
    database.ref('users/'+ user+ '/' + vidId).update(updatesSum)
  
  }
  
  function remove_vid() { // Remove entire video link tree with all its bookmarks and summary
    var bookmarkId = document.getElementById('bookmarkId').value
    var vidId = document.getElementById('vidId').value
    var user = document.getElementById('user').value
  
    
    database.ref('users/' + user + '/' + vidId).remove()
  
  }
  function remove_bookmark() { // Remove a specific bookmark by its video id and bookmark id
    var bookmarkId = document.getElementById('bookmarkId').value
    var vidId = document.getElementById('vidId').value
    var user = document.getElementById('user').value

    database.ref('users/'+ user+ '/' + vidId + '/bookmarks/' + bookmarkId).remove()

    alert('deleted bookmark')

  }