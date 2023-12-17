let previousTabs = new Array();
chrome.tabs.onActivated.addListener(storeTabs);

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  switch(command){
      case "clear_tabs":
        previousTabs.forEach(element => {
          chrome.tabs.remove(element);
        arrayRemove(previousTabs, element);
        });
        break;
    case "remove_previous":
      chrome.tabs.remove(previousTabs[previousTabs.length-2]);
      arrayRemove(previousTabs, previousTabs[previousTabs.length-2]);
      break;
    case "remove_first":
      chrome.tabs.remove(previousTabs[0]);
      previousTabs.splice(0, 1);
      break;
    case "remove_last":
      chrome.tabs.remove(previousTabs[previousTabs.length-1]);
      previousTabs.pop();
      break;
  }

});

function arrayRemove(arr, value) {
  return arr.filter(function (matchValue) {
      return matchValue == value;
  });
}

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
