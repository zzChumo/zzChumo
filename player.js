$(function(){
    var playerContent1=$('#player-content1');
    var musicName=$('.music-name');
    var artistName=$('.artist-name');
    var musicImgs=$('.music-imgs');
    var playPauseBtn=$('.play-pause');
    var playPrevBtn=$('.prev');
    var playNextBtn=$('.next');
    var time=$('.time');
    var tProgress=$('.current-time');
    var totalTime=$('.total-time');
    var sArea=$('#s-area');
    var insTime=$('#ins-time');
    var sHover=$('#s-hover');
    var seekBar=$('#seek-bar');
    var seekT,seekLoc,seekBarPos,cM,ctMinutes,ctSeconds,curMinutes,curSeconds,durMinutes,durSeconds,playProgress,bTime,nTime=0;
    var musicImgsData=['https://chumo.sbsbsb.sbs/1.jpg'];
    var musicNameData=['濫觴生命'];
    var artistNameData=['Orangestar'];
    var musicUrls=['https://chumo.sbsbsb.sbs/1.mp3'];
    var currIndex=-1;
    var buffInterval=null;
    var len=musicNameData.length;
    
    function playPause(){
        if(audio.paused){
            playerContent1.addClass('active');
            musicImgs.addClass('active');
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont');
            checkBuffering();
            audio.play();
        }else{
            playerContent1.removeClass('active');
            musicImgs.removeClass('active');
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont');
            clearInterval(buffInterval);
            musicImgs.removeClass('buffering');
            audio.pause();
        }
    }
    
    function showHover(event){
        seekBarPos=sArea.offset();
        seekT=event.clientX-seekBarPos.left;
        seekLoc=audio.duration*(seekT/sArea.outerWidth());
        sHover.width(seekT);
        cM=seekLoc/60;
        ctMinutes=Math.floor(cM);
        ctSeconds=Math.floor(seekLoc-ctMinutes*60);
        if((ctMinutes<0)||(ctSeconds<0))
            return;
        if((ctMinutes<0)||(ctSeconds<0))
            return;
        if(ctMinutes<10)
            ctMinutes='0'+ctMinutes;
        if(ctSeconds<10)
            ctSeconds='0'+ctSeconds;
        if(isNaN(ctMinutes)||isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes+':'+ctSeconds);
        insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
    }
    
    function hideHover(){
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);
    }

    function playFromClickedPos(){
        audio.currentTime=seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime(){
        nTime=new Date();
        nTime=nTime.getTime();
        curMinutes=Math.floor(audio.currentTime/60);
        curSeconds=Math.floor(audio.currentTime-curMinutes*60);
        durMinutes=Math.floor(audio.duration/60);
        durSeconds=Math.floor(audio.duration-durMinutes*60);
        playProgress=(audio.currentTime/audio.duration)*100;
        if(curMinutes<10)
            curMinutes='0'+curMinutes;
        if(curSeconds<10)
            curSeconds='0'+curSeconds;
        if(durMinutes<10)
            durMinutes='0'+durMinutes;
        if(durSeconds<10)
            durSeconds='0'+durSeconds;
        if(isNaN(curMinutes)||isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes+':'+curSeconds);
        if(isNaN(durMinutes)||isNaN(durSeconds))
            totalTime.text('00:00');
        else
            totalTime.text(durMinutes+':'+durSeconds);
        if(isNaN(curMinutes)||isNaN(curSeconds)||isNaN(durMinutes)||isNaN(durSeconds))
            time.removeClass('active');
        else
            time.addClass('active');
        seekBar.width(playProgress+'%');
        if(playProgress==100){
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont');
            seekBar.width(0);
            tProgress.text('00:00');
            musicImgs.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1); //此句可实现自动播放，加不加自己决定
        }
    }

    function checkBuffering(){
        clearInterval(buffInterval);
        buffInterval=setInterval(function(){
            if((nTime==0)||(bTime-nTime)>1000){
                musicImgs.addClass('buffering');
            }else{
                musicImgs.removeClass('buffering');
            }
        bTime=new Date();
        bTime=bTime.getTime();
        },100);
    }

    function selectTrack(flag){
        if(flag==0||flag==1){
            ++currIndex;
            if(currIndex>=len){
                currIndex=0;
            }
        }else{
            --currIndex;
            if(currIndex<=-1){
                currIndex=len-1;
            }
        }
        if(flag==0){
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont');
        }else{
            musicImgs.removeClass('buffering');
            playPauseBtn.attr('class',"btn play-pause icon-zanting iconfont");
        }
        seekBar.width=(0);
        time.removeClass('active');
        tProgress.text('00:00');
        totalTime.text('00:00');
        currMusic=musicNameData[currIndex];
        currArtist=artistNameData[currIndex];
        currImg=musicImgsData[currIndex];
        audio.src=musicUrls[currIndex];
        nTime=0;
        bTime=new Date();
        bTime=bTime.getTime();
        if(flag !=0){
            audio.play();
            playerContent1.addClass('active');
            musicImgs.addClass('active');
            clearInterval(buffInterval);
            checkBuffering();
        }
        artistName.text(currArtist);
        musicName.text(currMusic);
        musicImgs.find('.img').css({'background':'url('+currImg+')'});
    }

    function initPlayer(){
        audio=new Audio();
        selectTrack(0);
        audio.loop=false;
        playPauseBtn.on('click',playPause);
        sArea.mousemove(function(event){
            showHover(event);
        });
        sArea.mouseout(hideHover);
        sArea.on('click',playFromClickedPos);
        $(audio).on('timeupdate',updateCurrTime);
        playPrevBtn.on('click',function(){
            selectTrack(-1);
        });
        playNextBtn.on('click',function(){
            selectTrack(1);
        });
    }
    initPlayer();
});
