
var url = 'http://localhost/aws/upload';
var imageUrl = 'http://localhost/images/';
var dataAwsUrl ='http://localhost/data/';
var listUrl = 'http://localhost/api/thumbnail';

var addThumbnail = function(filename){
  console.log("Add:" + filename);
  $('#thumbnail').append('<span><img class="thumbnail-window" data-target="'+filename+'"src="'+imageUrl+filename+'"><br/>'+ filename +'<br/></span>');
};

var clearThumbnail = function(){
  $('#thumbnail').empty();
};

var success = function(data){
       setTimeout(reload, 5000);
}

var imageUpload = function(f){
  var formData = new FormData();
    formData.append("files",f);

  var postData = {
    type : "POST",
    dataType : "text",
    data : formData,
    processData : false,
    contentType : false
  };

$.ajax(url,postData).done(function(data){success(data);});
}

var modalResize = function(){
  var w = $(window).width();
  var h = $(window).height();
  
  $('#datawindow').css({
    'width' : w - 40 +'px','height' : h -40 + 'px'
  });
  
}



var reload = function(){
  console.log("Reload!");
  clearThumbnail();
  
  option = {
    method: 'GET',
    url: listUrl
  };
  
  $.ajax(option).done(function(data){
    data.list.forEach(function(filePath){
      path = filePath.split("/");
      console.log(path[1]);
      addThumbnail(path[1])
    });
  });
}

$(document).ready(function(){

  $('#drop').on('dragover',function(event){
    event.preventDefault();
  });
  
  $('#drop').on('drop',function(_event){
    var event = _event;
    
    if(_event.originalEvent){
      event = _event.originalEvent;
    }
    
    console.log(event);
    
    event.preventDefault();
    var uploadfiles = event.dataTransfer.files;
    for (var i=0; i<uploadfiles.length; i++) {
        imageUpload(uploadfiles[i]);
    }

  });

  $('.fa-refresh').on('click',function(){
    reload();
  });
});

