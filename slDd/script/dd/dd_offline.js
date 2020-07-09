function load(orgname) {
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
        }, function(ret, err) {
            if (ret) {
                var dat = JSON.parse(ret);
                var tj = 0;
                var td = 0;

                var data = eval('(' + dat + ')')
                data = JSON.stringify(data.data);
                //alert(data);
                data = data.substring(1, data.length - 1);
                //alert(data);
                data = data.split(',');
                //alert(data[0]);
                var html = "";
                for (var i in data) {

                    if (data[i].indexOf("\"-1\"") != -1) {
                        td++;
                        //alert(data[i].substring(1,data[i].length-6));
                        html += '<li><div style="height: 30px;width: 97%">' +
                            '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                            data[i].substring(1, data[i].length - 6) +
                            '</div>' +
                            '</div></li><p style="height:10px"></p>';
                    }
                }

            $api.html(ddlist, html);


        } else {

        }
    });
}
