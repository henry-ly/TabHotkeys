let previousTabs = new Array();
chrome.tabs.onActivated.addListener(storeTabs);

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  if(command == "clear_tabs"){
  console.log(+previousTabs);
  previousTabs.forEach(element => {
    chrome.tabs.remove(element);
  });
  }
  else if(command == "remove_previous"){
    chrome.tabs.remove(previousTabs[previousTabs.length-2])
  }

});

async function storeTabs(activeInfo) {
  try {
    previousTabs.push(activeInfo.tabId);
    console.log(previousTabs);
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => storeTabs(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}
