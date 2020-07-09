function load(org) {

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
    var datetime = document.getElementById('date');
    var valdatetime = datetime.value;

    getdata(org, valdatetime);






    /*api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function(ret, err) {
        recordIndex += 20;
        loadAnimation_show();

        show++
        api.ajax({
            url: getURL(org) + '&recordIndex=' + recordIndex,
            method: 'post',
            dataType: 'text',
            data: {
                values: {
                    random: Math.random()
                },
                files: {
                    fileName: 'filePath'
                }
            }
        }, function(ret, err) {
            if (ret) {
                var data = JSON.parse(ret);
                data = JSON.parse(data);
                var ddlist = document.getElementById('ddlist');
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var des = data[i].description.split(',');
                    html += '<li><div style="height: 150px;width: 97%">' +
                        '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        data[i].describe +
                        '</div>' +
                        '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        data[i].catalogText +
                        '</div>' +
                        '<div style="height: 90px;width: 97%;float: left;border: 0.1px solid #99CCFF;text-align: center;">' +
                        '<div style="height: 90px;width: 30%;float: left;">' +
                        '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        des[0] +
                        '</div>' +
                        '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        des[1] +
                        '</div>' +
                        '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        des[2] +
                        '</div>' +
                        '</div>' +
                        '<div style="height: 90px;width: 70%;float:  left;">' +
                        '<div style="height:45px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center; ">' +
                        data[i].startTime +
                        '</div>' +
                        '<div style="height: 45px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                        data[i].endTime +
                        '</div>' +
                        '</div>' +
                        '</div></li><p style="height:20px"></p>';
                }
                $api.html(ddlist, html);
                show--;
                if (show == 0) {
                    loadAnimation_hide();
                }

            } else {
              show--;
              if (show == 0) {
                  loadAnimation_hide();
              }

            }
        });
    });*/

    var select = document.getElementById('select');
    $api.addEvt(select, 'click', function () {
        var datetime = document.getElementById('date');
        var valdatetime = datetime.value;

        getdata(org, valdatetime);

    });
}



function getdata(orgname, valdatetime) {
    var show = 0;
    loadAnimation_show();

    // console.log(JSON.stringify(orgname));
    // console.log(JSON.stringify())
    show++
    api.ajax({
            url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
            method: "get",
            dataType: "json",
            // async: false,
            data: {
                values: {
                    userName: orgname
                },
                files: {
                    fileName: 'filePath'
                }
            }
        }, function (data) {

            var a = eval(data);
            //alert(JSON.stringify(a.Data[0].treeType));
            var b = a.Data[0].children;

            var wellname = new Array();
            var wellid = new Array();
            //b.length
            var dev = new Array();
            var shu = new Array();
            for (var y = 0; y < b.length; y++) {
                if (b[y].children != null) {

                    var wellname1 = new Array();
                    var wellid1 = new Array();
                    var wells = 0;
                    if (a.Data[0].treeType == 'sub') {
                        wellid.push(b[y].treeId);
                        //alert(JSON.stringify(b[y].treeName));
                        wellname.push(b[y].treeName);
                        dev.push(b[y].treeName);
                        shu.push(0);
                    } else {
                        for (var x = 0; x < b[y].children[0].children.length; x++) {
                            wellid1.push(b[y].children[0].children[x].treeId);
                            wellname1.push(b[y].children[0].children[x].treeName);
                            wells += 1;
                            wellid.push(b[y].children[0].children[x].treeId);
                            wellname.push(b[y].children[0].children[x].treeName);
                        }
                        //alert(b[y].treeName)
                        dev.push(b[y].treeName);
                        var dd1 = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + valdatetime + '~' + valdatetime + '&name=' + wellname1 + '&id=' + wellid1;
                        //alert(dd1);
                        $.ajax({
                            url: dd1,
                            type: "get",
                            async: false,
                            dataType: "json",
                            data: { //userName: orgname
                            },
                            contentType: "application/x-www-form-urlencoded",
                            success: function (data) {
                                if (data) {
                                    var ret1 = eval(data);
                                    ret1 = eval(ret1);
                                    //alert(ret1);
                                    shu.push(ret1.length);
                                } else {

                                }
                            }

                        });
                    }
                    wellid1.length = 0;
                    wellname1.length = 0;
                }
            }
            wellid.join(',');
            wellname.join(',');
            var dd = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + valdatetime + '~' + valdatetime + '&name=' + wellname + '&id=' + wellid;
            var org;
            api.readFile({
                path: 'widget://script/orgwell2_new.json'
            }, function (ret, err) {
                if (ret) {
                    org = jQuery.parseJSON(ret.data);
                    //alert(data);
                    var bjsa = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                    $.ajax({
                        url: dd,
                        type: "get",
                        async: false,
                        dataType: "json",
                        data: { //userName: orgname
                        },
                        contentType: "application/x-www-form-urlencoded",
                        success: function (data) {
                            if (data) {
                                var jet = JSON.parse(data);
                                console.log(JSON.stringify(jet));
                                //var bjs = document.getElementById('bjs');
                                var ddlist = document.getElementById('ddlist');
                                //$api.text(bjs, jet.length);

                                var html = "";
                                for (var i = 0; i < jet.length; i++) {
                                    var des = jet[i].description.split(',');
                                    var name = getcatalogText(jet[i].catalog);
                                    if (des[0] == undefined) {
                                        des[0] = 0;
                                    } else {
                                        if (des[0] == '0') {
                                            name = '线路异常';
                                        } else {
                                            name = getcatalogText(jet[i].catalog);
                                        }
                                        des[0] = Math.round(des[0] * 100) / 100;
                                    }
                                    if (des[1] == undefined) {
                                        des[1] = 0;
                                    } else {
                                        if (des[1] == '0') {
                                            name = '线路异常';
                                        } else {
                                            name = getcatalogText(jet[i].catalog);
                                        }
                                        des[1] = Math.round(des[1] * 100) / 100;
                                    }
                                    if (des[2] == undefined) {
                                        des[2] = 0;
                                    } else {
                                        if (des[2] == '0') {
                                            name = '线路异常';
                                        } else {
                                            name = getcatalogText(jet[i].catalog);
                                        }
                                        des[2] = Math.round(des[2] * 100) / 100;
                                    }
                                    var orgtext = "";

                                    for (var y = 0; y < org.length; y++) {
                                        if (jet[i].describe.search(org[y].name) != -1) {
                                            orgtext = org[y].children[0] + "/" + org[y].children[1];

                                        }

                                    }
                                    html += '<li><div id="' + jet[i].name + '.' + i + '" onclick=click1(this) style="border:1px solid #99ccff;margin-bottom:10px;">' +
                                        '<div style="font-size: 20px;border-bottom: 1px solid #99ccff;color: #fff;text-align: center;">' +
                                        orgtext +
                                        '</div>' +
                                        '<div  style="font-size: 20px;border-bottom: 1px solid #99ccff;color: #fff;text-align: center;">' +
                                        jet[i].describe +
                                        '</div>' +
                                        '<div style="font-size: 20px;border-bottom: 1px solid #99ccff;color: #fff;text-align: center;">' +
                                        name +
                                        '</div>' +
                                        '<div style="height: 90px;width: 100%;text-align: center;">' +
                                        '<div style="height: 90px;width: 30%;float: left;border-right:1px solid #99ccff;box-sizing: border-box;">' +
                                        '<div style="font-size: 20px;border-bottom:1px solid #99ccff;color: #fff;text-align: center;">' +
                                        des[0] +
                                        '</div>' +
                                        '<div style="font-size: 20px;border-bottom:1px solid #99ccff;color: #fff;text-align: center;">' +
                                        des[1] +
                                        '</div>' +
                                        '<div style="font-size: 20px;color: #fff;text-align: center;">' +
                                        des[2] +
                                        '</div>' +
                                        '</div>' +
                                        '<div style="height: 90px;width: 70%;float:left;">' +
                                        '<div id="start' + i + '" style="height:45px;line-height:45px;font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center; ">' +
                                        jet[i].startTime +
                                        '</div>' +
                                        '<div id="end' + i + '" style="height: 45px;line-height:45px;font-size: 20px;color: #fff;text-align: center;">' +
                                        jet[i].endTime +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div></li>';
                                }

                                $api.html(ddlist, html);
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
                        }
                    });
                }
            });


        }
        //data: { userName: 'cy7oil' },
        // contentType: "application/x-www-form-urlencoded",

    );
}

// function getdata(orgname, valdatetime) {
//     var show = 0;
//     loadAnimation_show();


//     show++
//     $.ajax({
//         url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
//         type: "get",
//         dataType: "json",
//         async: false,
//         data: {
//             userName: orgname
//         },
//         //data: { userName: 'cy7oil' },
//         contentType: "application/x-www-form-urlencoded",
//         success: function(data) {
//             var a = eval(data);
//             //alert(JSON.stringify(a.Data[0].treeType));
//             var b = a.Data[0].children;

//             var wellname = new Array();
//             var wellid = new Array();
//             //b.length
//             var dev = new Array();
//             var shu = new Array();
//             for (var y = 0; y < b.length; y++) {

//                 var wellname1 = new Array();
//                 var wellid1 = new Array();
//                 var wells = 0;
//                 if (a.Data[0].treeType == 'sub') {
//                     wellid.push(b[y].treeId);
//                     //alert(JSON.stringify(b[y].treeName));
//                     wellname.push(b[y].treeName);
//                     dev.push(b[y].treeName);
//                     shu.push(0);
//                 } else {
//                     for (var x = 0; x < b[y].children[0].children.length; x++) {
//                         wellid1.push(b[y].children[0].children[x].treeId);
//                         wellname1.push(b[y].children[0].children[x].treeName);
//                         wells += 1;
//                         wellid.push(b[y].children[0].children[x].treeId);
//                         wellname.push(b[y].children[0].children[x].treeName);
//                     }
//                     //alert(b[y].treeName)
//                     dev.push(b[y].treeName);
//                     var dd1 = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + valdatetime + '~' + valdatetime + '&name=' + wellname1 + '&id=' + wellid1;
//                     //alert(dd1);
//                     $.ajax({
//                         url: dd1,
//                         type: "get",
//                         async: false,
//                         dataType: "json",
//                         data: { //userName: orgname
//                         },
//                         contentType: "application/x-www-form-urlencoded",
//                         success: function(data) {
//                             if (data) {
//                                 var ret1 = eval(data);
//                                 ret1 = eval(ret1);
//                                 //alert(ret1);
//                                 shu.push(ret1.length);
//                             } else {

//                             }
//                         }

//                     });
//                 }
//                 wellid1.length = 0;
//                 wellname1.length = 0;

//             }
//             wellid.join(',');
//             wellname.join(',');
//             var dd = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + valdatetime + '~' + valdatetime + '&name=' + wellname + '&id=' + wellid;
//             //lert(dd);
//             var org;
//             api.readFile({
//                 path: 'widget://script/orgwell2.json'
//             }, function(ret, err) {
//                 if (ret) {
//                     org = jQuery.parseJSON(ret.data);
//                     //alert(data);


//                     var bjsa = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
//                     $.ajax({
//                         url: dd,
//                         type: "get",
//                         async: false,
//                         dataType: "json",
//                         data: { //userName: orgname
//                         },
//                         contentType: "application/x-www-form-urlencoded",
//                         success: function(data) {
//                             if (data) {
//                                 var jet = JSON.parse(data);

//                                 //var bjs = document.getElementById('bjs');
//                                 var ddlist = document.getElementById('ddlist');
//                                 //$api.text(bjs, jet.length);

//                                 var html = "";
//                                 for (var i = 0; i < jet.length; i++) {
//                                     var des = jet[i].description.split(',');
//                                     var name = getcatalogText(jet[i].catalog);
//                                     if (des[0] == undefined) {
//                                         des[0] = 0;
//                                     } else {
//                                         if (des[0] == '0') {
//                                             name = '线路异常';
//                                         } else {
//                                             name = getcatalogText(jet[i].catalog);
//                                         }
//                                         des[0] = Math.round(des[0] * 100) / 100;
//                                     }
//                                     if (des[1] == undefined) {
//                                         des[1] = 0;
//                                     } else {
//                                         if (des[1] == '0') {
//                                             name = '线路异常';
//                                         } else {
//                                             name = getcatalogText(jet[i].catalog);
//                                         }
//                                         des[1] = Math.round(des[1] * 100) / 100;
//                                     }
//                                     if (des[2] == undefined) {
//                                         des[2] = 0;
//                                     } else {
//                                         if (des[2] == '0') {
//                                             name = '线路异常';
//                                         } else {
//                                             name = getcatalogText(jet[i].catalog);
//                                         }
//                                         des[2] = Math.round(des[2] * 100) / 100;
//                                     }
//                                     var orgtext = "";

//                                     for (var y = 0; y < org.length; y++) {
//                                         if (jet[i].describe.search(org[y].name) != -1) {
//                                             orgtext = org[y].children[0] + "/" + org[y].children[1];

//                                         }

//                                     }
//                                     html += '<li><div id="' + jet[i].name + '.' + i + '" onclick=click1(this) style="height: 180px;width: 97%">' +
//                                         '<div  style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         orgtext +
//                                         '</div>' +
//                                         '<div  style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         jet[i].describe +
//                                         '</div>' +
//                                         '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         name +
//                                         '</div>' +
//                                         '<div style="height: 90px;width: 97%;float: left;border: 0.1px solid #99CCFF;text-align: center;">' +
//                                         '<div style="height: 90px;width: 30%;float: left;">' +
//                                         '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         des[0] +
//                                         '</div>' +
//                                         '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         des[1] +
//                                         '</div>' +
//                                         '<div style="height: 30px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         des[2] +
//                                         '</div>' +
//                                         '</div>' +
//                                         '<div style="height: 90px;width: 70%;float:  left;">' +
//                                         '<div id="start' + i + '" style="height:45px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center; ">' +
//                                         jet[i].startTime +
//                                         '</div>' +
//                                         '<div id="end' + i + '" style="height: 45px;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                                         jet[i].endTime +
//                                         '</div>' +
//                                         '</div>' +
//                                         '</div></li><p style="height:20px"></p>';
//                                 }

//                                 $api.html(ddlist, html);
//                                 show--;
//                                 if (show == 0) {
//                                     loadAnimation_hide();
//                                 }


//                             } else {
//                                 show--;
//                                 if (show == 0) {
//                                     loadAnimation_hide();
//                                 }
//                                 toast();

//                             }
//                         }
//                     });
//                 }
//             });

//         }
//     });
// }

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

function getURL(org) {
    var now = new Date();
    var time = addDate(now, 0);
    var subid = "";
    var devid = "";
    var devname = "";

    var connection = 'http://iot.zhdk.net:9000/';
    //wap/getWarning?userName=''&minTime=2018-11-21&maxTime=2018-11-21&
    var jsonUrl = connection + 'wap/getWarning?userName=' + org + '&minTime=' + time + '&maxTime=' + time;

    return jsonUrl;
}