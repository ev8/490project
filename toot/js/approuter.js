function newassignment(){
	var data= {"action":"createassignment","type":"event","kind":"assignment","pid":$("#pid").val(),"ptype":"week","name":$("#Field1").val(),"description":$("#Field3").val(),"end_date":$("#enddate").val(),"start_date":" "};
    ajaxrequest(data);
}

$( document ).ready(function() {$("#logonbtn").attr("onclick",'login($("#username").val(),$("#pass").val());');$("#logout").attr("onclick",'logout();');
});

function set_loc(theURL) {
loc = theURL;
}
//globals for user identificationfunction ajaxFileUpload()
	{
               
		$("#loading")
		.ajaxStart(function(){
			$(this).show();
		})
		.ajaxComplete(function(){
			$(this).hide();
		});

		$.ajaxFileUpload
		(
			{
				url:'http://localhost/clientproxy.php',
				secureuri:false,
				fileElementId:'fileToUpload',
				dataType: 'json',
				data:{upload:'uploadfile'},
				success: function (data, status)
				{
					if(typeof(data.error) != 'undefined')
					{
						if(data.error != '')
						{
							alert(data.error);
						}else
						{
							alert(data.msg);
						}
					}
				},
				error: function (data, status, e)
				{
					alert(e);
				}
			}
		)
		
		return false;

	}
	function ajaxFileUpload2()
	{
               
		$("#loading")
		.ajaxStart(function(){
			$(this).show();
		})
		.ajaxComplete(function(){
			$(this).hide();
		});

		$.ajaxFileUpload
		(
			{
				url:'http://localhost/clientproxy.php',
				secureuri:false,
				fileElementId:'fileToUpload',
				dataType: 'json',
				data:{upload:'uploadfile'},
				success: function (data, status)
				{
					
					if(typeof(data.error) != 'undefined')
					{
						if(data.error != '')
						{
							
							alert(data.error);
						}else
						{
							
							alert(data.msg);
							
						}
					}
					window.history.back();
				},
				error: function (data, status, e)
				{
					alert(e);
				}
			}
		)
		
		return false;

	}
var userid= null;
var auth =null;
function logout() {
    var data= {"action":"logout"};
    ajaxrequest(data);
}
// Handler for .ready() called.




//setup crossroads/a hash library for interpreting hash urls
function login(user, pass) {
    var data= {"action":"login","ucid":user,"pass":pass};
  
    ajaxrequest(data);
    window.location.href = "#home";
}
crossroads.addRoute('logon',function(){//called when user navigaes to home page
   
});
crossroads.addRoute('',function(){

    $("#maincol_container").html('<div class="maincol"><table id="logtable"><tr><td>user name: </td><td><input type="text" id="username"></td></tr><tr><td>password: </td><td><input type="password" id="pass"></td></tr><tr><td><button id="logonbtn" type="button">login</button></td><td><button id="forgot" type="button">forgot password</button></td></tr></table></br><p id="error"></p></div><div class="maincol_bottom"></div>' );
    $("#nav").html('<div class="overview">welcome to toodle, please log in.</div>');
    $("#logonbtn").attr("onclick",'login($("#username").val(),$("#pass").val());');
});
crossroads.addRoute('home',function(){
    
    var data ={"action":"gethome"};
    ajaxrequest(data);
});crossroads.addRoute('editweek/{id}',function(id){

    var data ={"action":"editweek","id":id};

    ajaxrequest(data);

});
crossroads.addRoute('term/{id}',function(id){
    var data ={"action":"getterm","id":id};
    ajaxrequest(data);
});
crossroads.addRoute('course/{id}',function(id){
    var data ={"action":"getcourse","id":id};
    ajaxrequest(data);
});
crossroads.addRoute('assignment/{id}',function(id){
  var data ={"action":"getassigment","id":id};

    ajaxrequest(data);
});
crossroads.addRoute('forums/{id}',function(id){ var data ={"action":"getforums","id":id};

    ajaxrequest(data);

});
crossroads.addRoute('forum/{id}',function(id){ var data ={"action":"getforum","id":id};

    ajaxrequest(data);
 
});
crossroads.addRoute('thread/{id}',function(id){

 var data ={"action":"getthread","id":id};

    ajaxrequest(data);
 

});
crossroads.addRoute('forums/reply/{id}',function(id){

});
crossroads.addRoute('events/{id}',function(id){


});
crossroads.addRoute('forum/view/{id}/{id2}',function(id,id2){ 
 
});
crossroads.addRoute('forum/reply/{id}/{id2}',function(id,id2){ 

});
crossroads.addRoute('quizes/{id}',function(id){
  

});crossroads.addRoute('addfile/{id}',function(id){


	  $('#page').html(  '<input id="fileToUpload" type="file" size="45" name="fileToUpload" class="input"><button class="button" id="buttonUpload" onclick="return ajaxFileUpload2();">Upload</button>');

});
crossroads.addRoute('quizes/take/{id}',function(id){

});

crossroads.addRoute('logout', function(){//called when user navigaes to logout
   
});
crossroads.addRoute('deleteevent/{id}', function(id){//called when user navigaes to logout
var data ={"action":"deleteevent","id":id};

    ajaxrequest(data);
   

});
crossroads.addRoute('deletefile/{id}', function(id){//called when user navigaes to logout
var data ={"action":"deletefile","id":id};

    ajaxrequest(data);});

crossroads.addRoute('addassignment/{id}', function(id){//called when user navigaes to logout
	$('#page').html('<div><input type="hidden" id="start" value=" "/><input type="hidden" id="pid" value="'+id+'"/>assignment name:</br> <textarea id="Field1" class="field textarea medium"  tabindex="5" cols="50" rows="1" spellcheck="true" name="Field1" ></textarea></br>description : </br><textarea id="Field3" class="field textarea medium"  tabindex="5" cols="50" rows="10" spellcheck="true" name="Field3" ></textarea></br>duedate :</br><input type="datetime-local"  id ="enddate" /><button id="assignment" type="button">add assignment</button></div>');
   $( "#assignment" ).attr("onclick",'newassignment();');

});

//log all routes
 
//setup hasher
 
//only required if you want to set a default value// sets a default url 

 
function parseHash(newHash, oldHash){
// second parameter of crossroads.parse() is the "defaultArguments" and should be an array
// so we ignore the "oldHash" argument to avoid issues.
crossroads.parse(newHash);
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
 
hasher.init(); //start listening for hash changes
