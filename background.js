//this is plain javascript running in the background

//function called when the user clicks on the browser action (if specified) 
chrome.browserAction.onClicked.addListener(function(tab) {
  
  /*
  logs a message on the console and executes a piece of code (pops up a message)
  NOTE: this is not visible in the console of active tab because it's related to the
  background page. If you want to inspect it you have to go to:
  window > extensions > click developer mode on the top right
  and on the current extension toggle "Inspect views background page"
  */
  console.log('The users clicked on the extension button');
  
  //open annoying popup
  alert("The user clicked!");
    
});
