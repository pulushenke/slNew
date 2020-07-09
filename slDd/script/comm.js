function getip() {
    //var ip = '10.10.227.51';
    //var ip = '192.168.0.59';
    //var ip = '192.168.10.153';
    var ip = '122.156.219.184:9098';
    return ip;
}

function tuisong(username) {


    // 注册设备并绑定用户账号
    var tencentPush = api.require('tencentPush');
    var resultCallback = function(ret, err) {
        if (ret.status) {
            var notifynum = $api.getStorage('notifynum');
            if (notifynum > 0) {
                randomSwitchBtn('dd_frame', 2);
                hideAllFrame();
                openframeinstance('dd_frame', firstHeaderOffset.h, false);
                var circle = document.getElementById("circle");
                circle.style.visibility = "hidden";
                var notify = document.getElementById("notifynum");
                $api.text(notify, 0);
                $api.setStorage('notifynum', 0);
                api.cancelNotification({
                    id: -1
                });

            }
            //}
        } else {
            //alert("标签设置失败，错误码：" + err.code + "，错误信息：" + err.msg);
        }
    };
    var resultCallback1 = function(ret, err) {
        if (ret.status) {
            //if (ret.actionType == "1") {
            var notifynum = $api.getStorage('notifynum');
            //alert(notifynum);
            if (notifynum == '' || notifynum == undefined || notifynum == null || isNaN(notifynum)) {
                notifynum = 0;
            }
            notifynum++;
            //alert(notifynum);
            api.setAppIconBadge({
                badge: notifynum
            });
            var notify = document.getElementById("notifynum");
            $api.text(notify, notifynum);
            var circle = document.getElementById("circle");
            //circle.style.visibility = "visible";
            //$api.attr(circle,'visibility','visible');
            circle.style.visibility = "visible";
            $api.setStorage('notifynum', notifynum);
            //alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
            //alert("收到通知被点击的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
            //alert(ret.token+"标签设置成功，标签名：" + ret.tag);

            //}
        } else {
            //alert("标签设置失败，错误码：" + err.code + "，错误信息：" + err.msg);
        }
    };
    var param = {
        tag: username
    };
    // tencentPush.setTag(param, resultCallback);
    var params = {
        name: "notifactionClick"
    };
    var param = {
        name: "notifactionShow"
    };
    // tencentPush.setListener(params, resultCallback);
    // tencentPush.setListener(param, resultCallback1);
    // tencentPush.registerPush(resultCallback);


}

function getcatalogText(a) {
    switch (a) {
        case '1':
            return '电压不平衡';

        case '2':
            return '疑似单相盗电';

        case '3':
            return '总功率变化率过高';

        case '4':
            return '停井';

        case '5':
            return '停电报警';

        case '6':
            return '离线（停电或离线）';

        case '7':
            return '疑似三相盗电';

        case '11':
            return '限值报警(越上限或越下限)';

        case '12':
            return '变化率报警';

        case '13':
            return '遥信变位报警';

    }
}

function loadAnimation_show() {
    var loading = document.getElementById("loading");
    loading.style.visibility = "visible";
}

function loadAnimation_hide() {
    var loading = document.getElementById("loading");
    loading.style.visibility = "hidden";
}

function getslorg() {

    var username = $api.getStorage('username');
    if (username != '' && username != undefined && username != null) {
        var changname = $api.getStorage('changname');
        var kuangname = $api.getStorage('kuangname');
        var duiname = $api.getStorage('duiname');
        var changid = $api.getStorage('changid');
        var kuangid = $api.getStorage('kuangid');
        var duiid = $api.getStorage('duiid');
        var org = {
            changname: changname,
            kuangname: kuangname,
            duiname: duiname,
            changid: changid,
            kuangid: kuangid,
            duiid: duiid,
        };

        return org;
    } else {


    }
}

function getddorg() {
    var username = $api.getStorage('username');
    if (username != '' && username != undefined && username != null) {

        var org = username;
        return org;
    } else {

    }
}

function getorgname() {
    var orgname = '第七采油厂';
    return orgname;
}

function getkuangname() {
    var orgname = '全部';
    return orgname;
}

function getduiname() {
    var orgname = '全部';
    return orgname;
}

function toast() {
    api.toast({
        msg: '网络开小差了！稍后再试！',
        duration: 2000,
        location: 'middle'
    });
}

function update() {
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err) {
        if (ret) {
            var result = ret.result;
            if (result.update == true && result.closed == false) {
                var str = '新版本型号:' + result.version + ';更新提示语:' + result.updateTip + ';发布时间:' + result.time;
                api.confirm({
                    title: '有新的版本,是否下载并安装 ',
                    msg: str,
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                        if (api.systemType == "android") {
                            api.download({
                                url: result.source,
                                report: true
                            }, function(ret, err) {
                                if (ret && 0 == ret.state) { //下载进度
                                    api.toast({
                                        msg: "正在下载应用" + ret.percent + "%",
                                        duration: 2000
                                    });
                                }
                                if (ret && 1 == ret.state) { //下载完成
                                    var savePath = ret.savePath;
                                    api.installApp({
                                        appUri: savePath
                                    });
                                }
                            });
                        }
                        if (api.systemType == "ios") {
                            api.installApp({
                                appUri: result.source
                            });
                        }
                    }
                });
            } else {

            }
        }
    });
}

function updateApp() {
    var version = $api.version;
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err) {
        if (ret) {
            var result = ret.result;
            if (result.update == true && result.closed == false) {
                api.confirm({
                    title: '温馨提示',
                    msg: '有最新版本了！',
                    buttons: ['立即更新', '取消']
                }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                        fileDownload(result.source);
                    }
                });
            } else {
                api.toast({
                    msg: "已经是最新版本！当前版本：" + version,
                    duration: 2000,
                    location: 'bottom'
                });
            }
        } else {
            //api.alert({ msg: err.msg });
        };
    });
}

function fileDownload(url) {
    var i = url.lastIndexOf('/');
    var s = url.substring(i, url.length - 2) + ".apk";
    api.toast({
        msg: "开始下载！",
        duration: 2000,
        location: 'bottom'
    });
    $api.download({
        url: url,
        savePath: 'fs://' + s,
        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
            install(ret.savePath);
        } else {

        }
    });
}

function install(file) {
    $api.clearStorage();
    $api.installApp({
        appUri: 'file://' + file
    });
}

function Datenow() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1; //得到月份
    var day = now.getDate(); //得到日期
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = year + "-" + month + "-" + day;
    return val;
}

function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day;
    return val;
}

function getURL(orgname) {
    var now = new Date();
    var time = addDate(now, 0);
    var subid = "";
    var devid = "";
    var devname = "";

    var connection = 'http://iot.zhdk.net:9000/';
    //wap/getWarning?userName=''&minTime=2018-11-21&maxTime=2018-11-21&
    var jsonUrl = connection + 'wap/getWarning?userName=' + orgname + '&minTime=' + time + '&maxTime=' + time;

    return jsonUrl;
}
