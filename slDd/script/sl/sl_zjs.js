
function load(ip, org) {
    //alert(org.changid + ',' + org.kuangid + ',' + org.duiid);
    var show = 0;
    show++;
    loadAnimation_show();


    api.ajax({
        url: 'http://' + ip + '/home/get_zjs',
        method: 'post',
        data: {
            values: {
                changid: org.changid,
                kuangid: org.kuangid,
                duiid: org.duiid
            },
            files: {
                file: 'fs://a.gif'
            }
        }
    }, function (ret, err) {
        if (ret) {
            data = eval(ret);
            var html = [];
            var html1 = [];
            var miningArea = [];
            for (var i = 0; i < data.listorg.length; i++) {
                var htmlthree = [];
                var mineWells = data.listorg[i].wellCount;
                var mineWellsStop = data.listorg[i].wellStopCount;
                miningArea.push(data.listorg[i].orgname);
                for (var k = 0; k < data.listorg[i].listorg.length; k++) {
                    var htmlwell = [];

                    if (data.listorg[i].listorg[k].listWells != null) {
                        for (var j = 0; j < data.listorg[i].listorg[k].listWells.length; j++) {
                            if (data.listorg[i].listorg[k].listWells[j].val === '1') {
                                var strWell = '<span>' + data.listorg[i].listorg[k].listWells[j].name + '</span>' +
                                    '<span style="float:right;color:red;margin-right:10px;">离线</span>' +
                                    '<hr data-am-widget="divider" class="am-divider am-divider-default hr_style" />';
                                htmlwell.push(strWell);
                            } else {
                                var strWell = '<span>' + data.listorg[i].listorg[k].listWells[j].name + '</span>' +
                                    '<hr data-am-widget="divider" class="am-divider am-divider-default hr_style" />';
                                htmlwell.push(strWell);
                            }

                        }

                    }

                    if (data.listorg[i].listorg[k].listWells === null) {
                        data.listorg[i].listorg[k].listWells = [];
                    }

                    var strThree = '<div class="am-panel am-panel-default">' +
                        '<div class="am-panel-hd" style="background-color:#ccc;text-align:center">' +
                        '<a class="am-panel-title"   data-am-collapse="{parent:"#accordion"}" href="#do-not-say-1-' + i + '-' + k + '">' +

                        data.listorg[i].listorg[k].orgname +
                        '</a>' +
                        '<span style="float:right">' +
                        '总井/离线：' + data.listorg[i].listorg[k].wellCount + '/' + data.listorg[i].listorg[k].wellStopCount +
                        '</span>' +
                        '</div>' +
                        '<div id="do-not-say-1-' + i + '-' + k + '" class="am-panel-collapse am-collapse">' +
                        htmlwell.join('') +
                        ' </div>' +
                        '</div>';
                    htmlthree.push(strThree);

                }

                var strHtml1 = '<div class="am-tab-panel am-fade am-in am-active" id="tab' + i + '">' +
                    '<div id="dui' + i + '" class="am-panel-group">' +
                    '<div class="am-panel-bd">' +
                    '<p id="mineWells" style=" text-align:center;color:orange;">总井/离线：：' + mineWells + '/' + mineWellsStop + '</p>' +
                    htmlthree.join('') +
                    '</div>' +
                    '</div>' +
                    '</div>';
                html1.push(strHtml1);

            }

            //改变数组顺序
            var swapArr = function (arr, i1, i2) {
                arr[i1] = arr.splice(i2, 1, arr[i1])[0];
                return arr;
            }
            var strHtml = [];
            // 井矿列表

          
            var strHtml = '<li><a href="#tab1">' + (miningArea[1] || '') + '</a></li>' +
                '<li class="am-active"><a href="#tab0">' + (miningArea[0] || '') + '</a></li>' +
                '<li><a href="#tab2">' + (miningArea[2] || '') + '</a></li>' +
                '<li><a href="#tab3">' + (miningArea[3] || '') + '</a></li>' +
                '<li><a href="#tab4">' + (miningArea[4] || '') + '</a></li>';

            html.push(strHtml);

            // html.unshift('<p>总井数'+sum(mineWells)+'</p>');
            // html += '<li><a href="#tab' + i + '">' + data.listorg[i].orgname + '</a></li>';

            var kuang1 = document.getElementById('kuang1');
            var kuang2 = document.getElementById('kuang2');
            $api.html(kuang1, html.join(''));
            $api.html(kuang2, html1.join(''));
            if (miningArea.length === 1) {
                let mineWellsEle = $api.dom('#mineWells');
                $api.remove(mineWellsEle);

            }
            show--;
            if (show === 0) {
                loadAnimation_hide();
            }


        } else {

        }

    });



}
