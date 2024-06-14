var SSO_DOMAIN = 'http://my.jingzhou.gov.cn';

/**  
   刷新页面获取用户信息,已登录则返回用户信息，未登录则放过。
**/
$.refresh = function (){
	$.ajax({
		type: "get",                  
		url: "/SSOAPP/getLoginUser.do",                   
		dataType: "html",
		xhrFields: {
			withCredentials: true
		},
		success: function(result) { 
			if(result == "fail") {
				alert("暂不支持该域名!");
			}
			else if(result != "false") {           	                        	                       	 
				var obj = JSON.parse(result); 
				if(obj.user_type != null && obj.user_type != "") {

					if(obj.user_type=="1"){
						$("#login").html("<span>"+obj.name+"</span>");
					}else{
						$("#login").html("<span>"+obj.legal_name+"</span>");
					} 

					$("#login").attr("href", "http://zwfw.hubei.gov.cn/s/web/grkj/grkj_index.html");
					$("#zhuce").html('<span class="index-after" style="cursor:pointer;">退出</span>');
					$("#zhuce").unbind();
					$(".one_login").hide()
					
					//点击退出按钮触发退出方法
					$("#zhuce").click(function(){  
						$.logOut();
						//	window.location.reload();
					});
						
					if($(".one_userName").val() == "" || $.trim($(".one_userName").val()).length == 0 || $(".one_userName").val() !=obj.name || $(".one_userName").val() !=obj.legal_name){
						if(obj.user_type=="1"){
							$(".one_userName").val(obj.name);
						}else{
							$(".one_userName").val(obj.legal_name);	
						}
						$(".one_userName").attr("disabled","disabled");							
					}

					if($(".one_phone").val() == "" || $.trim($(".one_phone").val()).length == 0 || $(".one_phone").val() !=obj.mobile_phone){
						$(".one_phone").val(obj.mobile_phone);
						$(".one_phone").attr("disabled","disabled");
					}
				}	      
			}
		}
	});
}


/**  
sso登录。如未登录则返回false，然后跳到统一登录页面进行登录，携带appCode和gotoUrl过去。登录成功后返回用户信息即可。
**/
$.ssoLogin = function (appCode){
	//将url中的&符号替换成*号，避免登录完后&符号后的参数被过滤。
	var gotoUrl = decodeURIComponent(window.location.href);
	var reg = new RegExp("&","g");//g,表示全部替换。
	gotoUrl = gotoUrl.replace(reg, "*");
	//alert("gotoUrl:===="+gotoUrl);
	window.location.href = SSO_DOMAIN + '/SSOAPP/uias_login.do?appCode='+ appCode +'&gotoUrl='+ gotoUrl;
}

/*
 * 判断是否已登录，返回true则是已登录，反之则未登录。
 */
$.isLogin = function (){
	var isLogin = "" ;  
	$.ajax({
		async: false,  //设置同步，让外部方法获取到ajax返回的值。
		type: "get",                  
		url: "/SSOAPP/isLogin.do",
		dataType: "html",
		xhrFields: {
			withCredentials: true
		},
		success: function(result){
			isLogin = result;
		}
	});
	return isLogin;
}

/*
 * 登录退出，返回true则退出成功，反之则失败。
 */
$.logOut = function (){
	$.ajax({
		type: "get",                  
		url: "/SSOAPP/logout.do",                   
		dataType: "html",
		xhrFields: {
			withCredentials: true
    	},    
		success: function(result){ 
			if(result == "true"){
				window.location.reload();
			}
        },    
        error:function(data,type, err){
		  //console.log("ajax错误类型："+type);
		  //console.log(err);
		  // layer.alert("退出异常!");
		}
	});
}


/**
 * 添加监听事件，当通过后退按钮返回时刷新页面，获取登录状态。
 */
window.addEventListener('pageshow', function (event) {
	if (event.persisted || window.performance &&
	window.performance.navigation.type == 2) {
		location.reload();
	}
},false);

//表单提交前判断是否实名认证，实名则判断是否登陆，未登录需要先登录。
function isNeedLogin(){   	
	if($("#smfk").attr("class") =="fl cxz") {
		var result = $.isLogin();
		if(result=="true"){
			return true;
		}else{
			alert("实名反馈需要先登录");
			return false;
		}
	}
 }

//页面加载时触发
$(function() {
	//点击登录按钮触发登录方法
	$('#login').click(function(){
		$.ssoLogin(appCode);
	});

	//点击登录
	$(".one_login").click(function(){
		$.ssoLogin(appCode);
	});

	//点击注册
	$("#zhuce").click(function(){
		window.open("https://oauth.hubei.gov.cn:8443/hbyzw/zwfw/personInfo/personInfoReg.jsp?appCode="+ appCode);
	});

	//初始化数据
    $.refresh();
})