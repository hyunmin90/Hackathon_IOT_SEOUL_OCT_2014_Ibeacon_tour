var btour={};

btour.UI=
{
	appendloginpage:function()
	{	
		var userid=$(".uin").attr("id");
		var i=0;
		request = $.ajax
		({
        url: "http://ec2-54-64-134-27.ap-northeast-1.compute.amazonaws.com:3000/userdatas/"+userid+"/cards", 	//Json데이터를 받아올 주소 
        type: "get",
        dataType:"json",
	        success: function(results)
	        {
	        	while(results[i]!=null)
	            {
	            	$(".pocket").append('<div class="passcard paper">'+results[i].location+'</div>');
	            	i++;}
	            btour.UI.locationcard();
	        }




    	});

	},
	clickedevents:function()
	{	

		$(".add").click(function(){
			var userid=$(".uin").attr("id");
			var url = "/choice/"+userid;    
			$(location).attr('href',url);


		});
		$("#searchicon").click(function(){
			var userid=$("#userid").attr("src");
			var url = "/search/"+userid;    
			$(location).attr('href',url);

		});



		$(".mapBtnGrounp").click(function(e){

			var btnName = $(e.target).attr('id');
			console.log(btnName);
			if(btnName='mapBtn1'){

				//$('#mapIframe').attr('src','http://maps.google.com/maps?q='+location+'&output=embed&hl=en');
			}
		});

	},
	locationcard:function()
	{
		$('.passcard').hover(function(){
	      $(this).stop(false,false).animate({'margin-bottom':'-100px'},400)
	    },function(){
	      $(this).stop(false,false).animate({'margin-bottom':'-320px'},400)
	    })


	},
	firesearch:function()
	{
		 $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too premptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });

	},

	doneTyping:function(){
		var searchterm= $("#search").val();
		request = $.ajax({
        						url: "http://ec2-54-64-134-27.ap-northeast-1.compute.amazonaws.com:3000/search/location/"+searchterm, 	//Json데이터를 받아올 주소 
        						type: "get",
        						dataType:"json",
	       							success: function(results)
	        						{
	        							var i =0;
	        							while(results[i]!=null)
	        							{
	        								$("#searcheditem").append("<div onclick='location.href='/recommend/shopping'' class='list-item col-xs-12'><img alt='shopping' src="+results[i].imageURL+"><p href='/userdatas/"+results[i].location+"/addspotcard/"++"'>"+results[i].location+"</p></div>");
	        								i++;
	        							}
	        						}
    						});

	}
  





};

$(document).ready(function(){
	btour.UI.clickedevents();
	btour.UI.appendloginpage();
	btour.UI.firesearch();
	$('#search').donetyping(function(){
  	btour.UI.doneTyping();
});

});