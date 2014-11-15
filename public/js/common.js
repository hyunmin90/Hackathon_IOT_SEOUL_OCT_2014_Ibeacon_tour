var btour={};

btour.UI=
{
	appendloginpage:function(userid)
	{
		request = $.ajax
		({
        url: "http://ec2-54-64-134-27.ap-northeast-1.compute.amazonaws.com:3000/userdatas/"+userid+"/cards", 	//Json데이터를 받아올 주소 
        type: "get",
        dataType:"json",
	        success: function(results)
	        {
	        	while(results[i]!=null)
	            {alert(results[i]);
	            	i++;}
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

	}



};

$(document).ready(function(){
	btour.UI.clickedevents();

});