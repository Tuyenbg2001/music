var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
let songname = $('header h2')
let cdthumb = $('.cd-thumb')
let audio = $('audio')
let play = $('.btn-toggle-play')
let player = $('.player')
let progress = $('.progress')
var btnPrev = $('.btn-prev')
var btnNext = $('.btn-next')
var btnRandom = $('.btn-random')
var btnRepeat = $('.btn-repeat')
const app = {
  currentIndex:0,
  isplaying : false,
  isRandom :false,
  isRepeat: false,
  isActive: false,
    songs: [
        {
          name: "ForeverAlone",
          singer: "Chuyên Chu",
          path: "./nhac/ForeverAlone-JustaTee-2414526.mp3",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Bâng Khuâng",
          singer: "Chị Chinh linh tinh",
          path: "./nhac/BangKhuang-JustaTee-3096193.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "LoiNoiDoiChanThat",
          singer: "Tuyến DZ",
          path:
            "./nhac/LoiNoiDoiChanThat-JustaTeeKimmese-2527750.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "CryingOverYou",
          singer: "Nhị 2K5",
          path: "./nhac/CryingOverYou-JustaTeeBinz-2866818.mp3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "NguoiNaoDo",
          singer: "Lee Min Hô",
          path: "./nhac/NguoiNaoDo-JustaTee_4g8ew.mp3",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "./nhac/ThoiGianSeTraLoi-TienCookie-BigDad_4gnq6.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ],
    defineProperties: function(){
      Object.defineProperty(this,'currentSong',{
        get: function(){
          return this.songs[this.currentIndex]
        }
      })
    },
    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    loadCurrentSong:function(){
      songname.innerHTML = this.songs[this.currentIndex].name;
      cdthumb.style.backgroundImage = `url("` + this.songs[this.currentIndex].image + `")`;
      audio.src  = this.songs[this.currentIndex].path
    },


    handleEvent : function(){
      let cdlength = $('.cd')
      const CD = $('.cd-thumb')
      cdlengthW = cdlength.offsetWidth

      //Xử lý cd quay
      const cdAnimate = cdlength.animate([
        {
          transform:'rotate(360deg)'
        }
      ],
        {
          duration:10000,
          iterations : Infinity
        }
      )
      cdAnimate.pause()


      document.onscroll = function(){
        document.addEventListener('scroll',function(){
          cdlength.style.width = (cdlengthW - window.scrollY) +"px"
          if(cdlengthW - window.scrollY <= 0){
            cdlength.style.width = 0 +'px'
          }
          cdlength.style.opacity = (cdlengthW - window.scrollY)/cdlengthW
        })
      }


        play.onclick = function(){
        if(app.isplaying){
          app.isplaying = false          
          audio.pause()
          player.classList.remove('playing')
          cdAnimate.pause()
        }
        else{
          app.isplaying = true
          audio.play()
          player.classList.add('playing')
          cdAnimate.play()
        }
      }

      audio.ontimeupdate= function(){
        
          let percent = audio.currentTime/ audio.duration *100
          progress.onchange = function(e){
            audio.currentTime = (progress.value/100)*audio.duration
          }
          if(percent!= NaN)
          progress.value = percent;
          else{
            progress.value =0
          }
          if(progress.value == 100){
            if(app.isRepeat){
              app.playy()
            }
            else{
              if(app.currentIndex < songss.length-1){
                app.currentIndex +=1
                app.playy();
              }
              else{
                app.currentIndex = 0
                app.playy()
              }
            }
          }
      }
      
      var songss = $$('.song')

      songss.forEach(function(item,index){       
            app.songs.forEach(function(i,index){
              btnPrev.onclick = function(e){
                if(app.isRandom){
                  app.randomSong()
                }
                else{
                if(app.currentIndex > 0){
                  app.currentIndex-=1;
                  app.playy()
                }
                else{
                  app.currentIndex = songss.length -1
                  app.playy()
                }
              }}
            btnNext.onclick = function(e){
              cdAnimate.play()
              if(app.isRandom){
                app.randomSong()
              }
              else{
                if(app.currentIndex < songss.length-1){
                  app.currentIndex+=1;
                  app.playy()
                }
                else{
                  app.currentIndex = 0;
                  app.playy()
                }
              }
            }
            item.onclick = function(e){
              cdAnimate.play()
              let songActive = $('.song.active')
              app.songs.forEach(function(i,index){
                if(e.target.innerText == i.name){
                  app.currentIndex = index
                  app.loadCurrentSong();
                  app.isplaying = true
                  audio.play()
                  player.classList.add('playing')
                  songActive.classList.remove('active')
                  item.classList.add('active')
                }
              })
            }
            // if(e.target.innerHTML != app.songs[app.currentIndex].name)
            // item.classList.remove('active')
            
          })
        })
        btnRandom.addEventListener('click',function(e){
          app.isRandom =!app.isRandom
          btnRandom.classList.toggle('active',app.isRandom)
        })
        btnRepeat.addEventListener('click',function(e){
          app.isRepeat =!app.isRepeat
          btnRepeat.classList.toggle('active',app.isRepeat)
        })
    },

    randomSong:function(){
      let newIndex
      do{
        newIndex = Math.floor(Math.random() *this.songs.length)
      }while(newIndex === this.currentIndex)

      this.currentIndex = newIndex
      this.loadCurrentSong()
      this.playy()
    },


    playy: function(){
      app.loadCurrentSong();
      app.isplaying = true
      audio.play()
      player.classList.add('playing')
      app.render()
    },

    scroll:function(){
      playlist = $('.playlist')
      playlist.scrollY(100+'px')
    },

    start: function(){
        this.loadCurrentSong();
        this.defineProperties();
        this.render();
        this.handleEvent();
        this.scroll()
        
    }
}

app.start()
