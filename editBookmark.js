import { getActiveTabURL } from "./utils.js"

document.addEventListener('DOMContentLoaded', function () {
    let urlParams = new URLSearchParams(window.location.search);
    let time = urlParams.get("time");
    let nameStr = urlParams.get("name");
    let notes = urlParams.get("notes");
    let summary = urlParams.get("summary");
    let desc = urlParams.get("desc");

    if (nameStr) {
        document.getElementById('bookmarkName').value = nameStr;
    }

    if (notes) {
        document.getElementById('noteArea').innerHTML = notes;
    }

    if (desc) {
        document.getElementById('description').innerHTML = desc;
    }

    const playButton = document.getElementById("playButton");
    playButton.addEventListener("click", async () => {
        const activeTab = await getActiveTabURL();

        chrome.tabs.sendMessage(activeTab.id, {
            type: "PLAY",
            value: time
        })
    });

    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", async () => {
        const activeTab = await getActiveTabURL();
        chrome.tabs.sendMessage(activeTab.id, {
            type: "DELETE",
            value: time,
        });
        window.location.href = 'popup.html';
    });

    const returnButton = document.getElementById("returnButton");
    returnButton.addEventListener("click", () => {
        window.location.href = 'popup.html';
    });

    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
        nameStr = document.getElementById("bookmarkName").value;
        notes = document.getElementById("noteArea").value;
        saveModifications(time, nameStr, notes);
    });
});

const saveModifications = async (time, nameStr, notes) => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    chrome.storage.sync.get([currentVideo], (data) => {
        let currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
        for (let i = 0; i < currentVideoBookmarks.length; i++) {

            if (currentVideoBookmarks[i].time == time) {
                currentVideoBookmarks[i].name = nameStr;
                currentVideoBookmarks[i].notes = notes;
            }
            console.log(currentVideoBookmarks[i]);

            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });
        }
    });
};