(function($){
    /**
     * 给JQUERY对象添加方法(调用方法：实例化对象.+方法名----->$('').fun()
     */
    /**
     * 国务院要闻
     * @param options
     */

    $.fn.getGWYYW = function(options, callBack){
        var defaults = {
            hbyw: '',
            length: 32, //字数
             count: 6,  //数据条数
            timeFormat: 'Y-M-D', //时间格式
            htmlFormat: '<li><span>{3}</span><i>></i> <a href="{0}" title="{2}" target="_blank">{1}</a></li>'
        };
        var opts = $.extend({},defaults, options);
        var obj = this;
        $.ajax({
            url : 'http://www.gov.cn/pushinfo/v150203/pushinfo.jsonp',
            dataType : "jsonp",
            jsonp : "pushInfoJsonpCallBack",
            jsonpCallback:"pushInfoJsonpCallBack",
            timeout:10000,
            success : function(data) {
                $.each(data,function(i,json){
                    if(i > opts.count-1) return;
                    var title = json.title;
                    if(title.length > opts.length){
                        title = title.substr(0, opts.length) + "...";
                    }
                    obj.append($.stringFormat(opts.htmlFormat, json.link, title, json.title, $.formatTime(new Date(json.pubDate.replace(/-/g,"/")).getTime(), opts.timeFormat)));
                });
               if(opts.hbyw != ''){
                    $(opts.hbyw).getHBYW(opts);
                }
                if (opts.szyw != '') {
                    $(opts.szyw).getSZYW(opts);
                }
            },
            error : function(){
				 if(opts.hbyw != ''){
                    $(opts.hbyw).getHBYW(opts);
                }
                console.log("国务院要闻接口错误");
            }
        });
    };

    /**
     * 湖北要闻
     */
    $.fn.getHBYW = function(options){
        var defaults = {
            length: 32, //字数
            count: 6,  //数据条数
            timeFormat: 'Y-M-D', //时间格式
            htmlFormat: '<li><span>{3}</span><i>></i> <a href="{0}" title="{2}" target="_blank">{1}</a></li>'
        };
        var opts = $.extend({},defaults, options);
        var obj = this;
        $.ajax({
            url : 'http://www.hubei.gov.cn/zwgk/hbyw/hbywqb/pushinfo.jsonp',
            dataType : "jsonp",
            jsonp : "pushInfoJsonpCallBack",
            jsonpCallback:"pushInfoJsonpCallBack",
            timeout:10000,
            success : function(data) {
                $.each(data,function(i,json){
                    if(i > opts.count-1) return;
                    var title = json.title;
                    if(title.length > opts.length){
                        title = title.substr(0, opts.length) + "...";
                    }
                    obj.append($.stringFormat(opts.htmlFormat, json.link, title, json.title, $.formatTime(new Date(json.pubDate.replace(/-/g,"/")).getTime(), opts.timeFormat)));
                });
            },
            error : function(){
                console.log("湖北要闻接口错误");
            }
        });
    };

    /**
     * 
     * 时政要闻JSONP
     */
    $.fn.getSZYW = function (options) {
        var defaults = {
            length: 32, //字数
            count: 6,  //数据条数
            timeFormat: 'Y-M-D', //时间格式
            htmlFormat: '<li><span>{3}</span><i>></i> <a href="{0}" title="{2}" target="_blank">{1}</a></li>'
        };
        var opts = $.extend({}, defaults, options);
        var obj = this;
        $.ajax({
            url: 'http://www.hubei.gov.cn/szyw/pushinfonodes.jsonp',
            dataType: "jsonp",
            jsonp: "pushInfoJsonpCallBack",
            jsonpCallback: "pushInfoJsonpCallBack",
            timeout: 1000,
            success: function (data) {
                $.each(data, function (i, json) {
                    if (i > opts.count - 1) return;
                    var title = json.title;
                    if (title.length > opts.length) {
                        title = title.substr(0, opts.length) + "...";
                    }
                    obj.append($.stringFormat(opts.htmlFormat, json.link, title, json.title, $.formatTime(new Date(json.pubDate.replace(/-/g, "/")).getTime(), opts.timeFormat)));
                });
            },
            error: function () {
                console.log("时政要闻接口错误");

            }
        });
    }

    /**
     * 荆州要闻
     */
    $.fn.getJZYW = function(options){
        var defaults = {
            length: 32, //字数
            count: 6,  //数据条数
            timeFormat: 'Y-M-D', //时间格式
            htmlFormat: '<li><span>{3}</span><i>></i> <a href="{0}" title="{2}" target="_blank">{1}</a></li>'
        };
        var opts = $.extend({},defaults, options);
        var obj = this;
        $.ajax({
            url : 'http://www.jingzhou.gov.cn/zfwxw/jzyq/pushinfo_493.json',
            dataType : "jsonp",
            jsonp : "pushInfoJsonCallBack",
            jsonpCallback:"pushInfoJsonCallBack",
            timeout:10000,
            success : function(data) {
                $.each(data,function(i,json){
                    if(i > opts.count-1) return;
                    var title = json.title;
                    if(title.length > opts.length){
                        title = title.substr(0, opts.length) + "...";
                    }
                    obj.append($.stringFormat(opts.htmlFormat, json.link, title, json.title, $.formatTime(new Date(json.pubDate.replace(/-/g,"/")).getTime(), opts.timeFormat)));
                });
            },
            error : function(){
                console.log("湖北要闻接口错误");
            }
        });
    };

    /**
     * 
     * 时政要闻
     */

    $.fn.getSZTW = function (options) {
        var defaults = {
            length: 32, //字数
            count: 6,  //数据条数
            timeFormat: 'Y-M-D', //时间格式
            htmlFormat: '<li><span>{3}</span><i>></i> <a href="{0}" title="{2}" target="_blank">{1}</a></li>'
        };
        var opts = $.extend({}, defaults, options);
        var obj = this;
        $.ajax({
            url: 'szyw_api/pushinfo.json',
            success: function (data) {
                $.each(data, function (i, json) {
                    if (i > opts.count - 1) return;
                    var title = json.title;
                    if (title.length > opts.length) {
                        title = title.substr(0, opts.length) + "...";
                    }
                    obj.append($.stringFormat(opts.htmlFormat, json.link, title, json.title, $.formatTime(new Date(json.pubDate.replace(/-/g, "/")).getTime(), opts.timeFormat)));
                });
            },
            error: function () {
                console.log("时政要闻接口错误");
            }
        });
    };

    /**
     * 获取json数据分页html拼接
     * 调用方法：$("#page").jsonToPageHtml({ pageIndex: index, pageSize: 20, total:108, totalPages:11, pageNum:10}, function(index){ });
     */
    $.fn.jsonToPageHtml = function(options, callBack){
        var defaults = {
            funName: "",//获取数据函数
            pageIndex: 1,//当前页
            pageSize: 20,//每页显示记录数
            total: 0,//总记录数
            totalPages: 1,//总页码数
            pageNum: 5,//显示页数
            isShowTotal: false,//是否显示总记录数
            isShowPageTotal: true,//是否显示总页数
            isShowHomeLast:true,//是否显示首页和尾页
            strHome:'首页',
            strLast:'尾页',
            strPrev:'上一页',
            strNext:'下一页'
        };
        var opts = $.extend({},defaults, options);

        function init(index){
            var html = '';
            if(opts.total <= opts.pageSize){
                return html;
            }
            if(opts.isShowTotal)
                html += '<span>总共'+ opts.total +'条数据</span>';
            if(opts.isShowPageTotal)
                html += '第<span>'+ index +'/'+ opts.totalPages +'</span>页';

            if(index == 1){
                html += '<a class="disabled">'+ opts.strHome +'</a>';
                html += '<a class="disabled">'+ opts.strPrev +'</a>';
            }else{
                html += '<a  data-page="1">'+ opts.strHome +'</a>';
                html += '<a  data-page="'+ (index-1) +'">'+ opts.strPrev +'</a>';
            }
            var num = parseInt(opts.pageNum/2);
            var startPage = (opts.totalPages <= opts.pageNum || index <= num) ? 1 : (parseInt(index) + num >= opts.totalPages ? parseInt(opts.totalPages) - parseInt(opts.pageNum) + 1 : parseInt(index) - num + (opts.pageNum % 2 == 0 ? 1: 0));
            var endPage = parseInt(index) + num >= opts.totalPages ? parseInt(opts.totalPages) : (index <= num ? parseInt(opts.pageNum) : parseInt(index) + num);
            for(var i = startPage; i <= endPage; i++){
                if(i == index) {
                    html += '<a class="active">'+ i +'</a>';
                }else{
                    html += '<a  data-page="'+ i +'">'+ i +'</a>';
                }
            }
            if(index == opts.totalPages){
                html += '<a class="disabled">'+ opts.strNext +'</a>';
                html += '<a class="disabled">'+ opts.strLast +'</a>';
            }else{
                html += '<a  data-page="'+ (parseInt(index)+1) +'">'+ opts.strNext +'</a>';
                html += '<a  data-page="'+ opts.totalPages +'">'+ opts.strLast +'</a>';
            }
            return html;
        }
        this.html(init(opts.pageIndex));
        this.find('a').click(function(){
            if(typeof callBack == 'function'){
                callBack($(this).data('page'));
            }
        });
    }

    /**
     * 分页html拼接
     * 调用方法：$("#page").pageHtml({ currIndex:9, pageTotal: 11, total:108, pageFileName: 'index', pageFileExt: 'html'});
     */
    $.fn.pageHtml = function(options){
        var defaults = {
            pageTotal: 0,// 总页数
            total:0,//总记录数
            currIndex: 0,// 当前页
            pageFileName: 'index',// 分页文件名称
            pageFileExt: 'html',// 分页文件后缀名，不需要“.”
            isShowPageNum: true,// 是否显示页码数
            isShowTotal: false,//是否显示总记录数
            isShowHomeLast:true,
            strPrev: '上一页',
            strNext: '下一页',
            strHome: '首页',
            strLast: '尾页'
        };
        var opts = $.extend({},defaults, options);

        function init(index){
            opts.pageFileName = opts.pageFileName.toLowerCase();
            opts.pageFileExt = opts.pageFileExt.toLowerCase();

            if(opts.pageTotal == null || opts.pageTotal <= 1){//如果总页数小于1页则不输出分页项
                return '';
            }
            var startNum = 1;//记录显示的第一页位置
            var endNum = opts.pageTotal < 10 ? parseInt(opts.pageTotal) : 10;//记录显示的最后一页位置

            var html = '';
            if(opts.isShowTotal)
                html += '<span>总共'+ opts.total +'条数据</span> ';
            if(opts.isShowPageNum)
                html += '第<span>'+ (parseInt(index) + 1) +'/'+ opts.pageTotal +'</span>页 ';

            if(opts.pageTotal >= 2 && index >= 1){ //上一页
                if(opts.isShowHomeLast)
                    html +=  '<a href="'+ opts.pageFileName + '.'+ opts.pageFileExt +'">'+ opts.strHome+'</a>';
                if(index == 1)
                    html += '<a href="'+ opts.pageFileName + '.'+ opts.pageFileExt +'">'+ opts.strPrev +'</a>';
                else
                    html += '<a href="'+ opts.pageFileName + '_'+ (index-1)+ '.'+ opts.pageFileExt + '">'+ opts.strPrev + '</a>';
            }

            if(index == 0) {
                if(opts.isShowHomeLast)
                    html += '<a class="disabled">'+ opts.strHome +'</a>';
                html += '<a class="disabled">' + opts.strPrev + '</a><a class="active">1</a>';
            }

            else if(index < 5)
                html += '<a href="'+ opts.pageFileName + '.'+ opts.pageFileExt +'">1</a>';

            if(opts.pageTotal > 10 && index > 5){//如果总分页数大于15页，则仅显示当前页前后7条数据
                endNum = index + 5 > opts.pageTotal ? parseInt(opts.pageTotal) : parseInt(index) + 5;
            }
            if(index > 5){
                startNum = index - 5;
            }
            for(var i = startNum; i < endNum; i++){//循环输出页码数
                if(index == i)
                    html += '<a class="active">'+ (i + 1) + '</a>';
                else
                    html += '<a href="'+ opts.pageFileName + '_' + i + '.' + opts.pageFileExt +'" >'+ (i + 1) +'</a>';
            }
            if(opts.pageTotal >= 2 && index != opts.pageTotal - 1){//判断输出下一页标识
                html += '<a href="'+ opts.pageFileName + '_' + (parseInt(index) + 1) + '.' + opts.pageFileExt +'">'+ opts.strNext +'</a>';
                if(opts.isShowHomeLast)
                    html += '<a href="'+ opts.pageFileName + '_' + (opts.pageTotal - 1) + '.' + opts.pageFileExt +'">'+ opts.strLast+'</a>';//尾页
            }

            if(index == opts.pageTotal - 1){
                html += '<a class="disabled">'+ opts.strNext +'</a>';
                if(opts.isShowHomeLast)
                    html += '<a class="disabled">'+ opts.strLast+'</a>';//尾页
            }
            return html;
        }

        this.html(init(opts.currIndex));
    };

    /**
     * 扩展jquery本身(调用方法：$.+方法名----->$.fun())
     */
    $.extend({
        /**
         * 字符串替换
         * @returns {*}
         */
        stringFormat: function() {
            if (arguments.length == 0)
                return null;
            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        },
        /**
         * 截取部分字符串
         * @param str 字符串
         * @param len 截取长度
         * @returns {*}
         */
        cutString: function(str, len){
            var str_length = 0;
            var str_len = 0;
            str_cut = new String();
            str_len = str.length;
            for (var i = 0; i < str_len; i++) {
                a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    //中文字符的长度经编码之后大于4
                    str_length++;
                }
                str_cut = str_cut.concat(a);
                if (str_length >= len) {
                    str_cut = str_cut.concat("...");
                    return str_cut;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；
            if (str_length < len) {
                return str;
            }
        },
        /**
         * 获取Url参数
         * @param variable 参数名称
         * @returns {*}
         */
        getQuery: function(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
        /**
         * 时间戳转化为年 月 日 时 分 秒 毫秒
         * number: 传入时间戳
         * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
         * 调用方法：$.formatTime('1571309718000', 'Y-M-D h:m')
         */
        formatTime : function (number,format) {

            var formateArr  = ['Y','M','D','h','m','s'];
            var returnArr   = [];

            var date = new Date(number*1);
            returnArr.push(date.getFullYear());
            returnArr.push(this.formatNumber(date.getMonth() + 1));
            returnArr.push(this.formatNumber(date.getDate()));

            returnArr.push(this.formatNumber(date.getHours()));
            returnArr.push(this.formatNumber(date.getMinutes()));
            returnArr.push(this.formatNumber(date.getSeconds()));

            for (var i in returnArr)
            {
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        },
        //数据转化
        formatNumber : function (n) {
            if(n < 10) return "0"+ n;
            return n;
        },

        tabChange: function tabchange(obj,id) {
            var arrayli = obj.parentNode.getElementsByTagName("li"); //获取li数组
            var arrayul = document.getElementById(id).getElementsByTagName("ul"); //获取ul数组
            for(var i=0; i < arrayul.length; i++){
                if(obj==arrayli[i]){
                    arrayli[i].className = "cli2";
                    arrayul[i].className = "";
                }else{
                    arrayli[i].className = "";
                    arrayul[i].className = "hidden";
                }
            }
        },
        goSite: function(obj){
            if(obj.selectedIndex != 0){
                var sUrl = obj.options[obj.selectedIndex].value;
                obj.selectedIndex = 0;
                if(sUrl != ''){
                    if(confirm('您所访问的页面将跳转到第三方网站，可能会有安全风险,确定要继续吗?')){
                        window.open(sUrl,'_blank');
                    }
                }
            }
        },
        //登陆
        userLogin: function(siteId){
            window.open("http://my.jingzhou.gov.cn/personalCenter/?siteid="+ siteId +"#/login");
        },
        //注册
        userRegister: function(siteId){
            window.open("http://my.jingzhou.gov.cn/personalCenter/?siteid="+ siteId +"#/register");
        },
        //领导信箱
        leadMsgBox: function(siteId){
            window.open("http://my.jingzhou.gov.cn/personalCenter/?siteid="+ siteId +"#/personalctr/mymailbox/addmail");
        },
        //依申请公开
        yiShenQing: function(siteId){
            window.open("http://my.jingzhou.gov.cn/personalCenter/?siteid="+ siteId +"#/personalctr/myapplicant/list");
        }
    });
	

	
	
	
	
})(jQuery);


		var timestamp = Date.parse(new Date());
		if(timestamp>1585929600000 && timestamp<=1586015999000)
		{
        var style = document.createElement("style");
        style.type = "text/css";
        try{
        　　style.appendChild(document.createTextNode("body{ filter:gray;} html{filter: grayscale(100%); -webkit-filter:grayscale(100%);}"));

        }catch(ex){
        　　style.styleSheet.cssText = "body{ filter:gray;} html{filter: grayscale(100%); -webkit-filter:grayscale(100%);}";//针对IE
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
		
		
		
		var script=document.createElement("script");  
		script.type="text/javascript";  
		script.src="http://www.hubei.gov.cn/material/2019/js/grayscale.js";  
		document.getElementsByTagName('head')[0].appendChild(script);  
		
		$(document).ready(function(){
         var navStr = navigator.userAgent.toLowerCase();
         if(navStr.indexOf("msie 10.0")!==-1||navStr.indexOf("rv:11.0")!==-1){ 
                 
                        grayscale(document.body);
                        
                    }
		});
		
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		


