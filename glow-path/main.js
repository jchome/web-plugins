$( document ).ready(function() {
    const options = [
        {
            lineWidth: 20,
            strokeStyle: '#948064',
        },
        {
            lineWidth: 10,
            strokeStyle: '#7c6b53',
        },
    ];
    $(".path").each((index, elt) => {
      const allSteps = $(elt).find(".step");
      for(let i=0;i<allSteps.length-1;i++){
          drawPath(allSteps[i], allSteps[i+1], options);
      }  
    });

});


function drawPath(stepStart, stepEnd, options){
    // Add a canvas (width = 100%)
    const canvas = $('<canvas class="path-section"></canvas>').insertAfter(stepStart);
    const canvasHeightCss = canvas.css('height');
    canvas.get(0).height = parseInt(canvasHeightCss.substring(0, canvasHeightCss.length-2));
    canvas.get(0).width = canvas.width();
    const posStart = {x: $(stepStart).position().left + $(stepStart).width()/3, y: 10};
    const posEnd = {x: $(stepEnd).position().left + $(stepEnd).width()/3 , y: canvas.height()-10};
    const ctx = canvas.get(0).getContext("2d");
    
    if(Array.isArray(options)){
        for (const option of options) {
            drawBezier(ctx, posStart, posEnd, option);
        }
    }else if(options.constructor.name === "Object"){
        drawBezier(ctx, posStart, posEnd, options);
    }
}

function drawBezier(ctx, posStart, posEnd, option){
    ctx.beginPath();
    if(option.lineWidth){
        ctx.lineWidth = option.lineWidth;
    }
    if(option.strokeStyle){
        ctx.strokeStyle = option.strokeStyle;
    }
    ctx.moveTo(posStart.x, -50)
    ctx.bezierCurveTo(posStart.x,posStart.y+50, posEnd.x,posEnd.y-50, posEnd.x,posEnd.y+50);
    ctx.stroke();
}
