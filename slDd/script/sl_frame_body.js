function load(ip, orgname) {
loadAnimation_show();
var show=0;
show++;
    api.ajax({
        url: 'http://' + ip + '/home/getchangcount1',
        method: 'post',
        data: {
            values: {
                changname: orgname,
                random:Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(ret, err) {
        if (ret) {
            var total = document.getElementById('total');
            var total1 = document.getElementById('total1');
            var open = document.getElementById('open');
            var stop = document.getElementById('stop');
            var offline = document.getElementById('offline');
            $api.text(total, ret.total);
            if (!total1 && typeof(total1) != "undefined" && total1 != 0 and isNaN(total1))
                $api.text(total1, ret.total);
            $api.text(open, ret.opencount);
            $api.text(stop, ret.stopcount);

            $api.text(offline, ret.offlinecount);
            show--;
            if(show==0)
            {
            loadAnimation_hide();
            }
        } else {
            toast();
        }
    });
    show++;
    api.ajax({
        url: 'http://' + ip + '/home/',
        method: 'post',
        data: {
            values: {
                changname: orgname,
                random:Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(ret, err) {
        if (ret) {
            var stopwell = document.getElementById('stopwell');
            var data = eval(ret);
            var html = "";
            for (var i = 0; i < ret.legend; i++) {
                html += "<li><div class='close_menu'><span></span><a>" + data.wellnum +
                    "【" + data.orgtwo + "/" + data.orgthree + "】</a></div>" +
                    "<ul><li class='second-li'>" + data.stoptime + "</li>" +
                    "<li class='second-li second-td'>" + data.state + "</li></ul></li>"
            }
            $api.html(stopwell, html);
            show--;
            if(show==0)
            {
            loadAnimation_hide();
            }
        } else {
            toast();
        }
    });
}
