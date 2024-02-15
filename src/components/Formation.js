import "./Formation.css";
import "./Button.css";
import Position from "../data/position.json";
import { Player } from "./Player";
import { useRef, useEffect, useState } from "react";

export function Formation() {

    const canvasRef = useRef(null);
    const stageWidth = 1200;
    const stageHeight = 600;

    const [playerList, setPlayerList] = useState([]);

    const [xposition, setXposition] = useState(0);
    const [yposition, setYposition] = useState(0);

    const positions = Position.players.map(player => player.position);

    const handleXposition = (event) => {
      setXposition(event.target.value);
    };

    const handleYposition = (event) => {
        setYposition(event.target.value);
    };

    const addPlayer = (position) => {
        
        var player;
        const playerData = Position.players.find(player => player.position === position);
        if(playerData) {
            player = new Player(stageWidth, stageHeight, 30, playerData.x_position, playerData.y_position, position);
        }
        else {
            player = new Player(stageWidth, stageHeight, 30, xposition, yposition, position);
        }
        setPlayerList(prevList => [...prevList, player]);
    };

    const clearPlayer = () => {
        setPlayerList([]);
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = stageWidth;
        canvas.height = stageHeight;

        const handleMouseDown = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
    
            for (let i = playerList.length - 1; i >= 0; i--) {
                const player = playerList[i];
                console.log("comes in");
                if (isInsidePlayer(mouseX, mouseY, player)) {
                    player.onMouseDown(event);
                    console.log("succes");
                }
            }
        };
    
        const handleMouseMove = (event) => {
            playerList.forEach(player => {
                player.onMouseMove(event);
            });
        };
    
        const handleMouseUp = () => {
            playerList.forEach(player => {
                player.onMouseUp();
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            if (playerList.length > 0) {
                playerList.forEach(player => {
                    player.draw(ctx);
                });
            }

            drawLines(ctx, playerList);

            requestAnimationFrame(animate);
        };

        const drawLines = (ctx, players) => {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.beginPath();
            players.forEach((player, index) => {
                if (index === 0) {
                    ctx.moveTo(player.x, player.y);
                } else {
                    ctx.lineTo(player.x, player.y);
                }
            });
            ctx.closePath();
            ctx.stroke();
        };

        animate();

        // dragging rule
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            cancelAnimationFrame(animate);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [stageWidth, stageHeight, playerList]);

    return (
        <div className = "FormationGrid">
            This is a formation grid.
            <canvas ref={canvasRef} className="Formation"></canvas>
            <div className = "createPlayer">
                x-position : 
                <input
                    type="number"
                    value={xposition}
                    onChange={handleXposition}
                />
                px
                y-position : 
                <input
                    type="number"
                    value={yposition}
                    onChange={handleYposition}
                />
                px
                <div className = "button100" onClick = {() => addPlayer("free")}>
                    생성하기
                </div>
                <div className = "button100" onClick = {clearPlayer}>
                    초기화하기
                </div>
            </div>
            <div className = "createPosition">
                {positions.map((position, index) => (
                <div className="button100" onClick = {() => addPlayer(position)}>{position}</div>
                ))}
            </div>
        </div>
    );
}

function isInsidePlayer(x, y, player) {
    console.log(x, y, player.x, player.y);
    const dx = (x - 160) - player.x;
    const dy = (y - 20) - player.y;
    return dx * dx + dy * dy <= player.radius * player.radius;
}


export default Formation;