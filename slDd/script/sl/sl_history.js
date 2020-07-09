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
    show++
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
}

function load(ip, org) {
    $("#date").datepicker({
        format: 'yyyy-mm-dd', //显示格式
        language: 'zh-CN', //中文
        todayBtn: true,
        todayHighlight: true,
        forceParse: false,
        startView: 0,
        showMeridian: true,
        autoclose: true,
    });
    var time = Datenow();

    $("#date").attr("value", time);

    var select = document.getElementById('select');
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    var datetime = document.getElementById('date');

    var page = 1;
    var size = 5;
    var total = 0;
    //点查询刷新停井列表
    $api.addEvt(select, 'click', function () {
        var father = document.getElementById('father');
        $api.html(father, '<li id="stopwell"></li>');

        page = 1;
        var valtwo = selectorgtwo.value;
        var valthree = selectorgthree.value;
        var valdatetime = datetime.value;
        //var valthree = selectorgthree.text;
        var state = ['关注', '取消关注'];
        // $api.addEvt(father, 'click', function (e) {
        //     var tar = e.target;
        //     alert(JSON.stringify(x));
        //     if (tar.tagName === 'BUTTON') {
        //         // console.log(tar.innerText);
        //         var x =  $api.prev(tar);
        //         console.log(JSON.stringify(x));
        //         if (tar.innerText === state[1]) {
        //             tar.innerText = state[0];
        //            $api.css(x,'display:none;')
        //         } else {
        //             tar.innerText = state[1];
        //            // $api.prev(tar);
        //            // $api.css(x,'display:inline-block;')
        //         }
        //     }
        // })
        if (valdatetime.length < 1) {
            api.toast({
                msg: '请选择日期',
                duration: 2000,
                location: 'middle'
            });
        } else {
            loadAnimation_show();
            var show = 0;
            show++;
            api.ajax({
                url: 'http://' + ip + '/home/get_StopWellInfo2',
                method: 'post',
                data: {
                    values: {
                        orgoneid: org.changid,
                        orgtwoid: valtwo,
                        orgthreeid: valthree,
                        datetime: valdatetime,
                        page: page,
                        size: size,
                        random: Math.random()
                    },
                    files: {
                        fileName: 'filePath'
                    }
                }
            }, function (ret, err) {
                // console.log(JSON.stringify(valtwo));
                // console.log(JSON.stringify(valthree));
                // console.log(JSON.stringify(valdatetime));
                // console.log(JSON.stringify(org.changid));
                // console.log(JSON.stringify(page));
                // console.log(JSON.stringify(size));
                if (ret) {
                    var stopwell = document.getElementById('stopwell');
                    var data = eval(ret);
                    var html = "";

                    for (var i = 0; i < data.length; i++) {

                        if (data[i].gaochan == "1") {
                            html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                                "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        } else {
                            html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a></div>" +
                                "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        }

                        // if (true) {
                        //     if (data[i].gaochan == "1") {
                        //         html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                        //             "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a>" +
                        //             follow(state[1]) +
                        //             "</div>" +
                        //             "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        //     } else {
                        //         html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                        //             "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a>" +
                        //             follow(state[1]) +
                        //             "</div>" +
                        //             "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        //     }
                        // } else {
                        //     if (data[i].gaochan == "1") {
                        //         html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                        //             "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a>" +
                        //             follow(state[0],'display:none;') +
                        //             "</div>" +
                        //             "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        //     } else {
                        //         html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                        //             "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a>" +
                        //             follow(state[0],'display:none;') +
                        //             "</div>" +
                        //             "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                        //     }
                        // }


                        if (data[i].state == "断电") {
                            html += "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                        } else {
                            html += "<li class='second-li second-sd'>" + data[i].state + "</li></ul></li>";
                        }

                        total = data[i].total;
                    }
                    console.log(JSON.stringify(html));
                    page++;
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
        }

    });
    api.addEventListener({
        name: 'swipeup',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function (ret, err) {
        if (page > 1) {
            var selectorgtwo = document.getElementById('selectorgtwo');
            var selectorgthree = document.getElementById('selectorgthree');
            var datetime = document.getElementById('date');
            var valtwo = selectorgtwo.value;
            var valthree = selectorgthree.value;
            var valdatetime = datetime.value;

            if (page * size > total + size) {
                api.toast({
                    msg: '数据全部加载完毕',
                    duration: 2000,
                    location: 'middle'
                });
            } else {
                loadAnimation_show();
                var show = 0;
                show++;
                api.ajax({
                    url: 'http://' + ip + '/home/get_StopWellInfo2',
                    method: 'post',
                    data: {
                        values: {
                            orgoneid: org.changid,
                            orgtwoid: valtwo,
                            orgthreeid: valthree,
                            datetime: valdatetime,
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
                            if (data[i].gaochan == "1") {
                                html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                    "【" + data[i].orgtwo + "/" + data[i].orgthree + "/G】</a></div>" +
                                    "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                            } else {
                                html += "<li><div class='close_menu'><span></span><a>" + data[i].wellnum +
                                    "【" + data[i].orgtwo + "/" + data[i].orgthree + "】</a></div>" +
                                    "<ul><li class='second-li'>" + data[i].stoptime + "</li>";
                            }
                            if (data[i].state == "断电") {
                                html += "<li class='second-li second-td'>" + data[i].state + "</li></ul></li>";
                            } else {
                                html += "<li class='second-li second-sd'>" + data[i].state + "</li></ul></li>";
                            }

                            total = data[i].total;
                        }
                        page++;

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
            }
        }
    });


}

function follow(state,iState) { //关注按钮
    return "<i class='glyphicon glyphicon-star stars' style='"+iState+"'></i>" +
        "<div class='gz'>" +
        "<button class='btn foll' type='button'>" + state + "</button>" +
        "</div>";
}
