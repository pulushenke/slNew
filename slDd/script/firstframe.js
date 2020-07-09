function gettime() {
    var date = document.getElementById('datetime');
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1; //月份是从0开始的
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    var newTime = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
    //alert(newTime);
    $api.text(date, newTime);
}


function load(ip, org) {

loadAnimation_show();

    var show = 0;
    //  show++;
    api.ajax({
        url: 'http://' + ip + '/home/getchangcount1',
        method: 'post',
        data: {
            values: {
                changid: org.changid,
                kuangid: org.kuangid,
                duiid: org.duiid,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(ret, err) {
        if (ret) {
            var total = document.getElementById('total');
            var open = document.getElementById('open');
            var stop = document.getElementById('stop');
            $api.text(total, ret.total);
            $api.text(open, ret.opencount);
            $api.text(stop, ret.stopcount);
            show++;
            if (show) {
                loadAnimation_hide();
            }
        } else {
            loadAnimation_show();
            toast();
        }
    });
    //  show++;
    //alert('changid:'+org.changid+',kuangid:'+org.kuangid+',duiid:'+org.duiid);
    // api.ajax({
    //     url: 'http://' + ip + '/home/get_gekuangTimeRate1',
    //     method: 'post',
    //     data: {
    //         values: {
    //             changid: org.changid,
    //             kuangid: org.kuangid,
    //             duiid: org.duiid,
    //             random: Math.random()
    //         },
    //         files: {
    //             fileName: 'filePath'
    //         }
    //     }
    // }, function(ret, err) {
    //     if (ret) {
    //         var data = new Array();
    //         var org = new Array();
    //         var a = null;
    //         a = eval(ret);
    //         for (var i = 0; i < a.length; i++) {
    //             org.push(a[i].Name);
    //             data.push(a[i].timerate);
    //         }
    //         myChart.hideLoading();
    //         myChart.setOption({
    //             yAxis: {
    //                 data: org
    //             },
    //             series: [{
    //                 data: data
    //             }]
    //         });
    //         show--;
    //         if (show == 0) {
    //             loadAnimation_hide();
    //         }
    //     } else {
    //         toast();
    //     }
    // });




    //
    // var dom = document.getElementById("container");
    // var myChart = echarts.init(dom);
    // var app = {};
    // option = {
    //     title: {
    //         subtext: '各矿时率图',
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'shadow'
    //         }
    //
    //     },
    //     legend: {
    //         data: []
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //     },
    //     xAxis: {
    //         type: 'value',
    //         boundaryGap: [0, 0.01],
    //         axisLabel: {
    //             show: true,
    //             textStyle: {
    //                 color: '#fff'
    //             }
    //         }
    //     },
    //     yAxis: {
    //         type: 'category',
    //         data: [],
    //         axisLabel: {
    //             show: true,
    //             textStyle: {
    //                 color: '#fff'
    //             }
    //         }
    //     },
    //     itemStyle: { //柱子颜色
    //         normal: {
    //             // 随机显示
    //             //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
    //             // 定制显示（按顺序）
    //             color: function(params) {
    //                 var colorList = ['#69c6ff', '#4cb3d2', '#88abad', '#87aa66', '#a6a538', '#eca539', '#d9824d', '#d94d4c', '#9dd3fa', '#1f6fb5', '#fcd692', '#faffeb'];
    //                 return colorList[params.dataIndex]
    //             }
    //         },
    //     },
    //     series: [{
    //             name: '',
    //             type: 'bar',
    //             barWidth: 17,
    //             data: [],
    //             itemStyle: {
    //                 //柱形图圆角，鼠标移上去效果
    //                 emphasis: {
    //                     barBorderRadius: [0, 10, 10, 0]
    //                 },
    //
    //                 normal: {
    //                     //柱形图圆角，初始化效果
    //                     barBorderRadius: [0, 10, 10, 0]
    //                 }
    //             },
    //
    //
    //         },
    //
    //     ]
    // };
    //
    // if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    // }

}

function loaddd(orgname) {
    var wells = 0;

    api.ajax({
        url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
        method: 'get',
        dataType: 'json',
        data: {
            values: {
               userName: orgname
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(data, err) {

    //  alert(JSON.stringify(data));
     var a = eval(data);

     if (a.Data.length > 0) {

         var b = a.Data[0].children;

         //alert(JSON.stringify(b));
          // console.log(JSON.stringify(b));
         for (var y = 0; y < b.length; y++) {
             if (b[y].children != null) {
              // console.log(JSON.stringify(b[y].children));
                 wells += b[y].children[0].children.length;
             } else {
                 //alert(JSON.stringify(b[y]));
                 wells += b.length;
             }

         }
     }
     var zjs = document.getElementById('zjs');

     $api.text(zjs, wells);
     var recordIndex = 1000000;
     api.ajax({
         url: getURL(orgname) + '&recordIndex=' + recordIndex,
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
             var bjs = document.getElementById('bjs');

             if (wells == 0) {
                 $api.text(bjs, 0);
             } else {
                 $api.text(bjs, data.length);
             }

         }
     });
    });

// alert(0)
//     $.ajax({
//         url: 'http://iot.zhdk.net:9000/Wap/GetSimpleTree1',
//         type: "get",
//         dataType: 'json',
//         data: {
//             userName: orgname
//         },
//         contentType: "application/x-www-form-urlencoded",
//          success: function(data) {
//  alert(JSON.stringify(data));
//          }
//        });
    //
    // $.ajax({
    //     url: 'http://iot.zhdk.net:9000/Wap/GetSimpleTree',
    //     type: "get",
    //     dataType: 'json',
    //   //   jsonp:'userName',
    //   //  jsonpCallback:orgname,
    //     data: {
    //         userName: orgname
    //     },
    // //    jsonpCallback:"success_jsonpCallback"
    //    contentType: "application/x-www-form-urlencoded",
    //     success: function(data) {
    //          alert(JSON.stringify(data));
    //         var a = eval(data);
    //
    //         if (a.Data.length > 0) {
    //
    //             var b = a.Data[0].children;
    //             //alert(JSON.stringify(b));
    //             for (var y = 0; y < b.length; y++) {
    //                 if (b[y].children != null) {
    //
    //                     wells += b[y].children[0].children.length;
    //                 } else {
    //                     //alert(JSON.stringify(b[y]));
    //                     wells += b.length;
    //                 }
    //
    //             }
    //         }
    //         var zjs = document.getElementById('zjs');
    //
    //         $api.text(zjs, wells);
    //         var recordIndex = 1000000;
    //         api.ajax({
    //             url: getURL(orgname) + '&recordIndex=' + recordIndex,
    //             method: 'post',
    //             dataType: 'text',
    //             data: {
    //                 values: {
    //
    //                     random: Math.random()
    //                 },
    //                 files: {
    //                     fileName: 'filePath'
    //                 }
    //             }
    //         }, function(ret, err) {
    //             if (ret) {
    //                 var data = JSON.parse(ret);
    //                 data = JSON.parse(data);
    //                 var bjs = document.getElementById('bjs');
    //
    //                 if (wells == 0) {
    //                     $api.text(bjs, 0);
    //                 } else {
    //                     $api.text(bjs, data.length);
    //                 }
    //
    //             }
    //         });
    //     },
    //     error:function(e){
    //              console.log(JSON.stringify(e));
    //     }
    //
    // });



}
