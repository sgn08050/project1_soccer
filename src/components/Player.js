export class Player {
    constructor(stageWidth, stageHeight, radius, x, y, position) {
        this.stageWidth = parseInt(stageWidth);
        this.stageHeight = parseInt(stageHeight);
        this.radius = parseInt(radius);
        this.x = this.checkBound(parseInt(stageWidth), parseInt(radius), parseInt(x));
        this.y = this.checkBound(parseInt(stageHeight), parseInt(radius), parseInt(y));
        this.position = position;

        this.isDragging = false;
        this.prevX = 0;
        this.prevY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.position, this.x, this.y);
    }

    // Down mouse event.
    onMouseDown(event) {
        this.isDragging = true;
        this.prevX = event.clientX;
        this.prevY = event.clientY;
    }

    // Move mouse event (drag).
    onMouseMove(event) {
        if (this.isDragging) {
            const deltaX = event.clientX - this.prevX;
            const deltaY = event.clientY - this.prevY;
            this.x += deltaX;
            this.y += deltaY;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
        }
    }

    // Up mouse event.
    onMouseUp() {
        this.isDragging = false;
    }

    // Check bound and place ball at the right place.
    checkBound( restrictLength, radius, position ) {
        
        if (position <= radius) {
            return radius;
        }
        else if ((position + radius) >= restrictLength) {
            return restrictLength - radius;
        }
        else {
            return position;
        }
    }
}