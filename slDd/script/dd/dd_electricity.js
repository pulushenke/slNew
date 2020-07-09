function load(org) {

  $("#startdate").datepicker({
    format: 'yyyy-mm-dd', //显示格式
    language: 'zh-CN', //中文
    todayBtn: true,
    todayHighlight: true,
    forceParse: false,
    startView: 0,
    showMeridian: true,
    autoclose: true,
  });
  $("#enddate").datepicker({
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

  $("#startdate").attr("value", time);
  var startdatetime = document.getElementById('startdate');
  var startvaldatetime = startdatetime.value;
  $("#enddate").attr("value", time);
  var enddatetime = document.getElementById('enddate');
  var endvaldatetime = enddatetime.value;
  var orgname = org;
  getdata(orgname);
  var selectorgtwo = document.getElementById('selectorgtwo');
  var org;
  api.readFile({
    path: 'widget://script/orgwell2.json'
  }, function (ret, err) {
    if (ret) {
      org = jQuery.parseJSON(ret.data);
      //alert(data);
      $api.addEvt(select, 'click', function () {
        var valtwo = selectorgtwo.value;
        var startvaldatetime = startdatetime.value;
        var endvaldatetime = enddatetime.value;
        if (new Date(endvaldatetime) - new Date(startvaldatetime) >= 0) {
          var url = 'http://iot.zhdk.net:9000/OilForTwo/GetTheifAnalysisBySubstation?substation=' + valtwo + '&dateTime=' + startvaldatetime + "~" + endvaldatetime + "&r=" + Math.random()
          console.log(JSON.stringify(valtwo));
          console.log(JSON.stringify(startvaldatetime));
          console.log(JSON.stringify(endvaldatetime));
          api.ajax({
              url: url,
              method: "get",
              dataType: "json",
              //async: false,
              data: {
                values: {
                  userName: orgname
                },
                files: {
                  fileName: 'filePath'
                }
              }
            }, function (data) {

              data = eval(data);
              console.log(JSON.stringify(data));
              if (data) {
                var ddlist = document.getElementById('ddlist');
                var html = "";
                for (var i = 0; i < data.length; i++) {
                  for (var y = 0; y < org.length; y++) {
                    if (data[i].describe.search(org[y].name) != -1) {
                      orgtext = org[y].children[0] + "/" + org[y].children[1];

                    }

                  }
                  var sc = new Date(data[i].theifEnd) - new Date(data[i].theifBegin);
                  var hour = Math.floor(sc / (1000 * 60 * 60));
                  var minutes = Math.floor((sc - hour * 1000 * 60 * 60) / (1000 * 60));
                  var seconds = Math.floor((sc - hour * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
                  //alert(hour+","+minutes+","+seconds);
                  html += '<li><div style="width: 95%;height: 200px">' +
                    '<div style="float: left;width: 40%;height: 190px;text-align: center;">' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">部门：</div>' +
                    '<div style="height: 40px;border: 0.1px solid #99CCFF;color:#fff">井号：</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">开始时间：</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">结束时间：</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">时长：</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">窃电量：</div>' +
                    '</div>' +
                    '<div style="float: left;width: 60%;height: 190px;text-align: center;">' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + orgtext + '</div>' +
                    '<div style="height: 40px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].describe + '</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].theifBegin + '</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].theifEnd + '</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + hour + "时" + minutes + "分" + seconds + '秒</div>' +
                    '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].data + '</div>' +
                    '</div></div><p style="height:10px"></p></li>';

                }
                $api.html(ddlist, html);
              }

              //alert(data);


            }
            //data: { userName: 'cy7oil' },
            //contentType: "application/x-www-form-urlencoded",

          );

          // $.ajax({
          //   url: url,
          //   type: "get",
          //   dataType: "json",
          //   async: false,

          //   //data: { userName: 'cy7oil' },
          //   contentType: "application/x-www-form-urlencoded",
          //   success: function (data) {
          //     data = eval(data);

          //     var ddlist = document.getElementById('ddlist');
          //     var html = "";
          //     for (var i = 0; i < data.length; i++) {
          //       for (var y = 0; y < org.length; y++) {
          //         if (data[i].describe.search(org[y].name) != -1) {
          //           orgtext = org[y].children[0] + "/" + org[y].children[1];

          //         }

          //       }
          //       var sc = new Date(data[i].theifEnd) - new Date(data[i].theifBegin);
          //       var hour = Math.floor(sc / (1000 * 60 * 60));
          //       var minutes = Math.floor((sc - hour * 1000 * 60 * 60) / (1000 * 60));
          //       var seconds = Math.floor((sc - hour * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
          //       //alert(hour+","+minutes+","+seconds);
          //       html += '<li><div style="width: 95%;height: 200px">' +
          //         '<div style="float: left;width: 40%;height: 190px;text-align: center;">' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">部门：</div>' +
          //         '<div style="height: 40px;border: 0.1px solid #99CCFF;color:#fff">井号：</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">开始时间：</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">结束时间：</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">时长：</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">窃电量：</div>' +
          //         '</div>' +
          //         '<div style="float: left;width: 60%;height: 190px;text-align: center;">' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + orgtext + '</div>' +
          //         '<div style="height: 40px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].describe + '</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].theifBegin + '</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].theifEnd + '</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + hour + "时" + minutes + "分" + seconds + '秒</div>' +
          //         '<div style="height: 30px;border: 0.1px solid #99CCFF;color:#fff">' + data[i].data + '</div>' +
          //         '</div></div><p style="height:10px"></p></li>';

          //     }
          //     $api.html(ddlist, html);
          //     //alert(data);
          //   }
          // });
        } else {
          api.toast({
            msg: '开始时间不能超过结束时间',
            duration: 1000,
            location: 'middle'
          });

        }
      });

    }
  });
}

function getdata(orgname) {
  api.ajax({
      url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
      method: "get",
      dataType: "json",
      //async: false,
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
      //alert(JSON.stringify(a));
      //alert(JSON.stringify(a.Data[0].treeType));
      var b = a.Data[0];
      var html = "";
      if (b.treeType == 'depParent') {
        for (var i = 0; i < b.children.length; i++) {
          // if (b[i].children != null && b[i].children.children !=null){
          html += "<option value=\"" + b.children[i].children[0].treeId + "\">" + b.children[i].treeTag + "</option>";
          // }

        }
      } else {
        html += "<option value=\"" + b.treeId + "\">" + b.treeTag + "</option>";
      }
      var selectorgtwo = document.getElementById('selectorgtwo');
      $api.html(selectorgtwo, html);

    }
    //data: { userName: 'cy7oil' },
    //contentType: "application/x-www-form-urlencoded",

  );
}



//   function getdata(orgname)
// {
//   $.ajax({
//       url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
//       type: "get",
//       dataType: "json",
//       async: false,
//       data: { userName: 'cy7oil' },
//       //data: { userName: 'cy7oil' },
//       contentType: "application/x-www-form-urlencoded",
//       success: function(data) {
//           var a = eval(data);
//           //alert(JSON.stringify(a));
//           //alert(JSON.stringify(a.Data[0].treeType));
//           var b = a.Data[0];
//           var html="";
//           if(b.treeType=='depParent')
//           {
//             for(var i=0;i<b.children.length;i++)
//             {
//               html += "<option value=\"" + b.children[i].children[0].treeId + "\">" + b.children[i].treeTag + "</option>";
//             }
//           }
//           else {
//             html += "<option value=\"" + b.treeId + "\">" + b.treeTag + "</option>";
//           }
//           var selectorgtwo = document.getElementById('selectorgtwo');
//           $api.html(selectorgtwo, html);
//         }
//       });
// }