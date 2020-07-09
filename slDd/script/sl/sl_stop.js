//单位下拉列表
function list(ip, org) {
    var orgid = '0';
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    if (org.changname != '' && org.changname != undefined && org.changname != null) {
        orgid = org.changid;
        onelist(ip, orgid);
    } else {
        if (org.kuangname != '' && org.kuangname != undefined && org.kuangname != null) {
            orgid = org.kuangid;
            var html = "<option value=\"" + org.kuangid + "\">" + org.kuangname + "</option>";
            $api.html(selectorgtwo, html);
            selectorgtwoChange(ip);
        } else {
            if (org.duiname != '' && org.duiname != undefined && org.duiname != null) {
                orgid = org.duiid;
                var html1 = "<option value='" + org.duiid + "'>" + org.duiname + "</option>";
                $api.html(selectorgthree, html1);
            }
        }
    }
}

function onelist(ip, orgid) {
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    var select = document.getElementById('select');
    loadAnimation_show();
    var show = 0;
    show++;

    api.ajax({
        url: 'http://' + ip + '/home/getorgtwo',
        method: 'post',
        data: {
            values: {
                changid: orgid,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function (ret, err) {
        //console.log(JSON.stringify(ret));
        if (ret) {
            var html = "";
            var data = eval(ret);
            for (var i = 0; i < data.length; i++) {
                html += "<option value=\"" + data[i].orgtwoid + "\">" + data[i].orgtwoname + "</option>";
            }
            $api.html(selectorgtwo, html);
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



function selectorgtwoChange(ip) {

    //选择一级列表
    var val = $api.val(selectorgtwo);
    loadAnimation_show();
    var show = 0;
    show++;
    api.ajax({
        url: 'http://' + ip + '/home/getorgthree',
        method: 'post',
        data: {
            values: {
                kuangid: val,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function (ret, err) {
        if (ret) {
            // console.log(JSON.stringify(ret));
            var html = "";
            var data = eval(ret);
            for (var i = 0; i < data.length; i++) {
                html += "<option value='" + data[i].orgthreeid + "'>" + data[i].orgthreename + "</option>";
            }
            $api.html(selectorgthree, html);
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
        } else {
            toast();
        }
    });
};



function load(ip, org) {
    var stopwell = document.getElementById('stopwell');
    var select = document.getElementById('select');
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    var page = 1;
    var size = 5;
    var total = 0;
    var cou = 0;

    //点查询刷新停井列表
    $api.addEvt(select, 'click', function () {
        var father = document.getElementById('father');
        $api.html(father, '<li id="stopwell"></li>');

        page = 1;
        var valtwo = selectorgtwo.value;
        var valthree = selectorgthree.value;
        //var valthree = selectorgthree.text;
        if (valthree == '' || valthree == undefined || valthree == null) {

        }
        loadAnimation_show();
        var show = 0;
        show++;
        // console.log(JSON.stringify(org.changid));
        // console.log(JSON.stringify(valtwo));
        // console.log(JSON.stringify(valthree));
        // console.log(JSON.stringify(page));
        // console.log(JSON.stringify($('#jhname').val()==''?size:500));
        // console.log(JSON.stringify(Datenow()));

        api.ajax({
            url: 'http://' + ip + '/home/get_StopWellInfo',
            method: 'post',
            data: {
                values: {
                    orgoneid: org.changid,
                    orgtwoid: valtwo,
                    orgthreeid: valthree,
                    datetime: Datenow(),
                    page: page,
                    size: size,
                    random: Math.random()
                },
                files: {
                    fileName: 'filePath'
                }
            }
        }, function (ret, err) {
            if (ret) {

                var stopwell = document.getElementById('stopwell');
                var data = eval(ret);
                var html = [];
                // 测试
                for (var i = 0; i < data.length; i++) {
                    // if($('#jhname').val()!=''&& data[i].wellnum.indexOf($('#jhname').val())==-1)
                    // continue;
                    if (data[i].gaochan == "1") {
                        html += "<li><div id='li" + i + "' class='close_menu' onclick='click(this)'><span></span><a>" + data[i].wellnum +
                            "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                            "<ul><li class='second-li'>最后通信时间：</li><li class='second-li' style='padding-left:1em;'>" + data[i].stoptime + "</li>" +
                            "<li class='second-li second-td'>" + data[i].state + "</li></ul></li><li></li>";
                    } else {
                        html += "<li><div id='li" + i + "' class='close_menu' onclick='click(this)'><span></span><a>" + data[i].wellnum +
                            "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a></div>" +
                            "<ul><li class='second-li'>最后通信时间：</li><li class='second-li' style='padding-left:1em;'>" + data[i].stoptime + "</li>" +
                            "<li class='second-li second-td'>" + data[i].state + "</li></ul></li><li></li>";
                    }



                    total = data[i].total;
                }
          
                page++;
                cou = total - size;
                $api.before(stopwell, html);
                show--;
                if (show == 0) {
                    loadAnimation_hide();
                }

            } else {
                show--;
                if (show == 0) {
                    loadAnimation_hide();
                }
                //toast();
            }
        });

    });

    // $api.addEvt(qkjh, 'click', function() {
    //   $('#jhname').val("");
    // });


    api.addEventListener({
        name: 'swipeup',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function (ret, err) {
        if (page > 1) {
            var selectorgtwo = document.getElementById('selectorgtwo');
            var selectorgthree = document.getElementById('selectorgthree');
            var valtwo = selectorgtwo.value;
            var valthree = selectorgthree.value;
            //if (page * size < total && size < total) {
            if (cou > 0) {

                loadAnimation_show();
                var show = 0;
                show++;
                api.ajax({
                    url: 'http://' + ip + '/home/get_StopWellInfo',
                    method: 'post',
                    data: {
                        values: {
                            orgoneid: org.changid,
                            orgtwoid: valtwo,
                            orgthreeid: valthree,
                            datetime: Datenow(),
                            page: page,
                            size: size,
                            random: Math.random()
                        },
                        files: {
                            fileName: 'filePath'
                        }
                    }
                }, function (ret, err) {
                    if (ret) {
                        var stopwell = document.getElementById('stopwell');
                        var data = eval(ret);
                        var html = "";
                        for (var i = 0; i < data.length; i++) {
                            // if($('#jhname').val()!=''&& data[i].wellnum.indexOf($('#jhname').val())==-1)
                            // continue;
                            if (data[i].gaochan == "1") {
                                html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                    "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                                    "<ul><li class='second-li'>最后通信时间：</li><li class='second-li' style='padding-left:1em;'>" + data[i].stoptime + "</li>" +
                                    "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                            } else {
                                html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                    "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                                    "<ul><li class='second-li'>最后通信时间：</li><li class='second-li' style='padding-left:1em;'>" + data[i].stoptime + "</li>" +
                                    "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                            }


                            total = data[i].total;
                        }
                        page++;
                        cou -= size;
                        $api.before(stopwell, html);
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

            } else {
                api.toast({
                    msg: '数据全部加载完毕',
                    duration: 2000,
                    location: 'middle'
                });
            }
        }
    });

}
