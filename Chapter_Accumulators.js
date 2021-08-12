$(document).ready(function(){
    var chapteracc = '<!doctype html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> ' +
        '<link href="style.css" rel="stylesheet"/> ' +
        '<title>Document</title></head><body><div id="mainContent">';

    var style = '*{font-family: changa,sans-serif;}\n' +
        'body{\n' +
        '    background-color: #16151d;\n' +
        '    /*background-image: url("wallpaper.jpg");*/\n' +
        '    background-size: 50%;\n' +
        '}\n' +
        '#mainContent{\n' +
        '    margin: auto ;\n' +
        '    width: 80%;\n' +
        '    background-color: #222222;\n' +
        '    color: white;\n' +
        '    padding: 20px;\n' +
        '    direction: rtl;\n' +
        '    font-size: 30px;\n' +
        '    font-family: chanda, sans-serif;\n' +
        '    border-radius: 10px;\n' +
        '}\n' +
        '#mainContent p,#mainContent h1,#mainContent h3,#mainContent h4,#mainContent h5,#mainContent h6{\n' +
        '    line-height: 3;\n' +
        '    font-size: 23px;\n' +
        '    color: #dfdfdf;\n' +
        '}\n' +
        '#navigation {\n' +
        '    display: flex;flex-direction: row;justify-content: space-between;\n' +
        '}\n' +
        'a{\n' +
        '    text-decoration: none;\n' +
        '}\n' +
        'button {\n' +
        '    outline: none;\n' +
        '    display: block;\n' +
        '    border: 1px solid grey;\n' +
        '    color: white;\n' +
        '    background-color: #16151d;padding: 10px;\n' +
        '    width: 200px;cursor: pointer;\n' +
        '    font-size: 20px;\n' +
        '    font-weight: bold;\n' +
        '    border-radius: 5px;\n' +
        '}\n' +
        'button:active {\n' +
        '     outline: 1px solid #bdbdd9;\n' +
        '}';

    var header = ' <!doctype html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <style>*{font-family: changa,sans-serif;}body{background-color: #afc8d7;background-image: url("wallpaper.jpg");background-size: 50%;}#mainContent{margin: auto ;width: 80%;background-color: #2d3748;color: white;padding: 20px;direction: rtl;font-size: 25px;font-family: chanda, sans-serif;border-radius: 10px;}#mainContent p{line-height: 3;}#navigation {display: flex;flex-direction: row;justify-content: space-between;}a{text-decoration: none;}button {outline: none;display: block;border: 1px solid grey;color: white;background-color: #afc8d7;padding: 10px;width: 200px;cursor: pointer;font-size: 20px;font-weight: bold;border-radius: 5px;}button:active {outline: 1px solid #bdbdd9;} </style><title>Document</title></head><body><div id="mainContent"><h2 align="center">reverend insanity</h2>';
    var footer = '</div></body></html>'

    var NotFound = []
    var lnname = ''
    var filename = ''
    var stopLoop = false
// var FirstElementSearch = '<div class="epcontent entry-content"'
// var FirstElementSearch = '<div class="text-left"'
    var ElementClassFind = 'content-story'
    var Separator = '/'
    var SubSeparator = ''
    var sitelocation = window.location.href


    var chapterLink = sitelocation.toString().split(Separator)
    if(chapterLink[chapterLink.length - 1] == ""){
        chapterLink.pop()
    }
    chapterLink.pop()
    chapterLink = chapterLink.join(Separator)


    chrome.runtime.onMessage.addListener(function (request){
        if(request.stop){
            stopLoop = true
        }else{
            stopLoop = false
            if(request.solo){
                $.get( sitelocation.toString(), function( data ) {
                    // let testHTML = $.parseHTML(data)
                    // console.log($(testHTML).find('ol.breadcrumb li:nth-child(3)').text())

                    let newdata = data.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
                    newdata = newdata.replaceAll(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
                    let testHTML = $.parseHTML(newdata)
                    newdata = $(testHTML).find('div.' + ElementClassFind).text()


                    newdata = newdata.replaceAll('<','&lt;')
                    newdata = newdata.replaceAll('>','&gt;')

                    newdata = newdata.replaceAll(/\n/g, '<br>')
                    newdata = newdata.replaceAll(/(<br>){2,}/gi, '<br>')

                    var navigation = '<div id="navigation"><a href="'+ request.lnname.split(' ').join('_') + '-' + (parseInt(request.min) - 1) +  '.html"><button>السابق</button></a><a href="' + request.lnname.split(' ').join('_') + '-' + (parseInt(request.max) + 1) +  '.html"><button>التالي</button></a></div>'
                    //
                    allcontent = chapteracc + navigation + '<h2 align="center">' + request.lnname + '</h2>' + '<p>' + 'الفصل ' + request.min +  '<p>' + '<p>' +   newdata + '</p>' + navigation + footer
                    var blob = new Blob([allcontent], { type: "text/html;charset=utf-8" });
                    saveAs(blob, request.lnname.split(' ').join('_') + '-' + request.min + ".html");


                });
            }else {
                Initialization(request)
            }
        }
    })
    function Initialization(request){
        lnname = request.lnname
        filename = lnname.split(' ').join('_') + '-'
        min = parseInt(request.min)
        max = parseInt(request.max)
        intervallValue = parseInt(request.range)
        if((isNaN(min) || isNaN(max)) || (max - min) < 0){
            console.log('Error in range')
        }else{
            console.log('light novel name: ' + lnname)
            console.log('file name: ' + filename)
            console.log('min chapter: ' + min)
            console.log('max chapter: ' + max)
            console.log('starting download...')

            if(request.style){
                var blob = new Blob([style], { type: "text/css;charset=utf-8" });
                saveAs(blob, "style.css");
            }
            sync_downloader(0)
        }
    }
    async function sync_downloader(tryNumber){
        // let nextChapter = chapterLink + Separator + SubSeparator + min
        let nextChapter = sitelocation
        let oldChapterName = '#'

        while(!stopLoop){
            try {
                await $.get(nextChapter, function( data ) {

                    let linkChecker = nextChapter.split(Separator)
                    if(linkChecker[linkChecker.length - 1] == ""){
                        linkChecker.pop()
                    }
                    linkChecker = linkChecker.pop().split('-')
                    if(linkChecker[0] == 'chapter'){
                        linkChecker.shift()
                    }
                    // linkChecker = linkChecker.join('-').split('.')
                    // linkChecker.pop()

                    console.log(linkChecker.join("-"))

                    let newdata = data.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
                    newdata = newdata.replaceAll(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
                    newdata = newdata.replaceAll('<br/>', "\n")

                    let testHTML = $.parseHTML(newdata)

                    $(testHTML).find('div.' + ElementClassFind + '>p:first-child').remove()
                    newdata = $(testHTML).find('div.' + ElementClassFind).text()
                    nextChapter = $(testHTML).find('.next_sesction >a').attr('href')
                    // console.log(newdata)
                    // console.log(nextChapter)

                    if(linkChecker.join("-") == min.toString() && linkChecker.join("-") != "1"){
                        let prevChapter = $(testHTML).find('a.pre').attr('href')
                        oldChapterName = prevChapter.split(Separator)
                        if(oldChapterName[oldChapterName.length - 1] == ""){
                            oldChapterName.pop()
                        }
                        oldChapterName = oldChapterName.pop().split('-')
                        if(oldChapterName[0] == 'chapter'){
                            oldChapterName.shift()
                        }
                        // oldChapterName = oldChapterName.join('-').split('.')
                        // oldChapterName.pop()

                        // if(oldChapterName[1] != 'chapter'){
                        //     oldChapterName.shift()
                        // }
                        // oldChapterName.shift()
                        // oldChapterName.shift()

                        oldChapterName = filename + oldChapterName.join("-") + ".html"
                    }else if(linkChecker.join("-") == min.toString()){
                        oldChapterName = '#'
                    }
                    let NextChapterName = nextChapter.split(Separator)
                    if(NextChapterName[NextChapterName.length - 1] == ""){
                        NextChapterName.pop()
                    }
                    NextChapterName = NextChapterName.pop().split('-')
                    if(NextChapterName[0] == 'chapter'){
                        NextChapterName.shift()
                    }
                    // NextChapterName = NextChapterName.join('-').split('.')
                    // NextChapterName.pop()

                    newdata = newdata.replaceAll('<','&lt;')
                    newdata = newdata.replaceAll('>','&gt;')

                    newdata = newdata.replaceAll(/\n/g, '<br>')
                    newdata = newdata.replaceAll(/(<br>){2,}/gi, '<br>')

                    // if(linkChecker[1] != 'chapter'){
                    //     linkChecker.shift()
                    // }
                    // linkChecker.shift()
                    // linkChecker.shift()
                    //
                    // if(NextChapterName[1] != 'chapter'){
                    //     NextChapterName.shift()
                    // }
                    // NextChapterName.shift()
                    // NextChapterName.shift()


                    let navigation = '<div id="navigation"><a href="' + oldChapterName +  '"><button>السابق</button></a><a href="' + filename + NextChapterName.join("-") +  '.html"><button>التالي</button></a></div>'
                    allcontent = chapteracc + navigation + '<h2 align="center">' + lnname + '</h2>' + '<p>' + 'الفصل ' + linkChecker.join("-") +  '<p>' + '<p>' + newdata + '</p>' + navigation + footer

                    let blob = new Blob([allcontent], { type: "text/html;charset=utf-8" });
                    saveAs(blob,  filename + linkChecker.join("-") + ".html");

                    oldChapterName = filename + linkChecker.join("-") + ".html"

                    if(parseInt(linkChecker[0]) >= max){
                        stopLoop = true
                    }
                });
            } catch(err) {
                // NotFound.push(i)
                // console.log('error at chapter ' + i)
                console.log(err)
                stopLoop = true
                // if(err.status != '404' && tryNumber <= 3){
                //     unsync_downloader(i,(tryNumber + 1))
                // }else {
                //     NotFound.push(i)
                //     console.log('error at chapter ' + i)
                //     console.log(err)
                // }
            }
        }
        if(NotFound.length != 0){
            var blob = new Blob([NotFound.join(',')], { type: "text/css;charset=utf-8" });
            saveAs(blob, "notfound.txt");
        }
        chrome.storage.sync.set({starting: false});
    }
})


