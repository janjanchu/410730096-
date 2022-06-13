var capture//捕捉畫面
var cacheGraphics//相機
var bk,ay
var mode=1
var colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)
class Ball_1{
	constructor(args){ //預設值(工廠)
		this.r=args.r || 20
		this.p=args.p || {x:width/2,y:height/2}
		this.v=this.v || {x:random(-2,2),y:random(-2,2)}
		this.a = args.a || {x:0,y:0}
		this.color = args.color || random(colors)
		this.rid = random(10000)
	}
	draw(){
		
		push()
			translate(this.p.x, this.p.y)
			fill(this.color)
			ellipse( 0,0, this.r);
			fill(255,140,0)//橘色圓
		  ellipse(0, 0 , this.r/2)
			//arc(0,0,this.r/2,this.r/2,0,PI)
		  fill(255,165,0)//黃色圓
		  ellipse(0, 0 , this.r/4);
			//arc(0,0,this.r/3,this.r/3,0,PI)
			stroke(this.color)
			strokeWeight(6)
			fill(135,206,235)//藍色張開花瓣
		  for(var j=0;j<8;j++){
			beginShape()
				rotate(PI/4)
				for(var i=0;i<30;i+=5){
					vertex(this.r/2+i*2,sin(i/5+frameCount/10+this.rid)*10) 
				}
			endShape()
		}
		pop()
		}
	update(){
		this.p.x=this.p.x+this.v.x
		this.p.y+=this.v.y
		this.v.x+=this.a.x
		this.v.y+=this.a.y
		// ball.p.x=ball.p.x+ball.v.x
		// ball.p.y+=ball.v.y
		if(this.mode=="happy"){
			this.p.y+=sin(frameCount/(10+this.rid/100))*5
		}
		if(this.mode=="crazy"){			
			this.v.x+=random(-5,5)
			this.v.y+=random(-5,5)
		}
		this.v.x*=0.99
		this.v.y*=0.99
		if(this.p.y>height){
			this.v.y=-abs(this.v.y)
		}
	}
	escape(){
		this.v.x=random(-10,10)
	}
	setHappy(){
		this.mode="happy"
	}
	isBallInRange(){
		let d=dist(mouseX,mouseY,this.p.x,this.p.y)
		if(d<this.r){
			return true
		}else{
			return false
		}
	}
	setMode(mode){
		this.mode=mode
	}
}
class Ball{
	constructor(args){ //   參數預設值(工廠)
		this.r= args.r || 30 //random(200)  //  ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p= args.p || {x:random(width),y:random(height)}  
		this.v=args.v || {x:random(-1,1),y:random(-1,1)}
		this.a = args.a || {x:0,y:0.01}
		this.color = args.color || random(colors)
	}	
	
	draw(){  //無聲音時圖形
		push()
			translate(this.p.x, this.p.y)
			fill(this.color)
			ellipse(0, 0 , this.r/1.2);
		  fill(240,128,128)//粉色花瓣
			ellipse(-this.r/50, -this.r/1.5 , this.r/2);
		  ellipse(-this.r/50, this.r/1.5 , this.r/2);
		  fill(221,160,221)//紫色花瓣
			ellipse(-this.r/1.5, this.r/50 , this.r/2);
		  ellipse(this.r/1.5, -this.r/50 ,this.r/2);
			fill(0,191,255)//藍色外圈
			// arc(0,0,this.r/2,this.r/2,0,PI)			
			ellipse(0, 0 , this.r/2);
			fill(255,255,0)//黃色圓形
			//arc(0,0,this.r/3,this.r/2,0,PI)
			ellipse(0, 0 , this.r/4);
		pop()
	}
	
	update(){  // 動作(移動)
		this.p.x=this.p.x+this.v.x
		this.p.y+=this.v.y
		this.v.x=this.v.x+this.a.x
		this.v.y=this.v.y+this.a.y
		this.v.x = this.v.x*0.999
		this.v.y = this.v.y*0.999
		if(this.p.y>height){
			this.v.y = -abs(this.v.y)
		}
	}
	
}
var ball
var balls=[]  //宣告一個陣列
function setup() {
	createCanvas(windowWidth, windowHeight);
	// createCanvas(800, 600);
	background(100);
	capture = createCapture(VIDEO)
	capture.size(800,600);//設定顯示畫面大小
	cacheGraphics = createGraphics(640,480)	
	cacheGraphics.translate(640,0) // 先往右邊移動一倍的距離
	cacheGraphics.scale(-1,1) // 翻轉畫布
	capture.hide();
	sliderElement= createSlider(30,50,30,3)//最小值，最大值，預設值，間距
	
	sliderElement.position(980,180)
	sliderElement.input(setGravity)
	mic = new p5.AudioIn() 
	mic.start()
}
function setGravity(){
	ay = sliderElement.value()
}
function draw() {
	background(0);
	textSize(20)
	textStyle(BOLD)
	fill(238,174,238)
	text("圖像大小",880,195)
	fill(255,193,193)
	text("按1，顯示圓點",880,300)
	text("按2，顯示方塊",880,340)
	text("按3，顯示文字",880,380)
	text("按4，顯示元件，聲音大小聲會變化",880,420)
	text("按5，顯示原視窗",880,460)
	fill(176,226,255)
	text("410730096",950,600)
	text("朱品臻",950,640)
	text("🐷🐷🐷🐷🐷",950,680)
	balls=[]
cacheGraphics.image(capture, 0,0)
	
noStroke();
	// scale(2)
if(mode<5){
var span=20+max(mouseX,0)/20 //上次會當機的問題，mouseX會負值，造成當機
for(var x=0 ; x<cacheGraphics.width; x+=span){
	for(var y=0;y<cacheGraphics.height; y+=span){
    var pixel = cacheGraphics.get(x,y);

		bk = (pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值

		fill(255,250,205)//都變成淺黃色

		if(mode=="1"){
		ellipse(x+100,y+100,span*map(bk,0,255,0,1))
		}
		if(mode=="2")
		{
			fill(pixel)	
				push()
					colorMode(HSB)
					fill(pixel[0],100,80)
			  	translate(x+100,y+100)
					rectMode(CENTER)
					rotate(pixel[0]/100);
					rect(0,0,span*0.5+pixel[0]/50)
					fill(0)
					ellipse(0,0,5)
				pop()
		}
		if(mode=="3")
		{
			let txt = "臻臻臻臻臻臻臻";
			let bkId=int(map(bk,0,255,9,0))
			fill(pixel)
			fill(pixel[0]+50,pixel[1]+50,pixel[2]+50)//讓畫面更亮
			textSize(span)
			textStyle(BOLD)
			text(txt[bkId],x+100,y+100)
		}
		if(mode=="4")
		{
			var micLevel=mic.getLevel();
			
			if(micLevel>0.009){
			ball = new Ball_1({p:{x:x,y:y},r:ay,color: color(pixel[0],pixel[1],pixel[2]) }) //顯示淺藍色花朵
			}
			else
			{
			ball = new Ball({p:{x:x,y:y},r:ay,color: color(pixel[0],pixel[1],pixel[2]) }) //顯示粉紫色小花
			}
				balls.push(ball)
		}
	}
	}
	
	if(mode=="4")
		{
			for(let ball of balls){
			ball.draw()	 //繪製		
	  }
		}
   }
	else
	{			
		image(cacheGraphics,0, 0)
	}
}
function keyPressed(){
	if(key=="1"){
		mode=1
	}
	else if(key=="2"){
		mode=2
	}
	else if(key=="3"){
		mode=3
	}
	else if(key=="4"){
		mode=4
	}
	else {
		mode=5
	}
}