
var list = [];
var not = 0;


window.onload = function ()
{
  rebuild();
}

  document.getElementById("add").onclick = function () {
    
    var newtxt = document.getElementById("newtask").value;
    
    document.getElementById("newtask").value = "";
    
    if( newtxt.length == 0 )
      return ;
    
    //add server logic code
    $.get('/addtodo' , { text : newtxt , checked : false} , function() {
      rebuild();
    } );
    
    
  };
  
  function checkarray(arg) {
   
    if (list[arg].checked == true)
    {
      document.getElementById("item" + arg).setAttribute("class" , "notchecked");
    }
    else
    {
      document.getElementById("item" + arg).setAttribute("class" , "checked");
    }
    
    list[arg].checked = !(list[arg].checked);
    
  };
  
  function rebuild()
  {
    
    $.get("/fetchtodos" , function(data) 
    {
          list = data;
          not = data.length;
          $("#todolist").empty();
    for( var i=0;i <not ;i++)
      {
        $("#todolist").append( formcontent(i) );
      }
    
    });
    
  }
  
  function formcontent(i)
  {
    return "<li id='item" + i + "' > <input type='checkbox'  onclick='checkarray(" + i + ")' > " + list[i].text + "  </li> ";
  }
  
  function del()
  {
    for(var i=0;i<not;i++)
      {
        if( !list[i].checked)
        {
          list.splice(i,1);
          i--;
          not--;
        }
      }
    console.log(list);
    $.get('/cleartodos' , { data : list } , function() {
      
       rebuild();
    });
    
   
  }



