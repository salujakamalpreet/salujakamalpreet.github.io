var datafullpage;
var flag=0;
//var voronoi = (function(){

    /****************
     * Object Voronoi
     */
/**
    var Voronoi = function (){

        this.canvas = null;
        this.sites = null;
        this.nbParticles = null;
        this.speed = null;
        this.voronoi = null;
    };
***/
		var diagonal=Math.sqrt(window.innerWidth*window.innerWidth+window.innerHeight*window.innerHeight);
//var canvas=document.getElementsByClassName("canvas");	
init(".canvas",10);
     function init(classCanvas, nbParticle){
      
        this.canvas=d3.select("canvas").on("touchmove mousemove", moved).node(),
             context = this.canvas.getContext("2d"),
             width = window.innerWidth,
             height = window.innerHeight;
      
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
     
        window.addEventListener("resize", this.onResize.bind(this), false);

        /* Nb Particles */
        this.nbParticles = nbParticle;

        /* Speed Particles */
        this.speed = [];
        for(var i=0; i<this.nbParticles; i++) this.speed[i]=[];

        /* Sites */
        this.sites = d3.range(this.nbParticles)
            .map(function(d) { return [Math.random() * window.innerWidth, Math.random() * window.innerHeight]; });

        this.initRandomSpeed();
        //this.redraw();
       this.draw();
    };

    function initRandomSpeed(){

        var i;
        for (i = 0; i < this.nbParticles; i++) {

            if(i%2) {
                this.speed[i].x = -0.08;
                this.speed[i].y = -0.08;
            } else {
                this.speed[i].x = 0.08;
                this.speed[i].y = 0.08;
            }

        }


    };

   
    function rebondOnScreen(){

        var i;
        for(i = 0; i < this.sites.length; i++) {

            if(this.sites[i][0] < 0 || this.sites[i][0] > window.innerWidth) {
                this.speed[i].x *= -1;
            }

            if(this.sites[i][1] < 0 || this.sites[i][1] > window.innerHeight) {
                this.speed[i].y *= -1;
            }

            this.sites[i][0] += this.speed[i].x;
            this.sites[i][1] += this.speed[i].y;
        }

    };
function moved() {
//console.log(  sites[0]);
  sites[0] = d3.mouse(this);
  redraw();
}
     function redraw(){
	 flag=0;

        var voronoi = d3.voronoi()
            .extent([[-1, -1], [width + 1, height + 1]]);

        var diagram = voronoi(this.sites);
        var polygons = diagram.polygons();

        context.clearRect(0, 0, width, height);
        //context.beginPath();

        /* Gradient */
        var gradient = context.createLinearGradient(0, 0, window.innerWidth, 0);
        gradient.addColorStop("0", "#ffffff");
        gradient.addColorStop("1", "#ffffff");

        /* DrawCells */
        context.beginPath();
		var h;
        for (h = 0, n = polygons.length; h < n; ++h) this.drawCell(polygons[h]);
        context.lineWidth=0;
        context.strokeStyle = gradient;
        context.stroke();
		
    };
var x1=0,y1=0;
      function drawCell(cell){
        if (!cell) return false;
	context.beginPath();
        context.moveTo(cell[0][0], cell[0][1]);
        for (var j = 1, m = cell.length; j < m; ++j) {
            context.lineTo(cell[j][0], cell[j][1]);
        }
		if(flag==0)	   
		{
	   x1=cell.data[0];
	   y1=cell.data[1];
	   //console.log("::"+x1+","+y1);   
	   flag=1;
	   
	   }
	   
		x=(cell.data[0]-x1); 
	    y=(cell.data[1]-y1); 
        percent=Math.sqrt((x*x)+(y*y)) 
        var valueOfFill=0.1+(percent/diagonal)

        // if(valueOfFill>=0.2 && valueOfFill <0.5)
        //  context.fillStyle =d3.interpolateYlGn(0.1); 
        //  else
         context.fillStyle=d3.interpolateYlGn(valueOfFill);
	   //return d3.interpolateSpectral(0.68-percent/diaognal); 
	   
		//console.log(cell);
	    //context.fillStyle = d3.interpolateSpectral(Math.random(0,1));
  context.fill();

        context.closePath();
        return true;

    };

    function draw(){

        requestAnimationFrame(this.draw.bind(this));


        this.rebondOnScreen();
        this.redraw();
	 //await sleep(2000);

    };

    function onResize(){

        this.canvas = document.querySelector(".canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        width = canvas.width;
        height = canvas.height;

        
        this.sites = d3.range(this.nbParticles)
            .map(function(d) { return [Math.random() * window.innerWidth, Math.random() * window.innerHeight]; });


    };
	

sites[0] = [width/2,height/3];
  redraw();   


   
   
   
   
   
   
   
   
   
   
  
function getDetails(section) {

		console.log("gettingdata");
$.ajax({
    async: true,
    type: "GET",
    url: section+"?"+new Date().getTime(),
    success: function(data){
        console.log("gotdata");
        
        datafullpage=data;
        
    //applyScript();
    // scrollToSection('icord-'+section);
    //     menuItems.removeClass("active-item");
    // $('#a-'+section).addClass("active-item")   
    // activeItem='#a-'+section;
    }
});

//    return false;
}
        	window.onhashchange = window.onload = function(evt) {
var subI                = window.location.pathname .lastIndexOf("/");
var sub=window.location.pathname.substr(subI);
if(sub.length<1)
{
console.log("hello");
console.log(sub)
}

console.log(window.location.href + ' (' + window.location.pathname + ')');

    };
    
// window.addEventListener('popstate', function(event) {
//       console.log('popstate fired!');
// console.log(event.state);
//       updateContent(event.state);
//     });

   
Pace.on('done', function() {
    $('#kpmaincontent').hide().fadeIn(500); 
    $('#kpmaincontent').html(datafullpage);
   

    if(location.href.lastIndexOf("#")>1)
    $([document.documentElement, document.body]).animate({
            scrollTop: $(location.href.substr(location.href.lastIndexOf("#"))).offset().top
        }, 2000);









    $('footer').show();
});
$('footer').hide();
function scrollToSection(section)
{
    $([document.documentElement, document.body]).animate({
        scrollTop: $(("#"+section)).offset().top
    }, 2000);
    
}
