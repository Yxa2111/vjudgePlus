// ==UserScript==
// @name         vjudgeplus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yxa2111
// @match        https://*.vjudge.net/status*
// @match        https://*.vjudge.net/user/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js
// ==/UserScript==
window.dataList = new Map;
window.dataCnt = 0;

window.loadChart = function loadChart() {
    dataList.clear();
    $('div#chart').empty();
    dataCnt = 0;
    var ajaxQ = {
        url: basePath + "/status/data/",
        type: "POST",
        data: "draw=7&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=8&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=9&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=20&length=20&search%5Bvalue%5D=&search%5Bregex%5D=false&un=&OJId=All&probNum=&res=1&language=&onlyFollowee=true",
    };
    function createAjaxQ(index) {
        index *= 20;
        var data = "draw=7&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=8&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=9&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=";
        data += index.toString();
        data += "&length=20&search%5Bvalue%5D=&search%5Bregex%5D=false&"
        var defArg = "un=&OJId=All&probNum=&res=1&language=&onlyFollowee=true";
        var arg;
        if(document.location.toString().indexOf("vjudge.net/status") != -1)
           arg = document.location.toString().split('#')[1];
        else
            arg = $('[title="Overall solved"]').attr('href').split('#')[1];
        data += arg;
        return {
            url: basePath + "/status/data/",
            type: "POST",
            data: data,
            async: true,
            complete: function (e) {
                let data = e.responseJSON.data;
                //console.log(data)
                // function getWeek(dt){
                //     let d1 = new Date(dt);
                //     let d2 = new Date(dt);
                //     d2.setMonth(0);
                //     d2.setDate(1);
                //     let rq = d1-d2;
                //     let days = Math.ceil(rq/(24*60*60*1000));
                //     let num = Math.ceil(days/7);
                //     return num;
                // }

                for (var i = 0; i < data.length; ++i) {
                    var d = ((d)=>{
                        //var nxtday = d.getDay();
                        if(data[i].time == 1556392264000)
                            console.log(d);
                        var fixed = (7 - d.getDay()) % 7;
                        console.log(d.getDay());
                        var nxtday = new Date(d.getTime() + fixed * 24 * 60 * 60 * 1000);
                        if(nxtday.getTime() > (new Date).getTime())
                            nxtday = (new Date).getTime();
                        d.setTime(nxtday);

                        return d;
                    })(new Date(data[i].time));
                    //d = d.getFullYear().toString() + " W" + getWeek(d);
                    d = d.toLocaleString().split(' ')[0];
                    if(d == '2019-04-27')
                        console.log(d);
                    if (dataList.get(d) == undefined) {
                        dataList.set(d, new Map([[data[i].userName, 1]]));
                    }
                    else if (dataList.get(d).has(data[i].userName) == false) {
                        dataList.get(d).set(data[i].userName, 1)
                    }
                    else dataList.get(d).set(data[i].userName, dataList.get(d).get(data[i].userName) + 1);
                }
                dataCnt = dataCnt + 1;
                console.log(dataCnt);
            }
        }
    }
    for (var i = 0; i <= 30; ++i) {
        $.ajax(createAjaxQ(i));
    }

    var wait = timeoutms => new Promise((r, j) => {
        var check = () => {
            console.warn('checking')
            if (dataCnt == 31) {
                r()
            }
            else if ((timeoutms -= 100) < 0)
                j('timed out!')
            else
                setTimeout(check, 100)
        }
        setTimeout(check, 100)
    });

    (async () => {

        await wait(20000); console.warn('done'); (() => {
            var days = new Array;
            var users = new Set;
            var Ymax = 0;
            for (var [day, user] of dataList) {
                days.push({ time: day });
                var back = days.length - 1;
                for (var [name, dataCnt] of user) {
                    days[back][name] = dataCnt;
                    users.add(name)
                    if (dataCnt > Ymax) Ymax = dataCnt;
                }
            }
           days.sort((a,b)=>{
                a = new Date(a.time);
                b = new Date(b.time);
                if(a.getTime() == b.getTime()) return 0;
                if(a.getTime() < b.getTime()) return -1;
                return 1;
            });
            console.log(days);

            new Morris.Bar({
                element: "chart",
                data: days,
                xkey: "time",
                ykeys: [...users],
                labels: [...users],
                xLabels: "week",
                ymax: 'auto',
                BarColors: [ "#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000","#A05ABE" ],
                //lineWidth: 3,
                //pointSize: 4,
                hideHover: true,
                parseTime: false
            });

        })();
    })()
}

function run() {
    'use strict';

    // Your code here...
    $("<link>")
        .attr({
            rel: "stylesheet",
            type: "text/css",
            href: 'https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css'
        })
        .appendTo("head");
    $('div#right-panel').prepend($('<div id="chart"></div>'));

    $('div.container div.row.card').before( $('<div id="chart"></div>'));
    var load, execute, loadAndExecute; load = function (a, b, c) { var d; d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d); return d }, execute = function (a) { var b, c; typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c); return c }, loadAndExecute = function (a, b) { return load(a, function () { return execute(b) }) };
    load('https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
    loadAndExecute('https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js', function () {
        $('table#listStatus tbody').ready(loadChart);
        $('a.list-group-item').click(loadChart);
        $("[src='/static/images/find_me.png']").click(loadChart);
    });
}
run();