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
			alert("hello");
			var url = "/choice";    
			$(location).attr('href',url);


		});

	},
	locationcard:function()
	{
		$('.passcard').hover(function(){
	      $(this).stop(false,false).animate({'margin-bottom':'-100px'},400)
	    },function(){
	      $(this).stop(false,false).animate({'margin-bottom':'-320px'},400)
	    })


	}






};

$(document).ready(function(){
	btour.UI.clickedevents();
	btour.UI.appendloginpage();

});