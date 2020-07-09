function load(orgname) {

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
    var time = Datenow();

    $("#date").attr("value", time);

    var bj_dom = document.getElementById("container5");
    var bjlx_dom = document.getElementById("container4");
    var bjlx_myChart = echarts.init(bjlx_dom);
    var bj_myChart = echarts.init(bj_dom);
    var bj_app = {};
    var bj_option = {
        title: {
            subtext: '报警数',
        },
        backgroundColor: '',
        color: ['#2adecf'],
        textStyle: {
            color: 'rgb(222,222,222)',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '18%',
            containLabel: true
        },
        yAxis: [{
                data: [

                ],

                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                }
            },
            {
                data: [

                ],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    formatter: '{value} 个',
                }
            }
        ],
        xAxis: [{
            type: 'value',
            name: '',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
                interval: 0
            },
        }],
        series: [{
            name: '',
            type: 'bar',
            barGap: '10%',
            barCategoryGap: '60%',
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 30, 30, 0],
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0, [{
                                offset: 0,
                                color: '#90e6ff'
                            },
                            {
                                offset: 1,
                                color: '#6eb2fe'
                            }
                        ]
                    )
                }
            },
            data: [

            ],
            zlevel: 11
        }]
    }

    if (bj_option && typeof bj_option === "object") {
        bj_myChart.setOption(bj_option, true);
    }



    var bjlx_app = {};
    var bjlx_scaleData = [{
            'name': '三相用电异常',
            'value': 0
        },
        {
            'name': '电流异常',
            'value': 0
        },
        {
            'name': '单相不平衡',
            'value': 0
        },

    ];

    var bjlx_data = [];
    for (var i = 0; i < bjlx_scaleData.length; i++) {
        bjlx_data.push({
            value: bjlx_scaleData[i].value,
            name: bjlx_scaleData[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    shadowBlur: 30,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                        offset: 0,
                        color: '#7777eb'
                    }, {
                        offset: 1,
                        color: '#70ffac'
                    }]),
                    shadowColor: 'rgba(142, 152, 241, 0.6)'
                }
            }
        }, {
            value: 4,
            name: '',
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        });
    }

    bjlx_option = {
        title: {
            subtext: '报警类型简图',
        },
        backgroundColor: '',
        tooltip: {
            show: false
        },
        legend: {
            show: false
        },
        toolbox: {
            show: false
        },
        series: [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [60, 65], //控制饼图大小
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < bjlx_scaleData.length; i++) {
                                total += bjlx_scaleData[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if (params.name !== '') {
                                return params.name + '\n{white|' + '占比' + percent + '%}';
                            } else {
                                return '';
                            }
                        },
                        rich: {
                            white: {
                                color: '#ddd',
                                align: 'center',
                                padding: [5, 0]
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: bjlx_data
        }]
    }

    if (bjlx_option && typeof bjlx_option === "object") {
        bjlx_myChart.setOption(bjlx_option, true);
    }

    $api.addEvt(select, 'click', function() {
        var datetime = document.getElementById('date');
        var valdatetime = datetime.value;

        getdate(orgname, valdatetime);

    });

}

function getdate(orgname, valdatetime) {
    loadAnimation_show();
    var show = 0;
    show++;
    var bj_dom = document.getElementById("container5");
    var bjlx_dom = document.getElementById("container4");
    var bjlx_myChart = echarts.init(bjlx_dom);
    var bj_myChart = echarts.init(bj_dom);



    $.ajax({
        url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
        type: "get",
        dataType: "json",
        async: false,
        data: { userName: orgname },
        //data: { userName: 'cy7oil' },
        contentType: "application/x-www-form-urlencoded",
        success: function(data) {
            var a = eval(data);
            //alert(JSON.stringify(a.Data[0].treeType));
            var b = a.Data[0].children;

            var wellname = new Array();
            var wellid = new Array();
            //b.length
            var dev = new Array();
            var shu = new Array();
            for (var y = 0; y < b.length; y++) {

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
                   // if( b[y].children.children !=null)
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
                    $.ajax({
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

                    });
                }
                wellid1.length = 0;
                wellname1.length = 0;

            }











            wellid.join(',');
            wellname.join(',');
            var dd = 'http://iot.zhdk.net:9000/Warning/GetWarningHistory?dateTime=' + valdatetime + '~' + valdatetime + '&name=' + wellname + '&id=' + wellid;
            //lert(dd);
            var bjsa = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            $.ajax({
                url: dd,
                type: "get",
                async: false,
                dataType: "json",
                data: { //userName: orgname
                },
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                    //if (ret) {
                    //alert(JSON.stringify(data));
                    var ret = eval(data);
                    if (ret.length < 1) {
                        api.toast({
                            msg: '该单位五无报警',
                            duration: 1000,
                            location: 'middle'
                        });
                    }
                    //alert(JSON.stringify(dev));
                    //alert(JSON.stringify(shu));
                    if (a.Data[0].treeType == 'sub') {
                        for (var i = 0; i < dev.length; i++) {
                            for (var x = 0; x < ret.length; x++) {
                                if (dev[i] == ret[x].describe) {
                                    //alert(JSON.stringify(ret[x].describe));
                                    shu[i] += 1;
                                }
                            }
                        }
                    }

                    for (var x = 0; x < ret.length; x++) {
                        switch (ret[x].catalog) {
                            case '1':
                                bjsa[0]++;
                                break;
                            case '2':
                                bjsa[1] += 1;
                                break;
                            case '3':
                                bjsa[2] += 1;
                                break;
                            case '4':
                                bjsa[3] += 1;
                                break;
                            case '5':
                                bjsa[4] += 1;
                                break;
                            case '6':
                                bjsa[5] += 1;
                                break;
                            case '7':
                                bjsa[6] += 1;
                                break;
                            case '11':
                                bjsa[7] += 1;
                                break;
                            case '12':
                                bjsa[8] += 1;
                                break;
                            case '13':
                                bjsa[9] += 1;
                                break;
                        }
                    }

                    //  } else {
                    //  alert('false');
                    //  }




                    bj_myChart.hideLoading();
                    bj_myChart.setOption({
                        yAxis: [{
                                data: dev,
                            },
                            {
                                data: shu,
                            }
                        ],
                        series: [{
                            data: shu
                        }]
                    });
                    dev.length = 0;
                    shu.length = 0;

                    var bjlx_scaleData = [{
                            'name': '电压不平衡',
                            'value': bjsa[0]
                        },
                        {
                            'name': '疑似单项盗电',
                            'value': bjsa[1]
                        },
                        {
                            'name': '总功率变化率过高',
                            'value': bjsa[2]
                        },
                        {
                            'name': '关井(机)',
                            'value': bjsa[3]
                        },
                        {
                            'name': '停电报警',
                            'value': bjsa[4]
                        },
                        {
                            'name': '离线（停电或离线）',
                            'value': bjsa[5]
                        },
                        {
                            'name': '疑似三相盗电',
                            'value': bjsa[6]
                        },
                        {
                            'name': '限值报警(越上限或越下限)',
                            'value': bjsa[7]
                        },
                        {
                            'name': '变化率报警',
                            'value': bjsa[8]
                        },
                        {
                            'name': '遥信变位报警',
                            'value': bjsa[9]
                        },


                    ];

                    var bjlx_data = [];
                    for (var i = 0; i < bjlx_scaleData.length; i++) {
                        bjlx_data.push({
                            value: bjlx_scaleData[i].value,
                            name: bjlx_scaleData[i].name,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    shadowBlur: 30,
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#7777eb'
                                    }, {
                                        offset: 1,
                                        color: '#70ffac'
                                    }]),
                                    shadowColor: 'rgba(142, 152, 241, 0.6)'
                                }
                            }
                        }, {
                            value: 4,
                            name: '',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: 'rgba(0, 0, 0, 0)',
                                    borderColor: 'rgba(0, 0, 0, 0)',
                                    borderWidth: 0
                                }
                            }
                        });
                    }



                    bjlx_option = {
                        title: {
                            subtext: '报警类型简图',
                        },
                        backgroundColor: '',
                        tooltip: {
                            show: false
                        },
                        legend: {
                            show: false
                        },
                        toolbox: {
                            show: false
                        },
                        series: [{
                            name: '',
                            type: 'pie',
                            clockWise: false,
                            radius: [60, 65], //控制饼图大小
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'outside',
                                        color: '#ddd',
                                        formatter: function(params) {
                                            var percent = 0;
                                            var total = 0;
                                            for (var i = 0; i < bjlx_scaleData.length; i++) {
                                                total += bjlx_scaleData[i].value;
                                            }
                                            percent = ((params.value / total) * 100).toFixed(0);
                                            if (params.name !== '') {
                                                return params.name + '\n{white|' + '占比' + percent + '%}';
                                            } else {
                                                return '';
                                            }
                                        },
                                        rich: {
                                            white: {
                                                color: '#ddd',
                                                align: 'center',
                                                padding: [5, 0]
                                            }
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: bjlx_data
                        }]
                    }

                    if (bjlx_option && typeof bjlx_option === "object") {
                        bjlx_myChart.setOption(bjlx_option, true);
                    }
                    show--;
                    if (show == 0) {
                        loadAnimation_hide();
                    }
                }
            });
        }

    });

}
