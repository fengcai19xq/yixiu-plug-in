chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method){
        case "startAction":

            // sendResponse(Page.availables);
            break;
        case "enableStyle":
            Page.changeEnabled(request.id, true);
            Page.updateStyles(Page.availables);
            sendResponse(Page.availables);
            break;
        case "disableStyle":
            Page.changeEnabled(request.id, false);
            Page.updateStyles(Page.availables);
            sendResponse(Page.availables);
            break;
    }
    return true;
});
