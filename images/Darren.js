function initPage(){   
    var Loading=document.getElementById("loading");   
    if(Loading!=null){   
		move(Loading,{opacity:0},{fn:function(){
			Loading.style.display='none';
		}});
    }   
}
window.onload=function(){
	initPage();
	var oNav=document.getElementById("nav");//导航
	var oMainA=oNav.getElementsByTagName("a");//导航 菜单
	var oMain=document.getElementById("main");//主体
	var oPage=oMain.getElementsByTagName("div")[0];//整页
	var oHomeDiv=getByClass(oMain,"home_div");//首页块
	var oWorkA=getByClass(oMain,"work_a");//作品块
	var oWorkSpan=getByClass(oMain,"work_span");//作品透明块
	var oWorkP=getByClass(oMain,"work_p");//作品内容
	var aMusicP=getByClass(oMain,"music_name");//音乐名
	var aMusicAudio=document.getElementById("audio");//歌曲
	var oPen=document.getElementById("open");
	var aAboutP=document.getElementById("about_p");//关于字体
	var oDiv2=document.getElementById("div2");
	var aImg=getByClass(oDiv2,"num");
	var oDiv1=document.getElementById("div1");
	var aImg2=getByClass(oDiv1,"num");
	var oWeek=document.getElementById("week");	
	var ready=true;	//准备
	var iNow=0;		
	clientchange();//限制可视区大小
	for(var i=0;i<oMainA.length;i++){
		oMainA[i].index=i;
		oMainA[i].onclick=function(){
			if(!ready) return;
			ready=false;
			iNow=this.index;
			for(var i=0;i<oMainA.length;i++){
				oMainA[i].className="clear";
			}	
			this.className="clear nav_active";
			move(oPage,{top:iNow*-oMain.offsetHeight},{time:300,fn:function(){
				ready=true;	
			}});
			txt();
		};
	}//导航效果
	
	
	function main_home(obj){
		obj.onmouseover=function(ev){
			if(this.children[0].className!="clear home_div_bg"){
				return ;
			}
			var oEvent=ev || event;				
			var oFrom=oEvent.fromElemnt || oEvent.relatedTarget;					
			if(oFrom && obj.contains(oFrom)){
				return ;
			}
			this.children[1].className="clear home_div_con cur";
			var oMainBg=this.children[0];
			move(oMainBg,{left:0,top:0});
		};
		
		obj.onmouseout=function(ev){
			var oEvent=ev || event;					
			var oTo=oEvent.toElement || oEvent.relatedTarget;
			if(oTo && obj.contains(oTo)){
				return ;
			} 
			if(this.children[0].className!="clear home_div_bg"){
				return ;
			}
			this.children[1].className="clear home_div_con";
			var oMainBg=this.children[0];
			move(oMainBg,{left:0,top:oMainBg.offsetHeight+10});
		};
	};
	for(var i=0;i<oHomeDiv.length;i++){
		main_home(oHomeDiv[i]);
	}//首页效果	
	
	updata();
	setInterval(updata,1000);
	function updata(){
		var d=new Date();
		var year=d.getFullYear();
		var month=fillZero(d.getMonth()+1);
		var day=fillZero(d.getDate());
		var h=fillZero(d.getHours());
		var m=fillZero(d.getMinutes());
		var s=fillZero(d.getSeconds());
		var w=d.getDay();
		var str=h+m+s;
		var str2=year+month+day;
		var week=['seven','one','two','three','four','five','six'];
		for(var i=0;i<aImg.length;i++){
			aImg[i].src='./zd/'+str.charAt(i)+'.png';
		}
		for(var i=0;i<aImg2.length;i++){
			aImg2[i].src='./zd/'+str2.charAt(i)+'.png';
		}
		oWeek.src='./zd/'+week[w]+'.png';
	};
	
	var aMus=true;
	aMusicAudio.play();
	oPen.onclick=function(){
		if(!aMus){
			oPen.innerHTML="music关";
			aMusicAudio.play();
			aMus=true;
		}else{
			oPen.innerHTML="music开";
			aMusicAudio.pause();
			aMus=false;
		}		
	};//music开关
	for(var i=0;i<oWorkSpan.length;i++){
		oWorkSpan[i].index=i;
		oWorkSpan[i].onmouseover=function(){
			this.innerHTML=oWorkP[this.index].innerHTML;
			move(this,{opacity:0.5});
		};
		oWorkSpan[i].onmouseout=function(){
			this.innerHTML="";
			move(this,{opacity:0});
		};
	}
	
	function txt(){
		if(oMainA[3].className=="clear nav_active"){
			if(aAboutP.children.length!=0){
				return;
			}else{
				var str="欢迎访问Darren的个人网站，我是一枚前端攻城狮，热衷于学习前端各种新技术，如果我没在找bug，那么就是在去找bug的路上...";
				for(var i=0; i<str.length;i++){
					var oSpan=document.createElement("span");
					oSpan.innerHTML=str.charAt(i);
					aAboutP.appendChild(oSpan);
				}
				var aSpan=aAboutP.children;
				var i=0; 
				var timer=setInterval(function(){		
					move(aSpan[i],{opacity:1});
					i++
					if(i==aSpan.length){
						clearInterval(timer);
					}
				},100);
			}
		}
	}//字体效果
	
		clientchange()
		var oMain=document.getElementById("main");//主体
		var oPage=oMain.getElementsByTagName("div")[0];//整页
		for(var i=0;i<oPage.children.length;i++){
			oPage.children[i].style.height=oMain.offsetHeight+"px";
			oPage.style.top=iNow*-oMain.offsetHeight+"px";
		}	
	window.onresize=function(){	
		clientchange()
		var oMain=document.getElementById("main");//主体
		var oPage=oMain.getElementsByTagName("div")[0];//整页
		for(var i=0;i<oPage.children.length;i++){
			oPage.children[i].style.height=oMain.offsetHeight+"px";
			oPage.style.top=iNow*-oMain.offsetHeight+"px";
		}
	};//更改可视区

	addMouseWheel(document.body,function(down){
		if(!ready) return;
		ready=false;				
		if(down){
			if(oPage.offsetTop<=oMain.offsetHeight-oPage.offsetHeight+oMain.offsetHeight/2){
				oPage.style.top=oMain.offsetHeight-oPage.offsetHeight;
				ready=true;
			}else{
				oPage.style.top=move(oPage,{top:oPage.offsetTop-oMain.offsetHeight},{time:300,fn:function(){
					ready=true;
					iNow++;					
					iNow%=oMainA.length;
					if(iNow==3){
						iNow=3;
					}
					for(var i=0;i<oMainA.length;i++){
						oMainA[i].className="clear";
					}	
					oMainA[iNow].className="clear nav_active";
					txt();
				}});
			}
		}else{
			if(oPage.offsetTop>=0){
				oPage.style.top=0;
				ready=true;
			}else{
				oPage.style.top=move(oPage,{top:oPage.offsetTop+oMain.offsetHeight},{time:300,fn:function(){					
					ready=true;
					iNow--;				
					iNow%=oMainA.length;
					if(iNow<=0){
						iNow=0;
					}
					for(var i=0;i<oMainA.length;i++){
						oMainA[i].className="clear";
					}	
					oMainA[iNow].className="clear nav_active";
					txt();
				}});
			}
		}
	});//首页滚轮效果
	function fillZero(n){
		return n<10?'0'+n:''+n;	
	}

};//首页整站效果


function clientchange(){
	var clientW=document.documentElement.clientWidth;
	var clientH=document.documentElement.clientHeight;	
	if(clientW>1000){
		document.body.style.width=clientW+"px";
	}else{
		document.body.style.width=1000+"px";
	}
	if(clientH>=600){
		document.body.style.height=clientH+"px";		
	}else{
		document.body.style.height=600+"px";
	}	
};//可视区改变

function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
	
	function fnWheel(ev){
		var oEvt=ev||event;	
		var down=true;
		if(oEvt.wheelDelta){
			down=oEvt.wheelDelta<0?true:false;
		}else{
			down=oEvt.detail>0?true:false;
		}
		fn(down);
		oEvt.preventDefault && oEvt.preventDefault();
		return false;
		
	};		
};//滚轮框架	

function move(obj,json,optional){	
	var optional=optional||{};
	optional.time=optional.time||500;
	optional.fn=optional.fn||null;
	optional.type=optional.type||'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	var count=Math.round(optional.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){	
			switch(optional.type){
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;
					
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';	
			}	
		}
		
		if(n==count){
			clearInterval(obj.timer);
			optional.fn&&optional.fn();	
		}
	},30);	
};//运动框架
	
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
};//获取非行间样式
	
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}
	var re=new RegExp("\\b"+sClass+"\\b");
	var result=[];
	var aEle=oParent.getElementsByTagName("*");
	for(var i=0;i<aEle.length;i++){
		if(re.test(aEle[i].className)){
			result.push(aEle[i]);
		}
	}
	return result;
};//获取class

function ball(){
	var oBall=document.getElementById("ball");		
	var speedX=0;
	var speedY=0;
	var lastX=0;
	var lastY=0;
	var timer=null;
	
	oBall.onmousedown=function(ev){
		var oEvent=ev || event;
		var disX=oEvent.clientX-oBall.offsetLeft;
		var disY=oEvent.clientY-oBall.offsetTop;
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			var l=oEvent.clientX-disX;
			var t=oEvent.clientY-disY;
			if(l<0)	l=0;
			if(l>document.documentElement.clientWidth-oBall.offsetWidth)
				l=document.documentElement.clientWidth-oBall.offsetWidth;
			if(t<0)	t=0;
			if(t>document.documentElement.clientHeight-oBall.offsetHeight)
				t=document.documentElement.clientHeight-oBall.offsetHeight;


			oBall.style.left=l+"px";
			oBall.style.top=t+"px";
			
			speedX=oBall.offsetLeft-lastX;
			speedY=oBall.offsetTop-lastY;
			lastX=oBall.offsetLeft;
			lastY=oBall.offsetTop;
			
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			oBall.releaseCapture && oBall.releaseCapture();
			
			 move();
			
		};	
		oBall.setCapture && oBall.setCapture();
		return false;
	};
	
	function move(){
		clearInterval(timer);
		timer=setInterval(function(){
			speedY+=3;
			
			var l=oBall.offsetLeft+speedX;
			var t=oBall.offsetTop+speedY;
			
			if(t>=document.documentElement.clientHeight-oBall.offsetHeight){
				t=document.documentElement.clientHeight-oBall.offsetHeight;
				speedY*=-0.8;
				speedX*=0.8;
			} else if(t<=0){
				t=0;
				speedY*=-0.8;
				speedX*=0.8;
			}
			if(l>=document.documentElement.clientWidth-oBall.offsetWidth){
				l=document.documentElement.clientWidth-oBall.offsetWidth;
				speedX*=-0.8;
				speedY*=0.8;
			} else if(l<=0){
				l=0;
				speedX*=-0.8;
				speedY*=0.8;
			}
			
			oBall.style.left=l+"px";
			oBall.style.top=t+"px";	
			//统一处理速度
			if(Math.abs(speedX) < 1){
				speedX=0;
			}
			if(Math.abs(speedY) < 1){
				speedY=0;
			}
			
			if(speedX==0 && speedY==0 && t==document.documentElement.clientHeight-oBall.offsetHeight){
				clearInterval(timer);
			}
		},30);	
	}
};//篮球效果

function There_D(){
	var aLi=document.getElementsByTagName('li');
	var aPos=[];
	var aA=document.getElementsByTagName('a');
	for(var i=0;i<aLi.length;i++){
		aA[0].onclick=function(){
			return false;
		}
		aA[2].onclick=function(){
			return false;
		}
		aLi[0].onclick=right;
		aLi[2].onclick=left;
		aPos[i]={'left':aLi[i].offsetLeft,
				 'top':aLi[i].offsetTop,
				 'opacity':getStyle(aLi[i],'opacity'),
				 'width':aLi[i].offsetWidth,
				 'height':aLi[i].offsetHeight,
				 'onclick':aLi[i].onclick,
				 'aonclick':aA[i].onclick
				}
	}

	function right(){
		aPos.push(aPos.shift());
		for(var i=0;i<aLi.length;i++){
			move(aLi[i],{'left':aPos[i].left,'top': aPos[i].top,'opacity':aPos[i].opacity,'width':aPos[i].width,'height':aPos[i].height})
			aLi[i].onclick=aPos[i].onclick;
			aA[i].onclick=aPos[i].aonclick;
		}
	}

	function left(){
		aPos.unshift(aPos.pop());
		for(var i=0;i<aLi.length;i++){
			move(aLi[i],{'left':aPos[i].left,'top': aPos[i].top,'opacity':aPos[i].opacity,'width':aPos[i].width,'height':aPos[i].height})
			aLi[i].onclick=aPos[i].onclick;
			aA[i].onclick=aPos[i].aonclick;
		}
	}
};//3D效果

function seamless(){
	var oUl=document.getElementById('div1').children[0];
	var oPeve=document.getElementById("peve");
	var oNext=document.getElementById("next");
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=oUl.children.length*oUl.children[0].offsetWidth+'px';

	var timer=null;
	next();
	oPeve.onclick=function(){
		clearInterval(timer);
		timer=setInterval(function(){
			var l=oUl.offsetLeft-3;
			if(l< (-oUl.offsetWidth/2)){
				l=0;	
			}
			oUl.style.left=l+'px';				
		},30);	
	};

	oNext.onclick=function(){
		clearInterval(timer);
		next();
	};
	
	function next(){
		timer=setInterval(function(){
			var l=oUl.offsetLeft+3;
			if(l>0){
				l=-oUl.offsetWidth/2;
			}
			oUl.style.left=l+'px';
		},30)
	}	
};//无缝滚动

function RandomDistribution(){
	(function(){
		var oUl=document.getElementById('ul1');
		var oBtn=document.getElementById('btn1');
		var aLi=oUl.children;
		var ready=true;
		var aPos=[];
		for(var i=0;i<aLi.length;i++){
			aPos.push(
				{
					left:aLi[i].offsetLeft,
					top:aLi[i].offsetTop,
					width:aLi[i].offsetWidth,
					height:aLi[i].offsetHeight,
					opacity:1
				}
			);
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';	
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
		}	
		
		oBtn.onclick=function(){
			if(!ready)	return;
			ready=false;
			down();	
		};
		
		function down(){
			var i=aLi.length-1;
			var timer=setInterval(function(){
				(function(index){
					move(aLi[i],{left:oUl.offsetWidth/2,top:300,width:0,height:0,opacity:0.5},{fn:function(){
					up();
					}});	
				})(i);
				
				i--;
				if(i==-1){
					clearInterval(timer);	
				}
			},100);
		}
		
		function up(){
			var i=aLi.length-1;
			var timer=setInterval(function(){
				
				(function(index){
					move(aLi[i],aPos[i],{fn:function(){
						if(index==0){
							ready=true;
						}
					}});
				})(i);
				
				i--;
				if(i==-1){
					clearInterval(timer);	
				}
				
			},100);	
		}	
	})();
	(function(){
		var oUl2=document.getElementById('ul2');
		var oBtn2=document.getElementById('btn2');
		var aLi2=oUl2.children;
		var len=aLi2.length;
		var zIndex=1;
		var aPos=[];
		for(var i=0;i<len;i++){
			aPos[i]={left:aLi2[i].offsetLeft,top:aLi2[i].offsetTop};
			aLi2[i].style.left=aPos[i].left+'px';
			aLi2[i].style.top=aPos[i].top+'px';
		}
		for(var i=0;i<len;i++){
			aLi2[i].style.position='absolute';
			aLi2[i].style.margin=0;
			aLi2[i].index=i;
		}

		function getDis(obj1,obj2){
			var a=obj1.offsetLeft-obj2.offsetLeft;
			var b=obj1.offsetTop-obj2.offsetTop;
			return Math.sqrt(a*a+b*b);
		};

		function findMin(obj){
			var min=999999999;
			var minIndex=-1;
			for(var i=0;i<len;i++){
				if(obj==aLi2[i]){continue};
				if(cellTest(obj,aLi[i])){
					var dis=getDis(obj,aLi[i]);
					if(min>dis){
						min=dis;
						minIndex=i;
					}
				}
			}
			if(minIndex==-1){
				return null;
			}
			return aLi[minIndex]
		};

		function cellTest(obj1,obj2){
			var l1=obj1.offsetLeft;
			var t1=obj1.offsetTop;
			var r1=l1+obj1.offsetWidth;
			var b1=t1+obj1.offsetHeight;

			var l2=obj2.offsetLeft;
			var t2=obj2.offsetTop;
			var r2=l1+obj2.offsetWidth;
			var b2=t1+obj2.offsetHeight;

			if(r1<l2 || b1<t2 || l1>r2 || t1>b2){
				return false;
			}else{
				return true;
			}
		};

		oBtn2.onclick=function(){
			aPos.sort(function(n1,n2){
				return Math.random()-0.5;
			})
			for(var i=0;i<len;i++){
				move(aLi2[i],aPos[i]);
			}
		};	
		
	})();//随机运动
};//分布随机

function Waterfall(){
	var aUl=document.getElementsByTagName('ul');
	create();
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>=document.body.scrollHeight-document.documentElement.clientHeight-500){
			create();
		}
	};
	function create(){
		for(var i=0;i<20;i++){
			var oLi=document.createElement('li');
			oLi.style.height=rnd(100,300)+'px';
			var r=rnd(0,256);
			var g=rnd(0,256);
			var b=rnd(0,256);
			oLi.style.background='rgb('+r+','+g+','+b+')';
			oLi.innerHTML=i;
			
			var arr=[];
			for(var j=0;j<aUl.length;j++){
				arr.push(aUl[j]);
			}
			arr.sort(function(ul1,ul2){
			return ul1.offsetHeight-ul2.offsetHeight;
			});
			arr[0].appendChild(oLi);
		}
	};
	function rnd(m,n){
		return Math.floor(Math.random()*(m-n)+n);
	};	
};//瀑布流

function Chorme(){
	var oUl=document.getElementById("ul1");
	var aLi=oUl.children;
	var zIndex=1;
	var aPos=[];
	for(var i=0;i<aLi.length;i++){
		aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute'	
		aLi[i].style.margin=0;
		drag(aLi[i])
		aLi[i].index=i;
	}
	
	function drag(obj){
		obj.onmousedown=function(e){
			obj.style.zIndex=zIndex++;
			var oEvent=e||event;
			var disX=oEvent.clientX-obj.offsetLeft ;
			var disY=oEvent.clientY-obj.offsetTop ;
			
			document.onmousemove=function(e){
				var oEvent=e||event;
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';	

				var oNear=findMin(obj);
				if(oNear && oNear!=obj){
					
					n=obj.index;
					m=oNear.index;
					
					if(n<m){
						for(var i=0;i<aLi.length;i++){
							if(aLi[i].index>=n+1&&aLi[i].index<= m){
								aLi[i].index--;
								move(aLi[i],aPos[aLi[i].index])
							}
						}	
					}else{
						for(var i=0; i<aLi.length; i++){
							if(aLi[i].index >=m && aLi[i].index <= n-1){
								aLi[i].index++;
								move(aLi[i],aPos[aLi[i].index])
							}
						}	
					}
					obj.index=m;
				}		
			}
			document.onmouseup=function(e){
				document.onmouseup=null;	
				document.onmousemove=null
				obj.releaseCapture&&obj.releaseCapture()	
				move(obj,aPos[obj.index])

			}
			obj.setCapture&&obj.setCapture()
			return false;
		}
	}
	
	function findMin(obj){
		var iMin=9999999;
		var iMInIndex=-1 ; 
		for(var i=0;i<aLi.length;i++){
			if(collTest(obj,aLi[i])){
				var dis=getDis(obj,aLi[i])
				if(iMin>dis){
					iMin=dis;
					iMInIndex=i ;
				}
			}
		}
		return aLi[iMInIndex];
	}
	
	function getDis(obj1,obj2){
		var x1=obj1.offsetLeft+obj1.offsetWidth/2 ;
		var y1=obj1.offsetTop+obj1.offsetHeight/2 
		
		var x2=aPos[obj2.index].left+obj2.offsetWidth/2 ;
		var y2=aPos[obj2.index].top+obj2.offsetHeight/2 
		
		var a=x1-x2 ;
		var b=y1-y2 ;
		return Math.sqrt(a*a+b*b) 
		
	}
	
	function collTest(obj1,obj2){
		var l1=obj1.offsetLeft;
		var t1=obj1.offsetTop;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=aPos[obj2.index].left;
		var t2=aPos[obj2.index].top;
		var r2=aPos[obj2.index].left+obj2.offsetWidth;
		var b2=aPos[obj2.index].top+obj2.offsetHeight;
		
		if(l1>r2 || t1 >b2 || r1<l2 ||b1 <t2 ){
			return false
		}else{
			return true
		}
	
	}	
};//仿Chrome应用中心

/*function roller(){
	var oDiv2=document.getElementById('div2');
	var oDiv3=document.getElementById('div3');
	var oDiv4=document.getElementById('div4');
	addMouseWheel(oDiv3,function(down){
		var t=oDiv2.offsetTop;
		if(down){
			t+=20;	
		}else{
			t-=20;
		}
		setT(t);
		
	});
	oDiv2.onmousedown=function(ev){
		var oEvt=ev||event;
		var disY=oEvt.clientY-oDiv2.offsetTop;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var t=oEvt.clientY-disY;
			setT(t);
		};	
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		};
		
		return false;
	};
	
	function setT(t){
		if(t<0) t=0;
		if(t>oDiv2.parentNode.offsetHeight-oDiv2.offsetHeight)
			t=oDiv2.parentNode.offseHeight-oDiv2.offsetHeight;
			
		oDiv2.style.top=t+'px';	
		var scale=oDiv2.offsetTop/(oDiv2.parentNode.offsetHeight-oDiv2.offsetHeight);
		oDiv4.style.top=-scale*(oDiv4.offsetHeight-oDiv3.offsetHeight)+'px';	
	}	
};//自定义滚动条*/

function Clock(){
	function drawClock(){
		var clock=document.getElementById("clock");
		var ctx=clock.getContext("2d");
		ctx.clearRect(0,0,500,500);
		var now=new Date();
		var sec=now.getSeconds();
		var min=now.getMinutes();
		var hour=now.getHours();
		hour=hour+min/60;
		hour=hour>12?hour-12:hour;
		var out_gradient=ctx.createLinearGradient(250,0,250,500);
		out_gradient.addColorStop(0,"#F0F0F0");
		out_gradient.addColorStop(1,"#C8C8C8");
		ctx.save();
		ctx.shadowOffsetX=0;
		ctx.shadowOffsetY=0;
		ctx.shadowBlur=20;
		ctx.shadowColor="#BEBEBE";
		ctx.fillStyle=out_gradient;
		ctx.beginPath();
		ctx.arc(250,250,200,0,360*Math.PI/180,true);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		var in_gradient=ctx.createLinearGradient(250,0,250,500);
		in_gradient.addColorStop(0,"#505050");
		in_gradient.addColorStop(1,"#000000");
		ctx.save();
		ctx.shadowBlur=0;
		ctx.fillStyle=in_gradient;
		ctx.beginPath();
		ctx.arc(250,250,185,0,360*Math.PI/180,true);
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth=2;
		ctx.strokeStyle="#202020";
		ctx.beginPath();
		ctx.arc(250,250,185,0,360*Math.PI/180,true);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle="#333333";
		ctx.beginPath();
		ctx.arc(250,250,25,0,360*Math.PI/180,true);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
				ctx.save();
				ctx.font="35px 微软雅黑";
				ctx.fillStyle="#787878";
				ctx.translate(250,250);
				ctx.fillText("12",-20,-145,50);
				ctx.fillText("6",-10,175,50);
				ctx.fillText("3",155,14,50);
				ctx.fillText("9",-175,14,50);
				ctx.restore();
				for(var i=0;i<12;i++){
					if(i==0||i==3||i==6||i==9){
						continue;
					}
					ctx.save();
					ctx.translate(250,250);
					ctx.lineWidth=5;
					ctx.strokeStyle="#787878";
					ctx.rotate(i*30*Math.PI/180);
					ctx.beginPath();
					ctx.moveTo(0,-150);
					ctx.lineTo(0,-170);
					ctx.closePath();
					ctx.stroke();
					ctx.restore();
				}
				
			ctx.save();
			ctx.translate(250,250);
			ctx.rotate(sec*6*Math.PI/180);
			ctx.fillStyle="#66CC33";
			ctx.globalAlpha=0.8;
			ctx.beginPath();
			ctx.arc(0,-175,6,0,360*Math.PI/180,true);				
			ctx.closePath();
			ctx.fill();
			ctx.restore();
			
			ctx.save();
			ctx.translate(250,250);
			ctx.rotate(min*6*Math.PI/180);
			ctx.lineWidth=15;
			ctx.strokeStyle="#336699";
			ctx.lineCap="round";
			ctx.globalAlpha=0.8;
			ctx.beginPath();
			ctx.moveTo(0,-140);
			ctx.lineTo(0,0);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
			
			ctx.save();
			ctx.translate(250,250);
			ctx.rotate(hour*30*Math.PI/180);
			ctx.strokeStyle="#3399FF";
			ctx.lineWidth=20;
			ctx.lineCap="round";
			ctx.globalAlpha=0.8;
			ctx.beginPath();
			ctx.moveTo(0,-100);
			ctx.lineTo(0,0);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
	};
	drawClock();
	setInterval(drawClock,1000);	
};//时钟

/*function calendar(){
	var oDiv=document.createElement('div');
	oDiv.className='box';
	document.body.appendChild(oDiv)	
	oDiv.onclick=function(ev){
		var eve=ev||event;
		eve.cancelBubble=true;
	}

	var now= 0;
	oDiv.innerHTML='<p>\
		<a href="javascript:;" class="prev">&lt;</a>\
		<span>2019年1月</span>\
		<a href="javascript:;" class="next">&gt;</a>\
	</p>\
	<ol>\
		<li>一</li>\
		<li>二</li>\
		<li>三</li>\
		<li>四</li>\
		<li>五</li>\
		<li style=" color:#f60">六</li>\
		<li style=" color:#f60">日</li>\
	</ol>\
	<ul></ul>'
	
	var oPrev=oDiv.children[0].children[0];
	var oNext=oDiv.children[0].children[2];
	oPrev.onclick=function(){
		now--;
		fullTime()
	}
	
	oNext.onclick=function(){
		now++;
		fullTime()
	}
	
	
	function fullTime(){
		var oSpan=oDiv.children[0].children[1];
		
		var d=new Date();
		d.setMonth(d.getMonth()+now);
		year=d.getFullYear();
		month=d.getMonth();
		
		oSpan.innerHTML=year+'年'+(month+ 1)+'月';
		
		var oUl=oDiv.children[2];
		oUl.innerHTML='';
		var d= new Date();
		d.setMonth(d.getMonth()+now+1,0)
		var m=d.getDate()
		
		for(i=1;i<=m;i++){
			var aLi=document.createElement('li');
			aLi.onclick=function(){
				var t=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+ this.innerHTML+'日'; 
				relativeBtn.value=t;
				oDiv.parentNode.removeChild(oDiv)
			}
						
			aLi.innerHTML=i;
			oUl.appendChild(aLi)	
		}
		
		var d= new Date();
		d.setMonth(d.getMonth()+now,1)
		var m=d.getDay()
		if(m==0) m=7;
		m--;
		for(var i=0;i<m;i++){
			var aLi=document.createElement('li');
			oUl.insertBefore(aLi,oUl.children[0])
		}
		
		var d= new Date();
		d.setMonth(d.getMonth()+now);
		var date=d.getDate()  
		if(now==0){
			for(var i=0;i<oUl.children.length;i++){
				if(oUl.children[i].innerHTML==date){
					oUl.children[i].innerHTML='今天';
					oUl.children[i].className='cur'
				}else if(oUl.children[i].innerHTML <date){
					oUl.children[i].className='pass'
				}
			}
		}else if(now<0){
			for(var i=0;i<oUl.children.length;i++){
				oUl.children[i].className='pass';
			}
		}
		
	}
	fullTime();
};//组件日历*/

function text(){
	var aLi=document.getElementsByTagName('li');
	var timer=null;
	var i=0;
	
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function ()
		{
			clearTimeout(timer);
			for(i=0;i<aLi.length;i++)
			{
				aLi[i].className='back';
			}
			this.className='active';
		};
		
		aLi[i].onmouseout=function ()
		{
			clearTimeout(timer);
			timer=setTimeout(function (){
				for(i=0;i<aLi.length;i++)
				{
					aLi[i].className='';
				}
			}, 200);
		};
	}	
};//文字模糊

function circular(){
	var oDiv=document.getElementById("div1");
	var oBtn=document.getElementById("btn1");
	var R=oDiv.offsetWidth/2;
	var aSpan=oDiv.children;
	
	var N=10;
	
	for(var i=0;i<N;i++){
		var oSpan=document.createElement("span");
		oSpan.innerHTML='<img src="zd/'+(i+1)+'.jpg"/>';
		oDiv.appendChild(oSpan);
	}
	 
	var bSingle=false;
	oBtn.onclick=function(){
		bSingle=!bSingle;
		if(bSingle){
			for(var i=0;i<aSpan.length;i++){
				move(aSpan[i],i*(360/aSpan.length));
			}
			oBtn.innerHTML="关";
		} else {
			for(var i=0;i<aSpan.length;i++){
				move(aSpan[i],0);
			}
			oBtn.innerHTML="开";
		}
	};
	
	function move(obj,iTarget){
		var start=obj.a || 0;
		var dis=iTarget-start;
		var time=1000;
		
		var count=Math.round(time/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var cur=start+dis*(1-a*a*a);
			obj.a=cur;
			
			obj.style.left=R+Math.sin(d2a(cur))*R+"px";
			obj.style.top=R-Math.cos(d2a(cur))*R+"px";
						
			if(n==count){
				clearInterval(obj.timer);
			}
		},30);		
	}	
	function d2a(n){
		return n*Math.PI/180;
	}
};//自己的圆

function fanglg(){
	var oUl=document.getElementById("ul1");
	var aLi=oUl.children;
	
	for(var i=0;i<aLi.length;i++){
		lagou(aLi[i]);
	}
	function getDir(obj,oEvent){
		var x=oEvent.clientX-(obj.offsetLeft+obj.offsetWidth/2);
		var y=(obj.offsetTop+obj.offsetHeight/2)-oEvent.clientY; 
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	}
	
	function lagou(obj){
		obj.onmouseover=function(ev){
			var oEvent=ev || event;
			
			var oFrom=oEvent.fromElemnt || oEvent.relatedTarget;
			
			if(oFrom && obj.contains(oFrom)){
				return ;
			} 
			
			var oSpan=this.children[0];
			var n=getDir(this,oEvent);
			
			switch(n){
				case 0:
					oSpan.style.left="-200px"; 
					oSpan.style.top="0"; 
					break;
				case 1:
					oSpan.style.left="0"; 
					oSpan.style.top="200px";
					break;
				case 2:
					oSpan.style.left="200px"; 
					oSpan.style.top="0";
					break;
				case 3:
					oSpan.style.left="0"; 
					oSpan.style.top="-200px";
					break;
			}
			
			move(oSpan,{left:0,top:0});
		};
		
		obj.onmouseout=function(ev){
			var oEvent= ev || event;
			
			var oTo=oEvent.toElement || oEvent.relatedTarget;
			if(oTo && obj.contains(oTo)){
				return ;
			} 
			
			var oSpan=this.children[0];
			var n=getDir(this,oEvent);
			
			switch(n){
				case 0:  
					move(oSpan,{left:-200,top:0});
					break;
				case 1:
					move(oSpan,{left:0,top:200});
					break;
				case 2:
					move(oSpan,{left:200,top:0});
					break;
				case 3:
					move(oSpan,{left:0,top:-200});
					break;
			}
		};
	 };
};//仿lagou特效

function sou(){
	var oNav=document.getElementById("nav");
	var oL=oNav.getElementsByTagName("ol")[0];
	var oDay=document.getElementsByClassName("day")[0];
	var oLogin=document.getElementsByClassName("login")[0];
	var oDl=document.getElementsByClassName("denglu")[0];
	var oMain=document.getElementById("main");
	var oFoot=document.getElementById("foot");
	var oUl=document.getElementById("ol1");
	var oText=document.getElementById("txt");
	var oBtn=document.getElementById("btn");
	var aLi=oUl.children;
	
	oLogin.onmouseover=function(){
		oDl.style.display="block";
	};	
	oLogin.onmouseout=function(){
		oDl.style.display="none";
	};
	oL.onmouseover=function(){
		oDay.style.display="block";
	}
	oL.onmouseout=function(){
		oDay.style.display="none";
	};
	var iNow=-1;
	var oldValue="";
	var url="http://sug.so.360.cn/suggest";
		
	oUl.onclick=function(ev){
		var oEvent=ev || event;
		var oSrc=oEvent.srcElement || oEvent.target;
		if(oSrc.tagName.toLowerCase()=="li"){
			oText.value=oSrc.innerHTML;
		}	
	};
	
	oText.onkeydown=function(ev){
		var oEvent=ev || event;		
		if(oEvent.keyCode==38){
			iNow--;
			if(iNow==-2){
				iNow=aLi.length-1;
			}			
			for(var i=0;i<aLi.length;i++){
				aLi[i].className="";
			}
			if(iNow==-1){
				oText.value=oldValue;
			} else {
				aLi[iNow].className="active";
				oText.value=aLi[iNow].innerHTML;
			}
		}
		
		if(oEvent.keyCode== 40){
			iNow++;			
			if(iNow== aLi.length){
				iNow=-1;
			}
			for(var i=0;i<aLi.length;i++){
				aLi[i].className="";
			}			
			if(iNow==-1){
				oText.value=oldValue;
			} else {
				aLi[iNow].className="active";
				oText.value=aLi[iNow].innerHTML;
			}			
		}			
	};
	oBtn.onclick=function(){
		window.open("http://sug.so.360.cn/suggest?word="+oText.value,"_self");
	};	
	
	oText.onkeyup=function(ev){
		var oEvent=ev || event;
		if(oEvent.keyCode==38 || oEvent.keyCode==40){
			return;
		}
		if(oEvent.keyCode==13){
			window.open("http://sug.so.360.cn/suggest?&word="+this.value,"_self");
			return;
		}
		
		oldValue=this.value;
		jsonp({
			url:url,
			data:{word:this.value},
			cbName:"callback",
			success:function(json){
				if(json.s.length > 0){
					createLi(json);
					oUl.style.display="block";
				} else {
					oUl.style.display="none";
				}
							
			}	
		});
	};

	function createLi(json){
		oUl.innerHTML="";
		for(var i=0;i<json.s.length;i++){
			var oLi=document.createElement("li");
			oLi.innerHTML=json.s[i];
			oUl.appendChild(oLi);
		}
	}	
		
	};
		
	function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+"="+encodeURIComponent(json[name]));
	}
	return arr.join("&");
	}
	function jsonp(options){
	
	options=options || {};
	if(!options.url){
		return ;
	}
	
	options.data=options.data || {};
	options.timeout=options.timeout || 0;
	options.cbName=options.cbName || "cb";
	
	var fnName=("jsonp"+Math.random()).replace(".","");
	options.data[options.cbName]=fnName;
	window[fnName]=function(json){
		options.success && options.success(json);
		oHead.removeChild(oS);
		clearTimeout(timer);
	};
	//创建
	var oS=document.createElement("script");
	oS.src=options.url+"?"+json2url(options.data);
	var oHead=document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	//超时
	if(options.timeout){
		var timer=setTimeout(function(){
			window[fnName]=function(){};
			oHead.removeChild(oS);	
			options.error && options.error();
		},options.timeout);
	}
};//好搜

function mobile(){
	var aLi=document.getElementsByTagName('li');
	var oUl=document.getElementsByTagName('ul')[0];
	var oCont=document.getElementById('container');
	var oLoading=document.getElementById('loading');
	var count=1 ;
	var total=6;

	//load效果
	for(var i=1;i<6;i++){
		var oImg=document.createElement('img');	
		oImg.onload=function(){
			count++;
			if(count==total){
				oCont.style.opacity=1;
				oLoading.style.display='none'
			}
		};
		oImg.onerror=function(){
			alert('加载图片失败 , 请稍候再试')
		};
		oImg.src='zd/mi_'+i+'.png';
	}
	
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	var iNow= 0 ;
	oUl.onmousedown=function(ev){
		clearInterval(oUl.timer);
		var oEvent=ev||event;
		var oDown=oEvent.clientX;
		var disX=oEvent.clientX-oUl.offsetLeft ;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var cur= oEvent.clientX-disX ;
			var oX= oEvent.clientX-oDown;
			
			if(iNow==0 && oX > 0){
				cur= cur/5;
			}
			if(iNow==aLi.length-1 && oX < 0){
				cur=-oUl.offsetWidth+aLi[0].offsetWidth+oX/5  ;
			}
			oUl.style.left=cur +'px'	
		};	  //onmousemove  end
			
		document.onmouseup=function(ev){
			document.onmouseup=null;
			document.onmousemove=null;
			var oEvent=ev||event;
			var delta=oEvent.clientX-oDown;
			
			if(Math.abs(delta)<70){
				move(oUl,{left:-iNow*214})
			}else{
				if(delta<0 ){
					iNow++;
					if(iNow==aLi.length){
						iNow=aLi.length-1;
					}
					move(oUl,{left:-iNow*214})
				}else{
					iNow--;
					if(iNow<0){
						iNow=0 ;
					}
					move(oUl,{left:-iNow*214})
				}
			}
		}	
		return false;	
	}
};//手机换页