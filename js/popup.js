$(document).ready(function () {
    //启动任务
    $("#startAction").click(function () {

        var query = { active: true, currentWindow: true };
        chrome.tabs.query(query, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: 'js/task2.js'});
            // chrome.tabs.sendMessage(tabs[0].id, "startAction", function (response){
            //     console.log(response);
            //     $("#result").append(response.farewell);
            //     // $("#result").append(JSON.stringify(response));
            // });
        });
    });
})
