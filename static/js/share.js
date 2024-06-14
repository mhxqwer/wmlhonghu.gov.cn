   var desc = "荆州市人民政府门户网站";
   var title = document.title;
   var imgUrl ='http://ggzy.jingzhou.gov.cn/images/wx2.jpg'
   var link = window.location.href;

   var descStr = $("meta[name='Description']").attr("content"); //描述
   $.post("/api/zw/monitor/Intensification/get_gov_share",{rl:link},
     function(data,status){
        
         var obj = eval('(' + data + ')');
		
         wx.config({
         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
         appId: obj.appId, // 必填，公众号的唯一标识
         timestamp: obj.timestamp , // 必填，生成签名的时间戳
         nonceStr: obj.nonceStr, // 必填，生成签名的随机串
         signature: obj.signature,// 必填，签名
         jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
		});
		
		 
		 
		 wx.ready(function(){
             wx.updateAppMessageShareData({
                        title: title, // 分享标题
                        desc: descStr, // 分享描述
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功

                        }
                    });

                    wx.updateTimelineShareData({
                        title: title, // 分享标题
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                           
                        }
                    });
                });
        
         
     });
	
	
	
	
function getZcjd(){
    $.ajax({
      url: "/zwgk/api/content_center/document/list-data",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({ dept_id: 1, column_id: 43, page_index: 1, page_size: 9, is_contain_sub: true,has_related:true }),
      success: function (res) {
        if (res.code === 200) {
		  let htmlStr='';	
          let list = res.data.list
          if (list.length > 0) {
            let html=''
			for($i=0;$i<list.length;$i++){
              htmlStr+='<li>'
              htmlStr+='<a href="'+list[$i].pub_url+'" title="'+list[$i].title+'">'
			  if(list[$i].file_num!=undefined)
				  {
					 htmlStr+='<span class="jzgov-wenhao">'+list[$i].file_num+'</span>'
				  }
              
              htmlStr+= list[$i].title
			  
              if(list[$i].policyinterpretation!=undefined)
              {
				  
                 let gxlist=list[$i].policyinterpretation
				 
				 for($y=0;$y<gxlist.length;$y++){
					  htmlStr+=relateType(gxlist[$y])
				 }
              }
              if(list[$i].relatedpolicy)
              {
                  htmlStr+='<a href="'+list[$i].relatedpolicy+'" class="jzgov-wenjian"></a>'
              }
			  var rel_time=/\d{4}-\d{1,2}-\d{1,2}/g.exec(list[$i].rel_time)
              htmlStr+='</a>'
              htmlStr+='<span class="date">'
              htmlStr+= rel_time
              htmlStr+='</span>'
              htmlStr+='</li>'
			  
			  
            }
            $('#zfwsy_zcjd').append(htmlStr)
          } else {
            console.log("数据未加载");
          }
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
      }
    });
   }
   
 function getZxwj(){
      let col_40 = $.ajax({
        url: "/zwgk/api/content_center/document/list-data",
        method: "post",
        contentType: "application/json",
        async: false,
        data: JSON.stringify({ dept_id: 1, column_id: 40, page_index: 1, page_size: 9,has_related:true,filetype:"",subject_class:"0",t: Math.random() }),
        success: function (res40) {
        },
        error: function (xhr, status, error) {
          console.log(error);
        }
      });
      let col_42 = $.ajax({
        url: "/zwgk/api/content_center/document/list-data",
        method: "post",
        contentType: "application/json",
        async: false,
        data: JSON.stringify({ dept_id: 1, column_id: 42, page_index: 1, page_size: 9,has_related:true,filetype:"",subject_class:"0",t: Math.random() }),
        success: function (res42) {
        },
        error: function (xhr, status, error) {
          console.log(error);
        }
      });
      let data_all = []
      if (col_40.readyState == 4 && col_40.responseJSON.code == 200) {
        data_all = data_all.concat(col_40.responseJSON.data.list)
      }
      if (col_42.readyState == 4 && col_42.responseJSON.code == 200) {
        data_all = data_all.concat(col_42.responseJSON.data.list)
      }
      data_all.sort(function (a, b) {
        return Date.parse(b.rel_time) - Date.parse(a.rel_time);
      })
      if (data_all.length > 9) {
        data_all = data_all.slice(0, 9)
      }
      let htmlStr=''
	  for($i=0;$i<data_all.length;$i++){

	  
        htmlStr += '<li>'
        htmlStr += '<a href="' + data_all[$i].pub_url + '" title="' + data_all[$i].title + '">'
        if (data_all[$i].file_num != undefined) {
          htmlStr += '<span class="jzgov-wenhao">' + data_all[$i].file_num + '</span>'
        }
        htmlStr += data_all[$i].title
        if (data_all[$i].policyinterpretation != undefined) {

          let gxlist = data_all[$i].policyinterpretation
		  for($y=0;$y<gxlist.length;$y++){
			htmlStr+=relateType(gxlist[$y])
		  }
      
        }
        if (data_all[$i].relatedpolicy) {
          htmlStr += '<a href="' + data_all[$i].relatedpolicy + '" class="jzgov-wenjian"></a>'
        }
        var rel_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(data_all[$i].rel_time)
        htmlStr += '</a>'
        htmlStr += '<span class="jzgov-date">'
        htmlStr += rel_time
        htmlStr += '</span>'
        htmlStr += '</li>'
	}
      $('#zfwsy_zcwj').append(htmlStr)
    }
   
function relateType(gxitem)
    {
       let str='';
       switch (gxitem.Readingway) {
        case '文字方式':
        str='<a class="jzgov-jiedu" href="'+gxitem.pub_url+'" title="文字">文字</a>';
          break;
        case '图文方式':
        str='<a class="jzgov-jiedu" href="'+gxitem.pub_url+'" title="图文">图文</a>';
          break;   
        case '视频解读':
        str='<a class="jzgov-jiedu" href="'+gxitem.pub_url+'" title="图文">图文</a>';
          break; 
        case '媒体解读':
        str='<a class="jzgov-jiedu" href="'+gxitem.pub_url+'" title="媒体">媒体</a>';
          break;   
        case '政策问答':
        str='<a class="jzgov-jiedu" href="'+gxitem.pub_url+'" title="问答">问答</a>';
          break;           
        default:
        str=''
          break;
       }
       return str
    }
	