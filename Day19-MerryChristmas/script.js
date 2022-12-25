const bod = document.getElementById('tree_box')
var colors = ['#386641','#6a994e','#31572c']

function color() { return colors[Math.floor(Math.random()*colors.length)] }

function addBobble() {
  var b_colors = ['#bc4749','#9370DB','#87CEEB']
  var round = Math.random() < .33 ? '15px' : '0'
  var b = document.createElement('div')
  b.className = 'bobble'
  var size = (Math.random()*15) + 5
  b.style.width = size +'px'
  b.style.height = size +'px'
  b.style.borderRadius = round
  b.style.marginLeft = Math.random()*(100-size)+'%'
  b.style.background = b_colors[Math.floor(Math.random()*b_colors.length)]
  b.style.position = 'relative'
  b.style.transform = Math.random() < .5 ? 'rotate(45deg)' : 'none'
  document.querySelectorAll('.layer')[document.querySelectorAll('.layer').length - 1].appendChild(b)
}

function addTree() {
  bod.innerHTML = ''
  var num_layers = (Math.ceil(Math.random()*25))+5
  var starting_width = 10
  var width_multiplier = (Math.random()*10) + 10
  var starting_height = 22
  var color_one = color()
  var round = Math.random() < .33 ? '15px' : '0'  
  document.querySelector('body span').innerHTML = 'Height<br><font size="6">'+(num_layers*6)/12 + 'ft</font>'

  function addLayer() {
    var l = document.createElement('div')
    l.className = 'layer'
    l.style.width = starting_width + (Math.random()*10) + 'px'
    l.style.height = starting_height + 'px'
    l.style.background = color_one
    l.style.borderBottom = '2px solid '+color()
    var ranNum = Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1)
    l.style.transform = 'rotate('+ranNum+'deg)'  
    l.style.borderRadius = round
    l.style.margin = '0 auto'    

    if(i > 1) { addBobble() }

    if(i == num_layers - 1) {
      l.style.background = 'saddleBrown'
      l.style.width = '30px'
      l.style.borderBottom = 0
      l.style.borderRadius = 0
      l.style.transform = 'none'
    }

    bod.appendChild(l)

    starting_width = starting_width + width_multiplier
  }

  for(var i=0;i<num_layers;i++) {
    addLayer()
  }  
}
addTree()
window.addEventListener('click', addTree)

// make it snow
var snow_fall_rate = 5 //decrease for faster fall speed
function snow() {  
  var b = document.createElement('div')
  var size = (Math.random()*10) + 5
  b.className = 'flake'
  b.style.width = size + 'px'
  b.style.height = size + 'px'
  b.style.position = 'fixed'
  b.style.zIndex = '9999'
  b.style.left = Math.random()*window.innerWidth + 'px'
  b.style.top = '-20px'
  b.style.borderRadius = '50%'
  b.style.background = 'white'  
  b.style.opacity = '.5'  
  b.style.filter = Math.random() < .5 ? 'blur(3px)' : 'blur(1px)'
  b.style.transition = Math.random < .5 ? snow_fall_rate*.75 + 's' : snow_fall_rate + 's'
  b.style.transitionTimingFunction = 'ease-in'
  document.body.appendChild(b)

  setTimeout(function(){
    var flakes = document.querySelectorAll('.flake')
    var flake = flakes[flakes.length - 1]  
    var flake_loc = flake.getBoundingClientRect()
    flake.style.top = '105%'
    flake.style.left = Math.random() < .5 ? flake_loc.left - 150 + 'px' : flake_loc.left + 150 + 'px'
  },10)  

  var flakes = document.getElementsByClassName('flake')
  for(var i=0;i<flakes.length;i++){
    if(flakes[i].getBoundingClientRect().top > window.innerHeight) {
      flakes[i].remove()
    }      
  }
  setTimeout(function(){ snow() },200)
}
snow()