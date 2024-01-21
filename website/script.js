brutelist = Array(0);
nbbookmarks = 0;

clickable = true;
firstClick = Array(1000);

class Bookmark {
    constructor(pointer,nb,label){
        this.pointer = pointer;
        this.nb = nb;
        this.label = label;
    }
}

listBookmarks = Array(0);

function goSort(k,rev){
    console.log(k,rev);
    if (k == 0){
        listBookmarks.sort(function(a,b){
            return rev*(a.nb-b.nb);
        });
    }
    if (k == 1){
        listBookmarks.sort(function(a, b) {
            return rev*(a.label.localeCompare(b.label));
        });
    }
    addList();
}

function addList() {
    console.log("ouais");
    const container = document.getElementById("bookmarks-container");

    // Clear existing content in the container
    container.innerHTML = '';

    // Iterate through listBookmarks and append each bookmark's pointer to the container
    for (let i = 0; i < listBookmarks.length; i++) {
        container.appendChild(listBookmarks[i].pointer);
        listBookmarks[i].pointer.style.top = String(15 + 15*i) + "px";
    }
}

for (i = 0; i < 1000; i++){
    firstClick[i] = true;
}

function defile(k){
    var content = document.getElementById("bookmark-content" + String(k));
    var container = document.getElementById("bookmark" + String(k));


    // Toggle the height and visibility directly
    if (content.style.height === "0px" || content.style.height === "") {
        content.style.height = "730px";
        container.style.height = "800px";
    } else {
        content.style.height = "0px";
        container.style.height = "70px";
    }
}



function add() {  // ChatGPT wrote half of this function to save time
    nbbookmarks += 1;
    if (nbbookmarks > firstClick.length - 5){
        tmp = Array(2*firstClick.length);
        for (i = 0; i < 2*firstClick.length; i++){
            firstClick[i] = true;
        }
        firstClick += tmp;
    }
    // Create the main container
    let bookmarkDiv = document.createElement("div");
    bookmarkDiv.className = "bookmark";
    bookmarkDiv.id = "bookmark" + String(nbbookmarks);

    // Create the play button
    let playButtonDiv = document.createElement("div");
    playButtonDiv.className = "play-button";
    let playImage = document.createElement("img");
    playImage.addEventListener("click", function(currentNbBookmarks) {
        return function() {
            defile(currentNbBookmarks);
        };
    }(nbbookmarks));
    playImage.src = "images/play-button.png";
    playImage.alt = "Play";
    playImage.className = "play-image";
    playButtonDiv.appendChild(playImage);

    // Create the more dots
    let moreDiv = document.createElement("div");
    moreDiv.className = "more";
    for (let i = 1; i <= 3; i++) {
        let dotDiv = document.createElement("div");
        dotDiv.className = "dot dot" + i;
        moreDiv.appendChild(dotDiv);
    }

    // Create the invisible bookmark area with the defile function
    let invBookmarkDiv = document.createElement("div");
    invBookmarkDiv.className = "inv-bookmark";
    invBookmarkDiv.id = "inv-bookmark" + String(nbbookmarks);    
    invBookmarkDiv.addEventListener("click", function(currentNbBookmarks) {
        return function() {
            defile(currentNbBookmarks);
        };
    }(nbbookmarks));

    // Create the bookmark name
    let bookmarkName = document.createElement("h2");
    bookmarkName.className = "bookmark-name";
    bookmarkName.id = "bookmark-name" + String(nbbookmarks);
    bookmarkName.textContent = "Bookmark #" + String(nbbookmarks);
    bookmarkName.addEventListener("dblclick",function(currentNbBookmarks) {
        return function() {
            rename(currentNbBookmarks);
        };
    }(nbbookmarks))

    // Create the bookmark content
    let bookmarkContentDiv = document.createElement("div");
    bookmarkContentDiv.className = "bookmark-content";
    bookmarkContentDiv.id = "bookmark-content" + String(nbbookmarks);

    
    var youtubeContainer = document.createElement("div");

    console.log(String(bookmarkContentDiv.offsetWidth));
        // YouTube iframe code

        // Set the desired style properties
        var styles = {
            width: "63vw",    // Replace with your desired width
            height: "415px",   // Replace with your desired height
            border: "2px solid #000",  // Replace with your desired border style
            position: "absolute",
            left: "3vw",
            top: "15px",

        };

        // Create the YouTube iframe element
        var youtubeIframe = document.createElement("iframe");
        youtubeIframe.width = styles.width;
        youtubeIframe.height = styles.height;
        youtubeIframe.src = "https://www.youtube.com/embed/tgbNymZ7vqY";

        // Apply styles to the YouTube iframe
        for (var prop in styles) {
            youtubeIframe.style[prop] = styles[prop];
        }

        // Insert the YouTube iframe into the container
        youtubeContainer.appendChild(youtubeIframe);
    
    bookmarkContentDiv.appendChild(youtubeContainer);

    // Append all elements to the main container
    bookmarkDiv.appendChild(playButtonDiv);
    bookmarkDiv.appendChild(moreDiv);
    bookmarkDiv.appendChild(invBookmarkDiv);
    bookmarkDiv.appendChild(bookmarkName);
    bookmarkDiv.appendChild(bookmarkContentDiv);

    let bookmarkContainer = document.getElementById("bookmarks-container");
    bookmarkContainer.appendChild(bookmarkDiv);

    h = bookmarkContainer.offsetHeight;
    bookmarkContainer.style.height = String(h+87) + "px";
    bookmarkDiv.style.top = String(15*nbbookmarks) + "px";



    // Create the main container
    let renameContainer = document.createElement("div");
    renameContainer.className = "rename";
    renameContainer.id = "rename" + nbbookmarks;

    // Create the text input box
    let inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.className = "rename-box";
    inputBox.id = "rename-box" + nbbookmarks;
    inputBox.value = "New name";

    // Create the "Done" button
    let doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.className = "confirm-rename";
    doneButton.addEventListener("click", function(currentNbBookmarks) {
        return function() {
            renamed(currentNbBookmarks);
        };
    }(nbbookmarks));

    separator = document.createElement("div");
    bookmarkContentDiv.appendChild(separator);
    separator.className = "separator";

    // Append the input box and button to the main container
    renameContainer.appendChild(inputBox);
    renameContainer.appendChild(doneButton);


    bookmarkDiv.appendChild(renameContainer);

    let notesContent = document.createElement("div");
    notesContent.className = "notes-content";
    notesContent.id = "notes-content" + String(nbbookmarks);

    bookmarkContentDiv.appendChild(notesContent);

    let notesIcon = document.createElement("div");
    let notesImage = document.createElement("img");
    notesImage.src = "images/icon-notes.webp";
    notesImage.alt = "Notes";
    notesImage.className = "image-notes";
    notesIcon.className = "icon-notes";
    notesImage.id = "image-notes" + String(nbbookmarks);
    notesIcon.id = "icon-notes" + String(nbbookmarks);
    notesImage.addEventListener("click",function(currentNbBookmarks) {
        return function() {
            putNotes(currentNbBookmarks);
        };
    }(nbbookmarks));
    let notesText = document.createElement("p");
    notesText.innerHTML = "This is a sample of a notes section for the bookmark number " + String(nbbookmarks) + "."
    notesContent.appendChild(notesText);
    notesText.className = "textsn";

    bookmarkContentDiv.appendChild(notesIcon);

    let summaryContent = document.createElement("div");
    summaryContent.className = "summary-content";
    summaryContent.id = "summary-content" + String(nbbookmarks);

    notesIcon.appendChild(notesImage);
    bookmarkContentDiv.appendChild(summaryContent);

    let summaryIcon = document.createElement("div");
    let summaryImage = document.createElement("img");
    summaryImage.src = "images/icon-summary.png";
    summaryImage.alt = "Notes";
    summaryImage.className = "image-summary";
    summaryIcon.className = "icon-summary";
    summaryImage.id = "image-summary" + String(nbbookmarks);
    summaryIcon.id = "icon-summary" + String(nbbookmarks);
    summaryImage.addEventListener("click",function(currentNbBookmarks) {
        return function() {
            putSummary(currentNbBookmarks);
        };
    }(nbbookmarks));
    let summaryText = document.createElement("p");
    summaryText.innerHTML = "This is a sample of a summary section for the bookmark number " + String(nbbookmarks) + ".  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor id nulla id pulvinar. Proin mollis tortor vitae elit ultrices, a dapibus urna aliquam. Morbi varius suscipit felis, ac aliquet enim vehicula vitae. Morbi volutpat dignissim est, ut semper augue molestie congue. Nullam posuere libero quis metus ultricies, id luctus ex eleifend. Integer molestie nisi at elit lacinia blandit. Pellentesque nisl ex, tempor at eros sed, tempor viverra augue. Maecenas turpis magna, condimentum non rhoncus non, ullamcorper vitae dolor. Nunc vitae metus rhoncus, mollis risus varius, viverra elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque vel sapien eget justo cursus vestibulum in accumsan ligula. Quisque pulvinar est est, pharetra eleifend mauris blandit eget. Pellentesque vulputate dapibus lacus. Donec vehicula placerat mi. Proin elementum pharetra urna id rhoncus.  Quisque nec eleifend nisl, id vestibulum turpis. Nunc lectus eros, dapibus quis leo nec, faucibus varius ex. Quisque pulvinar turpis turpis, posuere blandit turpis interdum in. Fusce pulvinar massa sed velit fermentum, sed rhoncus turpis fermentum. Quisque auctor quam id magna bibendum gravida. Aliquam lacinia mauris faucibus consequat fermentum. Sed rutrum fringilla leo, at pretium felis porttitor id. Nam malesuada lobortis felis id blandit. Quisque mi purus, tempus faucibus mauris ac, ultricies molestie diam. Cras quis aliquet mauris, non pharetra tortor. Nullam feugiat felis quis ipsum sodales, nec pretium libero gravida. Ut fringilla rhoncus ante, et hendrerit nulla vehicula eget. Donec ornare sem vel lacus dapibus volutpat. Donec porta ornare leo, at scelerisque nibh suscipit eu. Sed id tincidunt mi, sed maximus nisi.   Nam id ante non orci luctus rhoncus eget at nunc. Pellentesque sit amet dictum tortor. Vestibulum pretium dignissim rutrum. Duis rhoncus facilisis arcu, sed eleifend dui viverra sagittis. Suspendisse non sagittis orci. Nullam a ligula tincidunt, malesuada nunc id, pharetra mauris. In hac habitasse platea dictumst. Curabitur non euismod felis. Duis sapien diam, vulputate nec diam nec, fringilla dapibus massa. Nunc interdum ultricies pharetra. Aliquam dui nulla, mattis nec feugiat vitae, eleifend sit amet nibh. Nullam condimentum ac sapien a porttitor. Suspendisse at accumsan est. Phasellus pharetra ullamcorper diam. Integer felis nulla, mollis vitae massa sed, pulvinar euismod enim. Integer vitae velit tincidunt, aliquet nunc eu, consectetur eros.  Sed et dolor massa. Duis varius, erat a ornare ultricies, tellus arcu viverra ligula, non ullamcorper massa ipsum in est. Mauris vel maximus metus, nec consectetur orci. Aenean in tortor auctor, euismod augue sit amet, rhoncus elit. Donec lacinia imperdiet diam quis accumsan. Aenean commodo mattis dui quis viverra. Nullam dictum venenatis venenatis. Integer fermentum feugiat nunc, sit amet egestas erat aliquam ut. Nam mattis fermentum ex sed pellentesque. Aenean ac dolor mi. Ut a leo laoreet, maximus sem quis, tempus augue. Curabitur convallis consequat ligula a laoreet. Phasellus at placerat justo. Vivamus vestibulum arcu a mi blandit, eu porttitor magna fermentum. Cras consequat metus metus, at accumsan dolor varius et.  Suspendisse ac elit sollicitudin, feugiat mi eu, dapibus risus. Nam vulputate tincidunt nulla ut mollis. Nunc velit metus, sollicitudin venenatis nulla et, fringilla sagittis augue."
    summaryContent.appendChild(summaryText);
    summaryText.className = "textsn";

    summaryIcon.appendChild(summaryImage);
    bookmarkContentDiv.appendChild(summaryIcon);

    const bookmark = new Bookmark(bookmarkDiv,nbbookmarks,"Bookmark #" + String(nbbookmarks))

    listBookmarks.push(bookmark);
    brutelist.push(bookmark);
}

function rename(k){
    label = document.getElementById("bookmark-name" + String(k));
    box = document.getElementById("rename-box" + String(k));
    inv = document.getElementById("inv-bookmark" + String(k));
    boxx = document.getElementById("rename" + String(k));
    boxx.style.display = "block";
    console.log("bookmark-name" + String(k));
    label.style.display = "none";
    box.value = "";
    box.style.display = "block";
    inv.style.pointerEvents = "none";
}

function renamed(k){
    box = document.getElementById("rename-box" + String(k));
    label = document.getElementById("bookmark-name" + String(k));
    inv = document.getElementById("inv-bookmark" + String(k));
    boxx = document.getElementById("rename" + String(k));
    if (box.value != ""){
        
        if (box.value.length >= 21){
            label.innerHTML = box.value.substring(0,18) + "...";
        }
        else{
            label.innerHTML = box.value;
        }
        brutelist[k-1].label = box.value;
    }
    label.style.display = "block";
    boxx.style.display = "none";
    inv.style.pointerEvents = "auto";
}

function sortCriss(){
    selector = document.getElementById("select");
    if (selector.value == "Most recent"){
        goSort(0,-1);
    }
    else if (selector.value == "Least recent"){
        goSort(0,1);
    }
    else if (selector.value == "A to Z"){
        goSort(1,1);
    }
    else if (selector.value == "Z to A"){
        goSort(1,-1);
    }
}

function putSummary(k){
    document.getElementById("notes-content" + String(k)).style.display = "none";
    document.getElementById("summary-content" + String(k)).style.display = "block";
    document.getElementById("icon-notes" + String(k)).style.backgroundColor = "rgb(235,235,235)";
    document.getElementById("icon-summary" + String(k)).style.backgroundColor = "rgb(200,200,200)";
    document.getElementById("image-notes" + String(k)).style.backgroundColor = "rgb(235,235,235)";
    document.getElementById("image-summary" + String(k)).style.backgroundColor = "rgb(200,200,200)";
}

function putNotes(k){
    console.log("allo",k);
    document.getElementById("notes-content" + String(k)).style.display = "block";
    document.getElementById("summary-content" + String(k)).style.display = "none";
    document.getElementById("icon-notes" + String(k)).style.backgroundColor = "rgb(200,200,200)";
    document.getElementById("icon-summary" + String(k)).style.backgroundColor = "rgb(235,235,235)";
    document.getElementById("image-notes" + String(k)).style.backgroundColor = "rgb(200,200,200)";
    document.getElementById("image-summary" + String(k)).style.backgroundColor = "rgb(235,235,235)";
}
