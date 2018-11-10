/**
 * Created by v_tjiaotang on 2017/6/14.
 */
var indexFun ={
    init:function(){
        this.ui 				= {};
        this.ui.score 			= $('.score');
        this.ui.body 			= $('body');
        this.ui.dataWrap 		= $('.data-wrap');
        this.regEvent();
        this.getCredit();
    },
    regEvent:function(){
        var _this = this;
    },
    popHide: function() {
        //$('.pop').hide();
    },
    popShow: function(id) {
        var p = $('#' + id);
        if (p) {
            p.show();
        }
    },
    getFormatTimeFromSeconds: function(seconds) {
        var dstDate = new Date(seconds*1000);
        var month = dstDate.getMonth()+1;
        if(month<10){
            month = '0'+ month;
        }
        var oDay = dstDate.getDate();
        if(oDay<10){
            oDay = '0'+ oDay;
        }
        var oHour = dstDate.getHours();
        if(oHour<10){
            oHour = '0'+ oHour;
        }
        var oMin = dstDate.getMinutes();
        if(oMin<10){
            oMin = '0'+ oMin;
        }
        return dstDate.getFullYear() +'.'+month + '.'+ oDay +' ' + oHour+':'+oMin;
    },
    getCredit :function(){
        var _this = this;
        var url_para = window.location.search.substring(1);
        console.log(url_para)
        $.ajax({
            url:'/cgi-bin/credit_score',
            //url:'js/test.json',
            data:{
                url_para:url_para
            },
            datatype: "json",
            type: "get",
            success: function(data) { //成功后回调
                if(data.ret==0){
                    var result = data.data;
                    var html = '';
                    console.log(data);
                    //var score = result.score+1;
                    if(result.history.length > 0) {
                        $('.nodata').hide();
                        for (var key in result.history) {
                            var change = result.history[key].change;
                            var list_score = result.history[key].score;
                            var class_name = 't_orange';
                            if (change > 0) {
                                change = '+' + change;
                                class_name = 't_yellow';
                            }
                            html += '<tr>' +
                                '<td width="29%"  class="bg_1a1">' + _this.getFormatTimeFromSeconds(parseInt(result.history[key].timestamp)) + '</td>' +
                                '<td width="18%"  class=' + class_name + '>' + change + '</td>' +
                                '<td width="18%" class="bg_1a2" >'  + list_score + '</td>' +
                                '<td width="35%" class="bg_1a3">' + result.history[key].reason + '</td>' +
                                '</tr>'
                        }
                    }
                    console.log(html)
                    _this.ui.score.text(result.score);
                    _this.ui.dataWrap.append(html);

                }else{
                    //$('.cont_data').hide();
                    $('.cont_buzy').show();
                }
            },
            error:function(err){
                //$('.cont_data').hide();
                $('.cont_buzy').show();
                console.log(err)
            }
        })
    },
    statistics:function(class_id){
        var param = this.paramChangeJson();
        $.ajax({
            url: "/statistic",
            data: {
                "sys_id": 1029,
                "type_id": 827,
                "sub_type": 2062,
                "user_id": param.openid ,
                "user_type": 0,
                "class_id":class_id,
            },
            datatype: "json",
            type: "get",
            async: true,
            success: function(result) {}
        })
    },
    paramChangeJson: function(){
        var json ={};
        var str= window.location.search;
        var arr = str.replace(/\?*/g,"").split("&");
        for(var  k  in  arr){
            var msg  =arr[k].split("=");
            json[msg[0]]=msg[1]
        }
        return json
    },
};
$(function(){
    indexFun.init();
});
