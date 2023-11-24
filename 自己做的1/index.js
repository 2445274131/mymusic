
var musicList = [];
//声明，保存 
var currentIndex = 0;


$.ajax({
  type: "GET",
  url: "./1.json",
  dataType: "json",
  success: function (data) {
    musicList = data;
    console.log(data)
    render(musicList[currentIndex]);
    renderMusicList(musicList);

  },
});
// 给上一首绑定点击事件
$("#prevBtn").on("click", function () {
  
  if(currentIndex > 0){
    currentIndex--;
  }else{
    currentIndex = musicList.length-1;
  }
  
  //重新渲染
  render(musicList[currentIndex]);
  //播放音乐
   $("#playBtn").trigger("click");
});
// 给下一首绑定点击事件
$("#nextBtn").on("click",function(){
  if(currentIndex <musicList.length - 1){
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  // 给音乐列表绑定点击事件 
  $("#openModal").on("click",function(){
    console.log("openModal");
  });
   // 监听audio标签的timeupdate事件
   $("audio").on("timeupdate",function(){
   //获取音乐当前播放到的时间
   var currentTime = $("audio").get(0).currentTime;
   //获取音乐的总时长
   var duration = $("audio").get(0).duration||0;
   console.log(formatTime(currentTime),formatTime(duratio));  
   
  //  设置当前播放时间
   $(".current-time").text(formatTime(currentTime))
   //设置进度条
   });
  //格式化时间
  function formatTime(time) {
    // 329 -> 05:29
    var min = parseInt(time / 60);
    var sec = parseInt(time % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    return `${min}:${sec}`;
  }
  
    //根据信息,设置页面对应标签的内容
    function render(data){

    }
   //重新渲染

  render(musicList[currentIndex]);
  //播放音乐
   $("#playBtn").trigger("click");
});

// 播放按钮绑定点击事件

$("#playBtn").on("click", function () {
  console.log(111111);
  


  if ($(this).hasClass("fa-play")) { //暂停状态，应该播放
    //修改播放按钮图标
    $(this).removeClass('fa-play').addClass("fa-pause");
    //让音乐卡片显示出来 
    $(".player-info").animate(
      {
        top: "-100%",
        opacity: 1
      },
      "slow"
    );
    //让封面旋转起来
    $(".cover").css({
      "animation-play-state":"running",
    });
    //让音乐播放
    console.log($("audio").get(0));
    $("audio").get(0).play();
    $(".player-info").animate()
  } else {  //播放状态，应该暂停
    $(this).removeClass("fa-pause").addClass("fa-play");
    // 让音乐卡片消失
    $(".player-info").animate(

      {
        top: "0",
        opacity: 0
      },
      "slow"
    );
  //让音乐暂停
   $("audio").get(0).pause();
     //让封面停止旋转
     $(".cover").css({
      "animation-play-state":"paused",
    });
  }
 
});


function formatTime(time) {

}
function render(data) {
  $.each(data, function (index, item) {
    console.log(data);
    $("audio").attr("src", data.audio_url);
    $(".name").text(data.title);
    $(".id").text(`${data.id} - ${data.title}`);
    $(".time").text(data.time);
    $(".audio").attr("src", data.audio_url);
  })
}
//创建li
function renderMusicList(list) {
  $(".music-list").empty();
  $.each(list, function (index, item) {
    var $li = $(`
        <li class="${index == currentIndex ? "playing" : ""}">
          <span>0${index + 1}. ${item.id} - ${item.title}</span>
          <span data-index="${index}" class="fa ${index == currentIndex && !$("audio").get(0).paused
        ? "fa-pause-circle"
        : "fa-play-circle"
      } play-circle"></span>
        </li>
      `);
    $(".music-list").append($li);
    console.log(list);
  });
}







