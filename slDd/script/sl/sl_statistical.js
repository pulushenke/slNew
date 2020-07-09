//单位下拉列表
function list(ip, org) {
    var orgid = '0';
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    var selectorgWell = document.getElementById('selectorgWell');
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
    var selectorgWell = document.getElementById('selectorgWell');
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
    var selectorgWell = $api.byId('selectorgWell');
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
            var html = "";
            var data = eval(ret);
            for (var i = 0; i < data.length; i++) {
                html += "<option value='" + data[i].orgthreeid + "'>" + data[i].orgthreename + "</option>";
            }
            $api.html(selectorgthree, html);
            if (selectorgthree.value === '全部') {
                $api.html(selectorgWell, '');
            }

            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
        } else {

        }

    });
}

function selectorgWell(ip) {

    //选择二级列表
    var val = $api.val(selectorgthree);
    var selectorgWell = $api.dom('#selectorgWell')
    loadAnimation_show();
    var show = 0;
    show++;
    api.ajax({
        url: 'http://' + ip + '/sl/getdevice',
        method: 'post',
        data: {
            values: {
                dui_bh: val,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function (ret, err) {
        if (ret) {
            var htmlArr = ["<option value='全部'>全部</option>"];
            var data = eval(ret);
            data.forEach(function (v) {
                htmlArr.push("<option value='" + v.Id + "'>" + v.Name + "</option>");
            })
            $api.html(selectorgWell, htmlArr.join(''));
            show--;
            if (show == 0) {
                loadAnimation_hide();
            }
        } else {

        }
    });
}




function load(ip, org) {
    var selectorgtwo = document.getElementById('selectorgtwo');
    var selectorgthree = document.getElementById('selectorgthree');
    var selectorgWell = $api.dom('#selectorgWell');
    var orgid = org.changid;

    //点查询刷新停井列表
    $api.addEvt(select, 'click', function () {
        var valtwo = selectorgtwo.value;
        var valthree = selectorgthree.value;
        var valWell = selectorgWell.value;
        //valtwo=="全部"||valthree=="全部"||
        if (valthree == '' || valthree == undefined || valthree == null) {
            valthree = "全部";
            getdate(ip, orgid, valtwo, valthree, valWell);
        } else {
            getdate(ip, orgid, valtwo, valthree, valWell);
        }

    });


    //<!--时率柱周图-->

    var week_dom = document.getElementById("container1");
    var week_myChart = echarts.init(week_dom);
    var month_dom = document.getElementById("container2");
    var month_myChart = echarts.init(month_dom);
    var year_dom = document.getElementById("container3");
    var year_myChart = echarts.init(year_dom);
    var gekuang_dom = document.getElementById("container");
    var gekuang_myChart = echarts.init(gekuang_dom);
    var ztr_dom = document.getElementById("container5");
    var ztr_myChart = echarts.init(ztr_dom);
    // var ytr_dom = document.getElementById("container4");
    // var ytr_myChart = echarts.init(ytr_dom);


    var app = {};
    var week_datas = [];
    week_option = {
        backgroundColor: '',
        title: {
            text: '时率 周图',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                color: '#F1F1F3'
            },
            left: '4%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['时率'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '6%',
            top: '11%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
                interval: 0,
                //  rotate:50,//文字倾斜角度
                textStyle: {
                    fontSize: 12
                }
            },
        }],
        yAxis: [{
            type: 'value',
            interval: 40,
            max: 100,
            min: 0,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle: {
                    fontSize: 12
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '时率',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(82, 191, 255, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(82, 191, 255, 0)'
                    }], false),
                    shadowColor: 'rgba(228, 139, 76, 0.1)',
                    shadowBlur: 10
                }
            },
            symbolSize: 4,
            itemStyle: {
                normal: {
                    color: 'rgb(82, 191, 255)',
                    borderColor: '#5cb85c'
                },
            },
            data: week_datas,
        }]
    };

    if (week_option && typeof week_option === "object") {
        week_myChart.setOption(week_option, true);
    }


    //<!--时率柱月图-->



    var app = {};

    var month_datas = [];
    month_option = {
        backgroundColor: '',
        title: {
            text: '时率 月图',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                color: '#F1F1F3'
            },
            left: '4%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['时率'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '6%',
            top: '11%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            axisLabel: {
                interval: 1, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                textStyle: {
                    fontSize: 12
                }
            },
        }],
        yAxis: [{
            type: 'value',
            interval: 40,
            max: 100,
            min: 0,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle: {
                    fontSize: 12
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '时率',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(82, 191, 255, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(82, 191, 255, 0)'
                    }], false),
                    shadowColor: 'rgba(228, 139, 76, 0.1)',
                    shadowBlur: 10
                }
            },
            symbolSize: 4,
            itemStyle: {
                normal: {
                    color: 'rgb(82, 191, 255)',
                    borderColor: '#5cb85c'
                },
            },
            data: month_datas,
        }]
    };

    if (month_option && typeof month_option === "object") {
        month_myChart.setOption(month_option, true);
    }

    //<!--时率柱年图-->


    var app = {};

    var year_datas = [];
    year_option = {
        backgroundColor: '',
        title: {
            text: '时率 年图',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                color: '#F1F1F3'
            },
            left: '4%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['时率'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '6%',
            top: '11%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ],
            axisLabel: {
                interval: 0,
                //     rotate:50,//文字倾斜角度
                textStyle: {
                    fontSize: 12
                }
            },
        }],
        yAxis: [{
            type: 'value',
            interval: 40,
            max: 100,
            min: 0,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle: {
                    fontSize: 12
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '时率',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(82, 191, 255, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(82, 191, 255, 0)'
                    }], false),
                    shadowColor: 'rgba(228, 139, 76, 0.1)',
                    shadowBlur: 10
                }
            },
            symbolSize: 4,
            itemStyle: {
                normal: {
                    color: 'rgb(82, 191, 255)',
                    borderColor: '#5cb85c'
                },
            },
            data: year_datas,
        }]
    };

    if (year_option && typeof year_option === "object") {
        year_myChart.setOption(year_option, true);
    }

    //<!--时率柱状图-->


    var app = {};
    gekuang_option = {
        title: {
            subtext: '各矿时率图',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }

        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            min: 0,
            max: 100,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['二矿', '一矿', '三矿', '待核实井', '四矿', '敖包塔作业区'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        itemStyle: { //柱子颜色
            normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                // 定制显示（按顺序）
                color: function (params) {
                    var colorList = ['#69c6ff', '#4cb3d2', '#88abad', '#87aa66', '#a6a538', '#eca539', '#d9824d', '#d94d4c', '#9dd3fa', '#1f6fb5', '#fcd692', '#faffeb'];
                    return colorList[params.dataIndex]
                }
            },
        },
        series: [{
                name: '',
                type: 'bar',
                barWidth: 17,
                data: [],


                itemStyle: {
                    //柱形图圆角，鼠标移上去效果
                    emphasis: {
                        barBorderRadius: [0, 10, 10, 0]
                    },

                    normal: {
                        //柱形图圆角，初始化效果
                        barBorderRadius: [0, 10, 10, 0]
                    }
                },
            },

        ]
    };

    if (gekuang_option && typeof gekuang_option === "object") {
        gekuang_myChart.setOption(gekuang_option, true);
    }

    //<!--开井率饼图-->



    // var app = {};
    // var ytr_scaleData = [{
    //         'name': '90%以上',
    //         'value': 0
    //     },
    //     {
    //         'name': '70%-90%',
    //         'value': 0
    //     },
    //     {
    //         'name': '50%-70%',
    //         'value': 0
    //     },
    //     {
    //         'name': '50%以下',
    //         'value': 0
    //     },
    // ];

    // var ytr_data = [];
    // for (var i = 0; i < ytr_scaleData.length; i++) {
    //     ytr_data.push({
    //         value: ytr_scaleData[i].value,
    //         name: ytr_scaleData[i].name,
    //         itemStyle: {
    //             normal: {
    //                 borderWidth: 5,
    //                 shadowBlur: 30,
    //                 borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
    //                     offset: 0,
    //                     color: '#7777eb'
    //                 }, {
    //                     offset: 1,
    //                     color: '#70ffac'
    //                 }]),
    //                 shadowColor: 'rgba(142, 152, 241, 0.6)'
    //             }
    //         }
    //     }, {
    //         value: 4,
    //         name: '',
    //         itemStyle: [{
    //             normal: {
    //                 label: {
    //                     show: false
    //                 },
    //                 labelLine: {
    //                     show: false
    //                 },
    //                 color: 'rgba(0, 0, 0, 0)',
    //                 borderColor: 'rgba(0, 0, 0, 0)',
    //                 borderWidth: 0
    //             }
    //         }]
    //     });
    // }

    // ytr_option = {
    //     title: {
    //         subtext: '开井率简图',
    //     },
    //     backgroundColor: '',
    //     tooltip: {
    //         show: false
    //     },
    //     legend: {
    //         show: false
    //     },
    //     toolbox: {
    //         show: false
    //     },
    //     series: [{
    //         name: '',
    //         type: 'pie',
    //         clockWise: false,
    //         radius: [60, 65], //控制饼图大小
    //         hoverAnimation: false,
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     position: 'outside',
    //                     color: '#ddd',
    //                     formatter: function(params) {

    //                         var percent = 0;
    //                         var total = 0;
    //                         for (var i = 0; i < ytr_scaleData.length; i++) {
    //                             total += ytr_scaleData[i].value;
    //                         }
    //                         percent = ((params.value / total) * 100).toFixed(0);
    //                         if (params.name !== '') {
    //                             return params.name + '\n{white|' + '占比' + percent + '%}';
    //                         } else {
    //                             return '';
    //                         }
    //                     },
    //                     rich: {
    //                         white: {
    //                             color: '#ddd',
    //                             align: 'center',
    //                             padding: [5, 0]
    //                         }
    //                     }
    //                 },
    //                 labelLine: {
    //                     show: false
    //                 }
    //             }
    //         },
    //         data: ytr_data
    //     }]
    // }

    // if (ytr_option && typeof ytr_option === "object") {
    //     ytr_myChart.setOption(ytr_option, true);
    // }
    //<!--开井率日图-->

    // var app = {};
    // ztr_option = {
    //     title: {
    //         subtext: '开井率90%以上',
    //     },
    //     backgroundColor: '',
    //     color: ['#2adecf'],
    //     textStyle: {
    //         color: 'rgb(222,222,222)',
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'shadow'
    //         }
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '3%',
    //         bottom: '3%',
    //         top: '18%',
    //         containLabel: true
    //     },
    //     yAxis: [{
    //             data: [

    //             ],

    //             axisLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 interval: 0,
    //             }
    //         },
    //         {
    //             data: [],
    //             axisLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 interval: 0,
    //                 formatter: '{value} %',
    //             }
    //         }
    //     ],
    //     xAxis: [{
    //         type: 'value',
    //         name: '',
    //         axisTick: {
    //             show: false
    //         },
    //         axisLine: {
    //             show: false
    //         },
    //         splitLine: {
    //             show: false
    //         },
    //         axisLabel: {
    //             show: false,
    //             interval: 0
    //         },
    //     }],
    //     series: [{
    //         name: '',
    //         type: 'bar',
    //         barGap: '10%',
    //         barCategoryGap: '60%',
    //         itemStyle: {
    //             normal: {
    //                 barBorderRadius: [0, 30, 30, 0],
    //                 color: new echarts.graphic.LinearGradient(
    //                     1, 0, 0, 0, [{
    //                             offset: 0,
    //                             color: '#90e6ff'
    //                         },
    //                         {
    //                             offset: 1,
    //                             color: '#6eb2fe'
    //                         }
    //                     ]
    //                 )
    //             }
    //         },
    //         data: [],
    //         zlevel: 11
    //     }]
    // }

    // if (ztr_option && typeof ztr_option === "object") {
    //     ztr_myChart.setOption(ztr_option, true);
    // }

}
//ajax参数对象
function setAjaxParams(url, datas) {
    return {
        url: url,
        method: 'post',
        data: {
            values: datas,
            files: {
                fileName: 'filePath'
            }
        }
    }
}



function getdate(ip, orgid, valtwo, valthree, valWell) {

    var week_dom = document.getElementById("container1");
    var week_myChart = echarts.init(week_dom);
    var month_dom = document.getElementById("container2");
    var month_myChart = echarts.init(month_dom);
    var year_dom = document.getElementById("container3");
    var year_myChart = echarts.init(year_dom);
    var gekuang_dom = document.getElementById("container");
    var gekuang_myChart = echarts.init(gekuang_dom);
    var ztr_dom = document.getElementById("container5");
    var ztr_myChart = echarts.init(ztr_dom);
    // var ytr_dom = document.getElementById("container4");
    // var ytr_myChart = echarts.init(ytr_dom);
    //<!--时率柱周图-->
    loadAnimation_show();
    var show = 0;
    show++;
    // console.log(JSON.stringify('http://' + ip + '/home/get_year_TimeRates?'+"changid"+'=' +orgid+ '&'+"kuangid"+'=' +valtwo+ '&'+"duiid"+'=' +valthree));
    if (valWell === '全部' || valWell.length === 0) {
        api.ajax(setAjaxParams('http://' + ip + '/home/get_week_TimeRates', {
            changid: orgid,
            kuangid: valtwo,
            duiid: valthree,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, week_myChart);
        });
        //<!--时率柱月图-->
        show++;
        api.ajax(setAjaxParams('http://' + ip + '/home/get_month_TimeRates', {
            changid: orgid,
            kuangid: valtwo,
            duiid: valthree,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, month_myChart);
        });
        //<!--时率柱年图-->
        show++;
        api.ajax(setAjaxParams('http://' + ip + '/home/get_year_TimeRates', {
            changid: orgid,
            kuangid: valtwo,
            duiid: valthree,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, year_myChart);
        });

        //<!--各矿时率柱状图-->
        show++;

        // api.ajax(setAjaxParams('http://' + ip + '/home/get_gekuangTimeRate1', {
        //     changid: orgid,
        //     kuangid: valtwo,
        //     duiid: valthree,
        //     random: Math.random()
        // }), function (ret, err) {
        //     callbackChart(ret, gekuang_myChart);
        // });
        api.ajax({
            url: 'http://' + ip + '/home/get_gekuangTimeRate1',
            method: 'post',
            data: {
                values: {
                    changid: orgid,
                    kuangid: valtwo,
                    duiid: valthree,
                    random: Math.random()
                },
                files: {
                    fileName: 'filePath'
                }
            }
        }, function (ret, err) {
            if (ret) {
                var data = new Array();
                var org = new Array();
                var a = null;
                a = eval(ret);
                //alert(JSON.stringify(ret));
                for (var i = 0; i < a.length; i++) {
                    org.push(a[i].Name);
                    data.push(a[i].timerate);
                }
                gekuang_myChart.hideLoading();
                gekuang_myChart.setOption({
                    yAxis: {
                        data: org
                    },
                    series: [{
                        data: data
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
            }
        });
    } else {
        api.ajax(setAjaxParams('http://' + ip + '/SL/CountTimes_OneWell', {
            interval: 'week',
            wellId: valWell,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, week_myChart);
        });
        //<!--时率柱月图-->
        show++;
        api.ajax(setAjaxParams('http://' + ip + '/SL/CountTimes_OneWell', {
            interval: 'month',
            wellId: valWell,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, month_myChart);
        });
        //<!--时率柱年图-->
        show++;
        api.ajax(setAjaxParams('http://' + ip + '/SL/CountTimes_OneWell_Year', {
            wellId: valWell,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, year_myChart);
        });

        //<!--时率柱状图-->
        show++;
        api.ajax(setAjaxParams('http://' + ip + '/home/get_gekuangTimeRate1', {
            changid: orgid,
            kuangid: valtwo,
            duiid: valthree,
            random: Math.random()
        }), function (ret, err) {
            callbackChart(ret, gekuang_myChart);
        });
    }


    //ajax回调函数
    function callbackChart(ret, objChart) {
        if (ret) {
            var data = new Array();
            var org = new Array();
            var a = null;
            a = eval(ret);
            for (var i = 0; i < a.length; i++) {
                org.push(a[i].Name);
                data.push(a[i].timerate);
            }
            objChart.hideLoading();
            objChart.setOption({
                xAxis: {
                    data: org
                },
                series: [{
                    data: data
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
        }
    }

    //<!--开井率饼图-->
    //show++;

    // api.ajax({
    //     url: 'http://' + ip + '/home/getopenrate',
    //     method: 'post',
    //     data: {
    //         values: {
    //             changid: orgid,
    //             kuangid: valtwo,
    //             duiid: valthree,
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
    //         var count90 = 0;
    //         var count70 = 0;
    //         var count50 = 0;
    //         var count0 = 0;
    //         a = eval(ret);

    //         for (var i = 0; i < a.length; i++) {

    //             if (a[i].openrate >= 90) {
    //                 org.push(a[i].orgname);
    //                 data.push(a[i].openrate);
    //             }

    //             var b = parseInt(a[i].openrate) / 10;
    //             switch (b) {
    //                 case 10:
    //                     count90 += 1;
    //                     break;
    //                 case 9:
    //                     count90 += 1;
    //                     break;
    //                 case 8:
    //                     count70 += 1;
    //                     break;
    //                 case 7:
    //                     count70 += 1;
    //                     break;
    //                 case 6:
    //                     count50 += 1;
    //                     break;
    //                 case 5:
    //                     count50 += 1;
    //                     break;
    //                 default:
    //                     count0 += 1;
    //                     break;
    //             }
    //         }
    //         ytr_scaleData = [{
    //                 'name': '90%以上',
    //                 'value': count90
    //             },
    //             {
    //                 'name': '70%-90%',
    //                 'value': count70
    //             },
    //             {
    //                 'name': '50%-70%',
    //                 'value': count50
    //             },
    //             {
    //                 'name': '50%以下',
    //                 'value': count0
    //             },
    //         ];
    //         var ytr_data = [];
    //         for (var i = 0; i < ytr_scaleData.length; i++) {
    //             ytr_data.push({
    //                 value: ytr_scaleData[i].value,
    //                 name: ytr_scaleData[i].name,
    //                 itemStyle: {
    //                     normal: {
    //                         borderWidth: 5,
    //                         shadowBlur: 30,
    //                         borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
    //                             offset: 0,
    //                             color: '#7777eb'
    //                         }, {
    //                             offset: 1,
    //                             color: '#70ffac'
    //                         }]),
    //                         shadowColor: 'rgba(142, 152, 241, 0.6)'
    //                     }
    //                 }
    //             }, {
    //                 value: 4,
    //                 name: '',
    //                 itemStyle: [{
    //                     normal: {
    //                         label: {
    //                             show: false
    //                         },
    //                         labelLine: {
    //                             show: false
    //                         },
    //                         color: 'rgba(0, 0, 0, 0)',
    //                         borderColor: 'rgba(0, 0, 0, 0)',
    //                         borderWidth: 0
    //                     }
    //                 }]
    //             });
    //         }
    //         ztr_myChart.hideLoading();

    //         ztr_myChart.setOption({
    //             yAxis: [{
    //                     data: org,
    //                 },
    //                 {
    //                     data: data,
    //                 }
    //             ],
    //             series: [{
    //                 data: data
    //             }]
    //         });


    //         ytr_option = {
    //             title: {
    //                 subtext: '开井率简图',
    //             },
    //             backgroundColor: '',
    //             tooltip: {
    //                 show: false
    //             },
    //             legend: {
    //                 show: false
    //             },
    //             toolbox: {
    //                 show: false
    //             },
    //             series: [{
    //                 name: '',
    //                 type: 'pie',
    //                 clockWise: false,
    //                 radius: [60, 65], //控制饼图大小
    //                 hoverAnimation: false,
    //                 itemStyle: {
    //                     normal: {
    //                         label: {
    //                             show: true,
    //                             position: 'outside',
    //                             color: '#ddd',
    //                             formatter: function(params) {

    //                                 var percent = 0;
    //                                 var total = 0;
    //                                 for (var i = 0; i < ytr_scaleData.length; i++) {
    //                                     total += ytr_scaleData[i].value;
    //                                 }
    //                                 percent = ((params.value / total) * 100).toFixed(0);
    //                                 if (params.name !== '') {
    //                                     return params.name + '\n{white|' + '占比' + percent + '%}';
    //                                 } else {
    //                                     return '';
    //                                 }
    //                             },
    //                             rich: {
    //                                 white: {
    //                                     color: '#ddd',
    //                                     align: 'center',
    //                                     padding: [5, 0]
    //                                 }
    //                             }
    //                         },
    //                         labelLine: {
    //                             show: false
    //                         }
    //                     }
    //                 },
    //                 data: ytr_data
    //             }]
    //         }

    //         if (ytr_option && typeof ytr_option === "object") {
    //             ytr_myChart.setOption(ytr_option, true);
    //         }



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
}
