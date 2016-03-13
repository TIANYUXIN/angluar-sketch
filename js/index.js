var sketch = angular.module('sketch',[]);
sketch.controller('sketchController', ['$scope', function($scope){
	$scope.canvasWH={width:700,height:540};
    $scope.csState={
    	fillStyle:'#000000',
    	strokeStyle:'#000000',
    	linewidth:1,
    	style:'stroke'
    }
    $scope.setStyle=function(s){
    	$scope.csState.style=s;
    }
    $scope.newSketch=function(){
    	if(previous){
    		if(confirm("是否保存")){
                location.href=canvas.toDataURL();
    		}
    	}else{
    		alert('此画布为空画布');
    	}
    	clearCanvas();
    	previous=null;
    }
    $scope.save=function(ev){
    	if(previous){
    		ev.srcElement.href=canvas.toDataURL();
    	   	ev.srcElement.download="myoic.png";
    	}else{
    		alert('空画布');
    	}
    	
    }
    $scope.tool="line";
    $scope.tools={
	    '画线':'line',
	    '画圆':'arc',
	    '矩形':'rect',
	    '铅笔':'pen',
	    '橡皮':'erase',
	    '选择':'select'
    };
    $scope.settool=function(tool){
        $scope.tool=tool;
        console.log($scope.tool);
    }


	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	var clearCanvas=function(){
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}
	var previous;
	var setmousemove={
		line:function(e){
		    canvas.onmousemove=function(ev){
			clearCanvas();
			if(previous){
				ctx.putImageData(previous,0,0);
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
            ctx.lineTo(ev.offsetX,ev.offsetY);
            ctx.stroke();
			}
		},
		pen:function(e){
			clearCanvas();
			if(previous){
				ctx.putImageData(previous,0,0);
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
		    canvas.onmousemove=function(ev){
			
            ctx.lineTo(ev.offsetX,ev.offsetY);
            ctx.stroke();
			}
		},
		arc:function(e){
		    canvas.onmousemove=function(ev){
			clearCanvas();
			if(previous){
				ctx.putImageData(previous,0,0);
			}
			ctx.beginPath();
            var r=Math.abs(ev.offsetX-e.offsetX);
            ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
            //ctx[$scope.csState.style]();
	            if($scope.csState.style=="fill"){
	            	ctx.fill();
	            }else{
	            	ctx.stroke();
	            }
			}
		},
		rect:function(e){
		    canvas.onmousemove=function(ev){
			clearCanvas();
			if(previous){
				ctx.putImageData(previous,0,0);
			}
			ctx.beginPath();
			var x=ev.offsetX-e.offsetX;
			var y=ev.offsetY-e.offsetY;
			if($scope.csState.style=="fill"){
				ctx.fillRect(e.offsetX,e.offsetY,x,y);
			}else{
				ctx.strokeRect(e.offsetX,e.offsetY,x,y);
			}
            
            // ctx.stroke();
			}
		},
		erase:function(e){

			canvas.onmousemove=function(ev){
				ctx.beginPath();
				ctx.clearRect(ev.offsetX,ev.offsetY,30,30);
			}
		},
		select:function(e){

		}

	}
	/*var saveCurrentImage=function(){
		previous=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}*/
    // $scope.fnname='linewh';
	canvas.onmousedown=function(e){
		ctx.fillStyle=$scope.csState.fillStyle;
		ctx.strokeStyle=$scope.csState.strokeStyle;
		ctx.lineWidth=$scope.csState.lineWidth;
        setmousemove[$scope.tool](e);
		document.onmouseup=function(){
			canvas.onmousemove=null;
			previous=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}
	//var current;


	/*canvas.onmousedown=function(e){
		canvas.onmousemove=function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0);
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
            ctx.lineTo(ev.offsetX,ev.offsetY);
            ctx.stroke();
		}
		document.onmouseup=function(){
			canvas.onmousemove=null;
			canvas.onmouseup=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}*/
	/*canvas.onmousedown=function(e){
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		if(current){
				ctx.putImageData(current,0,0);
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
		canvas.onmousemove=function(ev){
            ctx.lineTo(ev.offsetX,ev.offsetY);
            ctx.stroke();
		}
		document.onmouseup=function(){
			canvas.onmousemove=null;
			canvas.onmouseup=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}*/
	
}])