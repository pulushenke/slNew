

function load(ip, org) {
    //首页总数
    var duiid = org.duiid;

    if (duiid == undefined) {
        duiid = null;
    }

    loadAnimation_show();
    var show = 0;
    show++;

    //首页时率
    api.ajax({
        url: 'http://' + ip + '/home/get_StopWellInfo1',
        method: 'post',
        data: {
            values: {
                orgoneid: org.changid,
                orgtwoid: org.kuangid,
                orgthreeid: duiid,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(ret, err) {
        if (ret) {
          //  console.log(JSON.stringify(ret));
            var stopwell = document.getElementById('stopwell');
            var stopwellCount = document.getElementById('count');
            var data = eval(ret);
            var html = "";

						  $api.text(stopwellCount,"停机数：" + data.length);
            for (var i = 0; i < data.length; i++) {
                if (data[i].gaochan == "1") {
                    html += "<li ><div  class='close_menu' id='li" + i + "'  onclick=click1(this)><span></span><a>" + data[i].wellnum +
                        "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                        "<ul><li class='second-li'>" + data[i].stoptime + "</li>" +
                        "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                } else {
                    html += "<li ><div  class='close_menu' id='li" + i + "'  onclick=click1(this)><span></span><a>" + data[i].wellnum +
                        "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a></div>" +
                        "<ul><li class='second-li'>" + data[i].stoptime + "</li>" +
                        "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                }
            }
            $api.html(stopwell, html);
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
        } else {
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
            toast();
        }
    });
}
