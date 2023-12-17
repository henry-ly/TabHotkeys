let previousTabs = new Array();
chrome.tabs.onActivated.addListener(moveToFirstPosition);

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  if(command == "clear_tabs"){
  console.log(+previousTabs);
  previousTabs.forEach(element => {
    chrome.tabs.remove(element);
  });
  }


  });

async function moveToFirstPosition(activeInfo) {
  try {
    previousTabs.push(activeInfo.tabId);

//    await chrome.tabs.move(activeInfo.tabId, {index: 0});

    console.log(previousTabs);
    console.log("Success.");

  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}
