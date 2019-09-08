const creds_url = chrome.runtime.getURL('creds.json');

var url;

function construct_url(json) {
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=236850&key=" 
        + json.key 
        + "&steamid="
        + json.steamid 
        + "&l=english"
}

fetch(creds_url)
    .then((response) => response.json())
    .then((json) => construct_url(json));

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryAchievements") {
      fetch(url)
          .then(response => response.json())
          .then(json => {
              console.log(json)
              sendResponse(json)
          })
          .catch(error => console.error(error))
      
        return true;  // Will respond asynchronously.
    }
  }
);
