function load(ip, id, org) {
    var datas = [];
    var page = 1;
    var size = 10;
    var total = 0;
    var UIListView = api.require('UIListView');

    UIListView.open({
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.frameHeight
        },
        data: datas,
        // rightBtns: [{
        //     bgColor: '#388e8e',
        //     activeBgColor: '',
        //     width: 70,
        //     title: '按钮',
        //     titleSize: 12,
        //     titleColor: '#fff',
        //     icon: '',
        //     iconWidth: 20
        // }],
        styles: {
            borderColor: '#696969',
            item: {
                bgColor: '#AFEEEE',
                activeBgColor: '#F5F5F5',
                height: 55.0,
                imgWidth: 40,
                imgHeight: 40,
                imgCorner: 4,
                placeholderImg: '',
                titleSize: 12.0,
                titleColor: '#000',
                subTitleSize: 12.0,
                subTitleColor: '#000',
                remarkColor: '#000',
                remarkSize: 16,
                remarkIconWidth: 30
            }
        },
        fixedOn: api.frameName
    }, function(ret, err) {
        if (ret) {
            //alert(JSON.stringify(ret));
        } else {
          //alert(JSON.stringify(err));
        }
    });


    //
    // UIListView.open({
    //     x: 0,
    //     y: 0,
    //     w: api.winWidth,
    //     h: api.frameHeight,
    //     borderColor: '#696969',
    //     cellBgColor: '#AFEEEE',
    //     cellSelectColor: '#F5F5F5',
    //     cellHeight: 55,
    //     data: datas,
    //     markStyle: {
    //         remarkMargin: 0,
    //         remarkColor: '#000000',
    //         remarkSize: 16
    //
    //     }
    // }, function(ret, err) {
    //     if (ret) {
    //
    //     } else {
    //
    //     }
    // });

    loadAnimation_show();
    var show = 0;
    show++;
    var datas = [];
    api.ajax({
        url: 'http://' + ip + '/home/get_dayWellInfo',
        method: 'post',
        data: {
            values: {
                wellid: id,
                page: page,
                size: size,
                random: Math.random()
            },
            files: {
                fileName: 'filePath'
            }
        }
    }, function(ret, err) {
        if (ret) {
            var str = eval(ret);
            for (var i = 0; i < str.length; i++) {
                data = {
                    title: '日期：' + str[i].datetime + '       时率：' + parseInt(str[i].timerate / 1440 * 100) + '%',
                    titleSize: 16,
                    titleColor: '#000000',
                    subTitleSize: 16,
                    subTitleColor: '#000000',
                    subTitle: '开井时长：' + str[i].openduration + '分钟',
                    subTitleLocation: 'center',

                }

                datas.push(data);
            }
            page++;
            UIListView.reloadData({
                data: datas
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
            //alert(JSON.stringify(err));

            //toast();
        }
    });
    api.addEventListener({
        name: 'swipeup',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function(ret, err) {
        if (page > 1) {
            if (page * size < total) {
                loadAnimation_show();
                var show = 0;
                show++;
                api.ajax({
                        url: 'http://' + ip + '/home/get_dayWellInfo',
                        method: 'post',
                        data: {
                            values: {
                                wellid: id,
                                page: page,
                                size: size,
                                random: Math.random()
                            },
                            files: {
                                fileName: 'filePath'
                            }
                        }
                    }, function(ret, err) {
                        if (ret) {
                            var str = eval(ret);
                            for (var i = 0; i < str.length; i++) {
                                data = {
                                    title: '日期：' + str[i].datetime + '       时率：' + parseInt(str[i].timerate / 1440 * 100) + '%',
                                    // titleSize: 16,
                                    // titleColor: '#000000',
                                    // subTitleSize: 16,
                                    // subTitleColor: '#000000',
                                    subTitle: '开井时长：' + str[i].openduration + '小时',
                                    // subTitleLocation: 'center',

                                }
                                datas.push(data);
                            }
                            page++;
                            UIListView.reloadData({
                                data: datas
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

                );
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
