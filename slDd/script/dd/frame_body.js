function load(orgname) {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1; //得到月份
    var date = now.getDate(); //得到日期
    //var date1=now.getDate()-1;
    var valdatetime = year + "-" + month + "-" + date;
    now.setDate(now.getDate() - 1);
    var startdatetime = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString();
    //var startdatetime=year+ "-" + month + "-" + date1;

    api.ajax({
            url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
            method: "get",
            dataType: "json",
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
            var wells1 = 0;
            if (a.Data.length > 0) {
                var b = a.Data[0].children;
                //alert(JSON.stringify(b));
                for (var y = 0; y < b.length; y++) {
                    if (b[y].children != null) {
                        wells1 += b[y].children[0].children.length;
                    } else {
                        wells1 = b.length;
                        break;
                    }
                }
            }
            var zjs = document.getElementById('zjs');
            $api.text(zjs, wells1);
            api.ajax({
                url: 'http://iot.zhdk.net:9000/OilForTwo/GetLast5MinuteKjslByDepartData',
                method: 'post',
                dataType: 'text',
                data: {
                    values: {
                        userName: orgname,
                        random: Math.random()
                    },
                    files: {
                        fileName: 'filePath'
                    }
                }
            }, function (ret, err) {
                if (ret) {
                    var dat = JSON.parse(ret);
                    var tj = 0;
                    var td = 0;
                    var tjs = document.getElementById('tjs');
                    var tds = document.getElementById('tds');
                    var data = eval('(' + dat + ')')
                    for (var i in data.data) {
                        if (data.data[i] == '0') {
                            tj++;

                        }
                        if (data.data[i] == '-1') {
                            td++;
                        }
                    }
                    $api.text(tds, td);
                    $api.text(tjs, tj);
                } else {

                }
            });

            api.ajax({
                    url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
                    method: "get",
                    dataType: "json",
                    //  async: false,
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

                                wellname.push(b[y].treeName);
                                dev.push(b[y].treeName);
                                shu.push(0);
                            } else {
                                //  console.log(JSON.stringify(b[y].children[0]));
                                //  if (b[y].children[0].children != null) {
                                for (var x = 0; x < b[y].children[0].children.length; x++) {
                                    wellid1.push(b[y].children[0].children[x].treeId);
                                    wellname1.push(b[y].children[0].children[x].treeName);
                                    wells += 1;
                                    wellid.push(b[y].children[0].children[x].treeId);
                                    wellname.push(b[y].children[0].children[x].treeName);
                                }
                                // }
                                dev.push(b[y].treeName);
                                var dd1 = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + startdatetime + '~' + valdatetime + '&name=' + wellname1 + '&id=' + wellid1;
                                /*$.ajax({
                                    url: dd1,
                                    type: "get",
                                    async: false,
                                    dataType: "json",
                                    data: { //userName: orgname
                                    },
                                    contentType: "application/x-www-form-urlencoded",
                                    success: function(data) {
                                        if (data) {
                                            var ret1 = eval(data);
                                            ret1 = eval(ret1);
                                            //alert(ret1);
                                            shu.push(ret1.length);
                                        } else {

                                        }
                                    }

                                });*/

                            }
                            wellid1.length = 0;
                            wellname1.length = 0;

                        }

                    }

                    var dd = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + startdatetime + '~' + valdatetime + '&name=' + (wellname.join(',')) + '&id=' + (wellid.join(','));
                    var bjsa = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                    console.log(JSON.stringify(dd));
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
                                //console.log(data);
                                var bjs = document.getElementById('bjs');
                                //alert(wells1);
                                if (wells1 != 0) {
                                    $api.text(bjs, jet.length);
                                    var list0 = new Array();
                                    var list1 = new Array();
                                    var list2 = new Array();
                                    var list = new Array();
                                    for (var i = 0; i < jet.length; i++) {
                                        switch (jet[i].catalog) {
                                            case '1':
                                                list0.push(jet[i]);
                                                break;
                                            case '2':
                                                list1.push(jet[i]);
                                                break;
                                            case '7':
                                                list1.push(jet[i]);
                                                break;
                                            case '4':
                                                list2.push(jet[i]);
                                                break;
                                        }

                                    }
                                    list.push(list0);
                                    //alert(JSON.stringify(list0));
                                    list.push(list1);
                                    //alert(JSON.stringify(list1));
                                    list.push(list2);
                                    //alert(JSON.stringify(list2));
                                    var one = document.getElementById('one');
                                    var two = document.getElementById('two');
                                    var three = document.getElementById('three');

                                    getdiv(one, list[0]);
                                    getdiv(two, list[1]);
                                    getdiv(three, list[2]);

                                    var height = Math.max(list[0].length, list[1].length, list[2].length);

                                    $(".swiper-slide").css("height", height * 200);
                                } else {

                                }
                            } else {
                                $api.text(bjs, 0);
                            }
                        }
                    });

                }


            );
        }


    );


    //     $.ajax({
    //         url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
    //         type: "get",
    //         dataType: "json",
    //         data: {
    //             userName: orgname
    //         },
    //         contentType: "application/x-www-form-urlencoded",
    //         success: function(data) {
    //             var a = eval(data);
    //             var wells1 = 0;
    //             if (a.Data.length > 0) {

    //                 var b = a.Data[0].children;
    //                 //alert(JSON.stringify(b));
    //                 for (var y = 0; y < b.length; y++) {
    //                     if (b[y].children != null) {

    //                         wells1 += b[y].children[0].children.length;
    //                     } else {
    //                         //alert(JSON.stringify(b[y]));
    //                         wells1 += b.length;
    //                     }

    //                 }
    //             }
    //             var zjs = document.getElementById('zjs');
    //             $api.text(zjs, wells1);
    //             api.ajax({
    //                 url: 'http://iot.zhdk.net:9000/OilForTwo/GetLast5MinuteKjslByDepartData',
    //                 method: 'post',
    //                 dataType: 'text',
    //                 data: {
    //                     values: {
    //                         userName: orgname,
    //                         random: Math.random()
    //                     },
    //                     files: {
    //                         fileName: 'filePath'
    //                     }
    //                 }
    //             }, function(ret, err) {
    //                 if (ret) {
    //                     var dat = JSON.parse(ret);
    //                     var tj = 0;
    //                     var td = 0;
    //                     var tjs = document.getElementById('tjs');
    //                     var tds = document.getElementById('tds');
    //                     var data = eval('(' + dat + ')')
    //                     for (var i in data.data) {
    //                         if (data.data[i] == '0') {
    //                             tj++;

    //                         }
    //                         if (data.data[i] == '-1') {
    //                             td++;
    //                         }
    //                     }
    //                     $api.text(tds, td);
    //                     $api.text(tjs, tj);
    //                 } else {

    //                 }
    //             });

    //             $.ajax({
    //                 url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
    //                 type: "get",
    //                 dataType: "json",
    //                 async: false,
    //                 data: {
    //                     userName: orgname
    //                 },
    //                 //data: { userName: 'cy7oil' },
    //                 contentType: "application/x-www-form-urlencoded",
    //                 success: function(data) {
    //                     var a = eval(data);
    //                     //alert(JSON.stringify(a.Data[0].treeType));
    //                     var b = a.Data[0].children;

    //                     var wellname = new Array();
    //                     var wellid = new Array();
    //                     //b.length
    //                     var dev = new Array();
    //                     var shu = new Array();
    //                     for (var y = 0; y < b.length; y++) {

    //                         var wellname1 = new Array();
    //                         var wellid1 = new Array();
    //                         var wells = 0;
    //                         if (a.Data[0].treeType == 'sub') {
    //                             wellid.push(b[y].treeId);
    //                             //alert(JSON.stringify(b[y].treeName));
    //                             wellname.push(b[y].treeName);
    //                             dev.push(b[y].treeName);
    //                             shu.push(0);
    //                         } else {
    //                             for (var x = 0; x < b[y].children[0].children.length; x++) {
    //                                 wellid1.push(b[y].children[0].children[x].treeId);
    //                                 wellname1.push(b[y].children[0].children[x].treeName);
    //                                 wells += 1;
    //                                 wellid.push(b[y].children[0].children[x].treeId);
    //                                 wellname.push(b[y].children[0].children[x].treeName);
    //                             }
    //                             //alert(b[y].treeName)
    //                             dev.push(b[y].treeName);
    //                             var dd1 = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + startdatetime + '~' + valdatetime + '&name=' + wellname1 + '&id=' + wellid1;
    // //alert(dd1);
    //                             $.ajax({
    //                                 url: dd1,
    //                                 type: "get",
    //                                 async: false,
    //                                 dataType: "json",
    //                                 data: { //userName: orgname
    //                                 },
    //                                 contentType: "application/x-www-form-urlencoded",
    //                                 success: function(data) {
    //                                     if (data) {
    //                                         var ret1 = eval(data);
    //                                         ret1 = eval(ret1);
    //                                         //alert(ret1);
    //                                         shu.push(ret1.length);
    //                                     } else {

    //                                     }
    //                                 }

    //                             });
    //                         }
    //                         wellid1.length = 0;
    //                         wellname1.length = 0;

    //                     }
    //                     wellid.join(',');
    //                     wellname.join(',');
    //                     var dd = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + startdatetime + '~' + valdatetime + '&name=' + wellname + '&id=' + wellid;
    //                     //alert(dd);
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
    //                                 //alert(JSON.stringify(jet));
    //                                 var bjs = document.getElementById('bjs');
    //                                 //alert(wells1);
    //                                 if (wells1 != 0) {
    //                                     $api.text(bjs, jet.length);
    //                                     var list0 = new Array();
    //                                     var list1 = new Array();
    //                                     var list2 = new Array();
    //                                     var list = new Array();
    //                                     for (var i = 0; i < jet.length; i++) {
    //                                         switch (jet[i].catalog) {
    //                                             case '1':
    //                                                 list0.push(jet[i]);
    //                                                 break;
    //                                             case '2':
    //                                                 list1.push(jet[i]);
    //                                                 break;
    //                                             case '7':
    //                                                 list1.push(jet[i]);
    //                                                 break;
    //                                             case '4':
    //                                                 list2.push(jet[i]);
    //                                                 break;
    //                                         }

    //                                     }
    //                                     list.push(list0);
    //                                     //alert(JSON.stringify(list0));
    //                                     list.push(list1);
    //                                     //alert(JSON.stringify(list1));
    //                                     list.push(list2);
    //                                     //alert(JSON.stringify(list2));
    //                                     var one = document.getElementById('one');
    //                                     var two = document.getElementById('two');
    //                                     var three = document.getElementById('three');
    //                                     getdiv(one, list[0]);
    //                                     getdiv(two, list[1]);
    //                                     getdiv(three, list[2]);

    //                                     var height=Math.max(list[0].length,list[1].length,list[2].length);

    //                                     $(".swiper-slide").css("height",height*200);
    //                                 } else {

    //                                 }
    //                             } else {
    //                                 $api.text(bjs, 0);
    //                             }
    //                         }
    //                     });

    //                 }
    //             });
    //         }
    //     });







}

function getdiv(ddlist, jet) {
    //alert(JSON.stringify(jet));

    //alert(wells1);
    var org;
    api.readFile({
        path: 'widget://script/orgwell2_new.json'
    }, function (ret, err) {
        if (ret) {
            org = jQuery.parseJSON(ret.data);
            var html = "";
            for (var i = 0; i < jet.length; i++) {
                var des = jet[i].description.split(',');
                //alert(des[1]);
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
                html += '<li><div id="' + jet[i].name + '.' + i + '" style="border:1px solid #99ccff;" onclick=click1(this)>' +
                    '<div  style="font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center;">' +
                    orgtext +
                    '</div>' +
                    '<div  style="font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center;">' +
                    jet[i].describe +
                    '</div>' +
                    '<div style="font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center;">' +
                    name +
                    '</div>' +
                    '<div style="height: 90px;width: 100%;text-align: center;">' +
                    '<div style="height: 90px;width: 30%;float: left;border-right:1px solid #99ccff;box-sizing: border-box;">' +
                    '<div style="font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center;">' +
                    des[0] +
                    '</div>' +
                    '<div style="font-size: 20px;border-bottom: 1px solid #99CCFF;color: #fff;text-align: center;">' +
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
        }
    });
}
