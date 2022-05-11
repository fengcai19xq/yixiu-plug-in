$(document).ready(function () {
    //启动任务
    $("#startAction").click(function () {
        var query = { active: true, currentWindow: true };
        chrome.tabs.query(query, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: 'js/task.js'});
        });
    });
})
