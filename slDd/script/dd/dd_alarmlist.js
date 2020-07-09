function load(id, name, time1, time2) {

    $("#date").datepicker({
        format: 'yyyy-mm-dd', //显示格式
        language: 'zh-CN', //中文
        todayBtn: true,
        todayHighlight: true,
        forceParse: false,
        startView: 0,
        showMeridian: true,
        autoclose:true,
    });
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1; //得到月份
    var date = now.getDate(); //得到日期

    $("#date").attr("value", year + "-" + month + "-" + date);
    var main1_myChart = echarts.init(document.getElementById('main1'));
    var main2_myChart = echarts.init(document.getElementById('main2'));
    var main3_myChart = echarts.init(document.getElementById('main3'));
    var main4_myChart = echarts.init(document.getElementById('main4'));
    var main5_myChart = echarts.init(document.getElementById('main5'));
    var timedata = [];
    var count = 0;
    main1_option = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                align: 'center',
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: 25,
            textStyle: {
                color: '#fff',
            },
            data: ['']
        },
        grid: {
            top: 80,
            left: '3%',
            right: '4%',
            containLabel: true,
            width: '90%',
            height: '200px',
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            data: timedata,
        },
        yAxis: {
            ymax: 400,
            type: 'value',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            }
        },

        series: []
    };

    main2_option = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                align: 'center',
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: 25,
            textStyle: {
                color: '#fff',
            },
            data: ['']
        },
        grid: {
            top: 80,
            left: '3%',
            right: '4%',
            containLabel: true,
            width: '90%',
            height: '200px'
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            data: timedata,
        },
        yAxis: {
            ymax: 100,
            type: 'value',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            }
        },

        series: []
    };

    main3_option = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                align: 'center',
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: 25,
            textStyle: {
                color: '#fff',
            },
            data: ['']
        },
        grid: {
            top: 80,
            left: '3%',
            right: '4%',
            containLabel: true,
            width: '90%',
            height: '200px'
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            data: timedata,
        },
        yAxis: {
            ymax: 20,
            type: 'value',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            }
        },

        series: []
    };

    main4_option = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                align: 'center',
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: 25,
            textStyle: {
                color: '#fff',
            },
            data: ['']
        },
        grid: {
            top: 80,
            left: '3%',
            right: '4%',
            containLabel: true,
            width: '90%',
            height: '200px'
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            data: timedata,
        },
        yAxis: {
            ymax: 1.5,
            type: 'value',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            }
        },

        series: []
    };



    main5_option = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                align: 'center',
            }
        },

        legend: {
            top: 25,
            textStyle: {
                color: '#fff',
            },
            data: ['']
        },
        grid: {
            top: 80,
            left: '3%',
            right: '4%',
            containLabel: true,
            width: '90%',
            height: '10px'
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            data: timedata,
        },
        yAxis: {

            ymax: 20,
            type: 'value',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            }
        },

        series: []
    };
    main1_myChart.setOption(main1_option);
    main2_myChart.setOption(main2_option);
    main3_myChart.setOption(main3_option);
    main4_myChart.setOption(main4_option);
    main5_myChart.setOption(main5_option);


    var datetime = document.getElementById('date');
    var valdatetime = GetDateStr(-time2);
    $("#date").attr("value", valdatetime);
    getdata(id, name, valdatetime, time1, time2);

    var select = document.getElementById('select');
    $api.addEvt(select, 'click', function() {
        var datetime = document.getElementById('date');
        var valdatetime = datetime.value;

        getdata(id, name, valdatetime, time1, time2);

    });
    var before = document.getElementById('before');
    $api.addEvt(before, 'click', function() {
        var datetime = document.getElementById('date');
        var valdatetime = datetime.value;

        beforedate--;
        valdatetime = GetDateStr(beforedate - time2);
        $("#date").attr("value", valdatetime);


        getdata(id, name, valdatetime, time1, time2);

    });
    var after = document.getElementById('after');
    $api.addEvt(after, 'click', function() {

        var datetime = document.getElementById('date');
        var valdatetime = datetime.value;
        beforedate++;
        valdatetime = GetDateStr(beforedate - time2);


        $("#date").attr("value", valdatetime);

        getdata(id, name, valdatetime, time1, time2);

    });
    var beforedate = 0;
    var afterdate = 0;
}

function getdingwei(now, zong) {
    //var time = time1.split(':');
    //timenow=new Date().getHours()*12+new Date().getMinutes()/5;
    //if(time2<1)
    //{
    //time = Math.round((time[0] * 12 + Math.round(time[1] / 5)) / timenow * 100) * 0.9;
    //}else {

    time = (now / zong * 100);
    //}
    return time;
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}

function getdata(id, name, datetime, time1, time2) {
    time1 = time1.substring(0, time1.length - 1) + "0";
    /*var timedata = new Array();
    var hour=0;
    for (var k = 0; k < 24; k++) {

        if (k < 10) {
                hour = '0' + k;
        } else {
            hour = k;
        }
        var minute=0;
        //alert('hour:'+hour);
        for (var m = 0; m < 60; m += 5) {
            if (m < 10) {
                    minute = '0' + m
            } else {
                minute = m;
            }
            //alert('minute:'+minute);
            //alert(hour+':'+minute);
            timedata.push(hour + ':' + minute);
        }

    }*/

    //var datetime='2018-11-26';
    loadAnimation_show();
    var show = 0;
    show++;
 
    api.ajax({
        url: 'http://iot.zhdk.net:9000/Data/GetTabItems?sname=' + id,
        method: 'post',
        data: {
            values: {
                //sname:id,
            },
        }
    }, function(ret, err) {
        if (ret) {

            for (var i = 0; i < ret.length; i++) {
                if (ret[i].text == name) {
                    show++;
                    api.ajax({
                        url: 'http://iot.zhdk.net:9000/wap/ChartItem',
                        method: 'post',
                        data: {
                            values: {
                                chartTabId: ret[i].value,
                                time: datetime,
                            },
                        }
                    }, function(ret, err) {
                        if (ret) {
                            //alert(JSON.stringify(ret));
                            var charset = ret;

                            var main1_myChart = echarts.init(document.getElementById('main1'));
                            var main2_myChart = echarts.init(document.getElementById('main2'));
                            var main3_myChart = echarts.init(document.getElementById('main3'));
                            var main4_myChart = echarts.init(document.getElementById('main4'));
                            var main5_myChart = echarts.init(document.getElementById('main5'));
                            show++;
                            api.ajax({
                                url: 'http://iot.zhdk.net:9000/wap/GetEChartsData',
                                method: 'post',
                                data: {
                                    values: {
                                        chartid: charset[0].chartid,
                                        time: datetime,
                                    }
                                }
                            }, function(ret0, err) {

                                if (ret0) {
                                    //alert(ret0);
                                    //alert(JSON.stringify(ret0));
                                    var ret0data1 = new Array(288);
                                    ret0data1.fill('0');
                                    var ret0data2 = new Array(288);
                                    ret0data2.fill('0');
                                    var ret0data3 = new Array(288);
                                    ret0data3.fill('0');
                                    var timedata = new Array();
                                    var now = 0;
                                    //alert(JSON.stringify(ret0.series[0].data[0][0].substring(11,16)));
                                    //alert(time1+':'+ret0.series[0].data[25][0].substring(11, 16));
                                    for (var i = 0; i < ret0.series[0].data.length; i++) {
                                        ret0data1[i] = (ret0.series[0].data[i][1]);
                                        ret0data2[i] = (ret0.series[1].data[i][1]);
                                        ret0data3[i] = (ret0.series[2].data[i][1]);
                                        timedata.push(ret0.series[0].data[i][0].substring(11, 16));
                                        if (time1 == ret0.series[0].data[i][0].substring(11, 16)) {
                                            now = i;
                                            //alert(now+'/'+ret0.series[0].data.length);

                                        }
                                    }
                                    //alert(timedata.length);
                                    //alert(JSON.stringify(timedata));
                                    //alert(ret0data1.length);
                                    //alert(JSON.stringify(ret0data1));
                                    //alert(JSON.stringify(timedata));
                                    var shu = getdingwei(now, ret0.series[0].data.length);
                                    //alert('time1:' + time1 + ',time2:' + time2 + ',timedata:' + timedata.length + ',shu:' + shu);
                                    main1_myChart.hideLoading();
                                    main1_myChart.setOption({
                                        title: {
                                            text: charset[0].title,
                                        },
                                        legend: {
                                            data: charset[0].legend,
                                        },
                                        grid: {
                                            //width:charset[0].width,
                                            //height:charset[0].height,
                                        },
                                        xAxis: {
                                            name: charset[0].xtitle,
                                            data: timedata,
                                        },
                                        dataZoom: [{
                                            show: true,
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }, {
                                            type: 'inside',
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }],
                                        yAxis: {
                                            //min:charset[0].ymin,
                                            max: charset[0].ymax,
                                            name: charset[0].ytitle
                                        },
                                        series: [{
                                            name: ret0.series[0].name,
                                            type: 'line',
                                            data: ret0data1,
                                        }, {
                                            name: ret0.series[1].name,
                                            type: 'line',
                                            data: ret0data2,
                                        }, {
                                            name: ret0.series[2].name,
                                            type: 'line',
                                            data: ret0data3,
                                        }]
                                    });
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                } else {
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                    //alert('false');
                                }
                            });
                            show++;
                            api.ajax({
                                url: 'http://iot.zhdk.net:9000/wap/GetEChartsData',
                                method: 'post',
                                data: {
                                    values: {
                                        chartid: charset[1].chartid,
                                        time: datetime,
                                    }
                                }
                            }, function(ret1, err) {
                                if (ret1) {
                                    var ret1data1 = new Array(288);
                                    ret1data1.fill(0);
                                    var ret1data2 = new Array(288);
                                    ret1data2.fill(0);
                                    var ret1data3 = new Array(288);
                                    ret1data3.fill(0);
                                    var timedata = new Array();
                                    var now = 0;
                                    for (var i = 0; i < ret1.series[0].data.length; i++) {
                                        ret1data1[i] = (ret1.series[0].data[i][1]);
                                        ret1data2[i] = (ret1.series[1].data[i][1]);
                                        ret1data3[i] = (ret1.series[2].data[i][1]);
                                        timedata.push(ret1.series[0].data[i][0].substring(11, 16));
                                        if (time1 == ret1.series[0].data[i][0].substring(11, 16)) {
                                            now = i;
                                        }
                                    }
                                    var shu = getdingwei(now, ret1.series[0].data.length);
                                    //alert('time1:'+time1+',time2:'+time2+',timedata:'+timedata.length+',shu:'+shu);
                                    main2_myChart.hideLoading();
                                    main2_myChart.setOption({
                                        title: {
                                            text: charset[1].title,
                                        },
                                        legend: {
                                            data: charset[1].legend,
                                        },
                                        grid: {
                                            //width:charset[1].width,
                                            //height:charset[1].height,
                                        },
                                        xAxis: {
                                            name: charset[1].xtitle,
                                            data: timedata,
                                        },
                                        yAxis: {
                                            //min:charset[1].ymin,
                                            //max:charset[1].ymax,
                                            name: charset[1].ytitle
                                        },
                                        dataZoom: [{
                                            show: true,
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }, {
                                            type: 'inside',
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }],
                                        series: [{
                                            name: ret1.series[0].name,
                                            type: 'line',
                                            data: ret1data1,
                                        }, {
                                            name: ret1.series[1].name,
                                            type: 'line',
                                            data: ret1data2,
                                        }, {
                                            name: ret1.series[2].name,
                                            type: 'line',
                                            data: ret1data3,
                                        }]
                                    });
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                } else {
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                    //alert('false');
                                }
                            });
                            show++
                            api.ajax({
                                url: 'http://iot.zhdk.net:9000/wap/GetEChartsData',
                                method: 'post',
                                data: {
                                    values: {
                                        chartid: charset[2].chartid,
                                        time: datetime,
                                    }
                                }
                            }, function(ret2, err) {
                                if (ret2) {
                                    //alert(JSON.stringify(ret2));
                                    var ret2data1 = new Array(288);
                                    var ret2data2 = new Array(288);
                                    var ret2data3 = new Array(288);
                                    var timedata = new Array();
                                    var now = 0;
                                    for (var i = 0; i < ret2.series[0].data.length; i++) {
                                        ret2data1[i] = (ret2.series[0].data[i][1]);
                                        ret2data2[i] = (ret2.series[1].data[i][1]);
                                        ret2data3[i] = (ret2.series[2].data[i][1]);
                                        timedata.push(ret2.series[0].data[i][0].substring(11, 16));
                                        if (time1 == ret2.series[0].data[i][0].substring(11, 16)) {
                                            now = i;
                                        }
                                    }
                                    var shu = getdingwei(now, ret2.series[0].data.length);

                                    main3_myChart.hideLoading();
                                    main3_myChart.setOption({
                                        title: {
                                            text: charset[2].title,
                                        },
                                        legend: {
                                            data: charset[2].legend,
                                        },
                                        grid: {
                                            //  width:charset[2].width,
                                            //height:charset[2].height,
                                        },
                                        xAxis: {
                                            name: charset[2].xtitle,
                                            data: timedata,
                                        },
                                        yAxis: {
                                            //min:charset[2].ymin,
                                            //max:charset[2].ymax,
                                            name: charset[2].ytitle
                                        },
                                        dataZoom: [{
                                            show: true,
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }, {
                                            type: 'inside',
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }],
                                        series: [{
                                            name: ret2.series[0].name,
                                            type: 'line',
                                            data: ret2data1,
                                        }, {
                                            name: ret2.series[1].name,
                                            type: 'line',
                                            data: ret2data2,
                                        }, {
                                            name: ret2.series[2].name,
                                            type: 'line',
                                            data: ret2data3,
                                        }]
                                    });
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                } else {
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                    //alert('false');
                                }
                            });
                            show++;
                            api.ajax({
                                url: 'http://iot.zhdk.net:9000/wap/GetEChartsData',
                                method: 'post',
                                data: {
                                    values: {
                                        chartid: charset[3].chartid,
                                        time: datetime,
                                    }
                                }
                            }, function(ret3, err) {
                                if (ret3) {
                                    //alert(JSON.stringify(ret3));
                                      // console.log(JSON.stringify(ret3));
                                    var ret3data1 = new Array(288);
                                    var ret3data2 = new Array(288);
                                    var ret3data3 = new Array(288);
                                    var timedata = new Array();
                                    var now = 0;
                                    for (var i = 0; i < ret3.series[0].data.length; i++) {
                                        ret3data1[i] = (ret3.series[0].data[i][1]);
                                        ret3data2[i] = (ret3.series[1].data[i][1]);
                                        ret3data3[i] = (ret3.series[2].data[i][1]);
                                        timedata.push(ret3.series[0].data[i][0].substring(11, 16));
                                        if (time1 == ret3.series[0].data[i][0].substring(11, 16)) {
                                            now = i;
                                        }
                                    }
                                    var shu = getdingwei(now, ret3.series[0].data.length);
                                    main4_myChart.hideLoading();
                                    main4_myChart.setOption({
                                        title: {
                                            text: charset[3].title,
                                        },
                                        legend: {
                                            data: charset[3].legend,
                                        },
                                        grid: {
                                            //  width:charset[3].width,
                                            //height:charset[3].height,
                                        },
                                        xAxis: {
                                            name: charset[3].xtitle,
                                            data: timedata,
                                        },
                                        yAxis: {
                                            //min:charset[3].ymin,
                                            //max:charset[3].ymax,
                                            name: charset[3].ytitle
                                        },
                                        dataZoom: [{
                                            show: true,
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }, {
                                            type: 'inside',
                                            realtime: true,
                                            start: shu - 5,
                                            end: shu + 5,
                                            zoomLock: true
                                        }],
                                        series: [{
                                            name: ret3.series[0].name,
                                            type: 'line',
                                            data: ret3data1,
                                        }, {
                                            name: ret3.series[1].name,
                                            type: 'line',
                                            data: ret3data2,
                                        }, {
                                            name: ret3.series[2].name,
                                            type: 'line',
                                            data: ret3data3,
                                        }]
                                    });
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                } else {
                                    show--;
                                    if (show == 0) {
                                        loadAnimation_hide();
                                    }
                                    //alert('false');
                                }
                            });
                            //返回参数无第五个对象
                            // show++;
                            // api.ajax({
                            //     url: 'http://iot.zhdk.net:9000/wap/GetEChartsData',
                            //     method: 'post',
                            //     data: {
                            //         values: {
                            //             chartid: charset[4].chartid,
                            //             time: datetime,
                            //         }
                            //     }
                            // }, function(ret4, err) {
                            //     if (ret4) {
                            //         var ret4data1 = new Array(288);
                            //         var ret4data2 = new Array(288);
                            //         var ret4data3 = new Array(288);
                            //         var timedata = new Array();
                            //         var now = 0;
                            //     //    console.log(JSON.stringify(ret4.series[1]));
                            //         if(ret4.series[1] !== undefined || ret4.series[2] !==undefined){
                            //             for (var i = 0; i < ret4.series[0].data.length; i++) {

                            //                  ret4data1[i] = (ret4.series[0].data[i][1]);
                            //                  ret4data2[i] = (ret4.series[1].data[i][1]);
                            //                  ret4data3[i] = (ret4.series[2].data[i][1]);
                            //                  timedata.push(ret4.series[0].data[i][0].substring(11, 16));
                            //                  if (time1 == ret4.series[0].data[i][0].substring(11, 16)) {
                            //                      now = i;
                            //                  }
                            //              }
                            //         }

                            //         var shu = getdingwei(now, ret4.series[0].data.length);
                            //         main5_myChart.hideLoading();
                            //         main5_myChart.setOption({
                            //             title: {
                            //                 text: charset[4].title,
                            //             },
                            //             legend: {
                            //                 data: charset[4].legend,
                            //             },
                            //             grid: {
                            //                 //width:charset[4].width,
                            //                 //height:charset[4].height,
                            //             },
                            //             xAxis: {
                            //                 name: charset[4].xtitle,
                            //                 data: timedata,
                            //             },
                            //             yAxis: {
                            //                 min: charset[4].ymin,
                            //                 max: charset[4].ymax,
                            //                 name: charset[4].ytitle
                            //             },
                            //             dataZoom: [{
                            //                 show: true,
                            //                 realtime: true,
                            //                 start: shu - 5,
                            //                 end: shu + 5,
                            //                 zoomLock: true
                            //             }, {
                            //                 type: 'inside',
                            //                 realtime: true,
                            //                 start: shu - 5,
                            //                 end: shu + 5,
                            //                 zoomLock: true
                            //             }],
                            //             series: [{
                            //                 name: ret4.series[0].name,
                            //                 type: 'line',
                            //                 data: ret4data1,
                            //             }]
                            //         });
                            //         show--;
                            //         if (show == 0) {
                            //             loadAnimation_hide();
                            //         }
                            //     } else {
                            //         show--;
                            //         if (show == 0) {
                            //             loadAnimation_hide();
                            //         }
                            //     }
                            // });



                            show--;
                             
                            if (show == 0) {
                                loadAnimation_hide();
                            }

                        } else {
                            show--;
                            if (show == 0) {
                                loadAnimation_hide();
                            }
                            //alert( JSON.stringify( err ) );

                        }
                    });

                }
            }
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
        } else {
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
            //alert( JSON.stringify( err ) );
        }
    });

}
