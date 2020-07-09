// function load(orgname) {
// $.ajax({
//     url: 'http://iot.zhdk.net:9090/api/TreeApi/GetSimpleTree',
//     type: "get",
//     dataType: "json",
//     data: {
//         userName: orgname
//     },
//     contentType: "application/x-www-form-urlencoded",
//     success: function(data) {
//         var a = eval(data);
//         var wells1 = 0;
//         if (a.Data.length > 0) {
// var html="";
//             var b = a.Data[0].children;
//             //alert(JSON.stringify(b));
//             var ddlist = document.getElementById('ddlist');
//             for (var y = 0; y < b.length; y++) {
//                 if (b[y].children != null) {
//                   for(var i=0;i<b[y].children[0].children.length;i++)
//                   {
//                   html += '<li><div style="height: 30px;width: 97%">' +
//                       '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                       b[y].children[0].children[i].treeName +
//                       '</div>' +
//                       '</div></li><p style="height:10px"></p>';
//                     }

//                 } else {
//                     //alert(JSON.stringify(b[y]));
//                     for(var i=0;i< b.length;i++)
//                     {
//                     html += '<li><div style="height: 30px;width: 97%">' +
//                         '<div style="height: 30px;width: 97%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
//                          b[i].treeName +
//                         '</div>' +
//                         '</div></li><p style="height:10px"></p>';
// }
//                 }

//             }
//             $api.html(ddlist, html);
//         }
//       }
//     });
//     }


function load(orgname) {
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
    }},function(data){

            var a = eval(data);
            var wells1 = 0;
            if (a.Data.length > 0) {
                var html="";
                var b = a.Data[0].children;
                var ddlist = document.getElementById('ddlist');
                for (var y = 0; y < b.length; y++) {
                    if (b[y].children != null) {
                      for(var i=0;i<b[y].children[0].children.length;i++)
                      {
                      html += '<li><div style="width: 100%">' +
                          '<div style="width: 100%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                          b[y].children[0].children[i].treeName +
                          '</div>' +
                          '</div></li>';
                        }
                    } else {
                        //for(var i=0;i< b.length;i++)
                        //{
                        html += '<li><div style="width: 100%">' +
                            '<div style="width: 100%;font-size: 20px;border: 0.1px solid #99CCFF;color: #ffffff;text-align: center;">' +
                             b[y].treeName +
                            '</div>' +
                            '</div></li>';
  //  }
                    }

                }

                $api.html(ddlist, html);

            }

    }
   // contentType: "application/x-www-form-urlencoded",

    );
    }
