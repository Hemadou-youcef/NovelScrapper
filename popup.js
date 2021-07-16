$(document).ready(function(){

    chrome.storage.sync.get(['lnname'], function(result) {
        if(typeof result.lnname !== 'undefined') {
            $('#lightnovelName').val(result.lnname)
        }
    });
    chrome.storage.sync.get(['min'], function(result) {
        if(typeof result.min !== 'undefined') $('#minChapter').val(result.min)
    });
    chrome.storage.sync.get(['max'], function(result) {
        if(typeof result.max !== 'undefined') $('#maxChapter').val(result.max)
    });
    chrome.storage.sync.get(['style'], function(result) {
        if(typeof result.style !== 'undefined') $('#addstyle').prop("checked" ,(result.style == true)? true: false)
    });

    $('#lightnovelName').change(function (){
        chrome.storage.sync.set({lnname: $('#lightnovelName').val()});
    })
    $('#minChapter').change(function (){
        chrome.storage.sync.set({min: $('#minChapter').val()});
    })
    $('#maxChapter').change(function (){
        chrome.storage.sync.set({max: $('#maxChapter').val()});
    })
    $('#addstyle').change(function (){
        chrome.storage.sync.set({style: ($('#addstyle').prop("checked") == true)? true: false});
    })
    $('#DownloadChapter').click(function (){
        chrome.tabs.query({currentWindow:true,active:true},function (tabs){
            chrome.tabs.sendMessage(tabs[0].id,{
                lnname: $('#lightnovelName').val(),
                min: $('#minChapter').val(),
                max: $('#maxChapter').val(),
                solo: true,
            })
        })
    })
    $('#startAccumulating').click(function (){
        var lightnovelname = $('#lightnovelName').val()
        var min = $('#minChapter').val()
        var max = $('#maxChapter').val()
        var add_style = false;
        if ($('#addstyle').is(":checked"))
        {
            add_style = true
        }

        chrome.tabs.query({currentWindow:true,active:true},function (tabs){
            chrome.tabs.sendMessage(tabs[0].id,{
                lnname: lightnovelname,
                min: min,
                max: max,
                sync: true,
                style: add_style,
                solo: false
            })
        })
    })
})