import "./Formation.css";
import { Player } from "./Player";
import { useRef, useEffect, useState } from "react";

export function Formation() {

    const canvasRef = useRef(null);
    const stageWidth = 1200;
    const stageHeight = 600;
    const [playerList, setPlayerList] = useState([]);

    const [xposition, setXposition] = useState(0);
    const [yposition, setYposition] = useState(0);

    const handleXposition = (event) => {
      setXposition(event.target.value);
    };

    const handleYposition = (event) => {
        setYposition(event.target.value);
    };

    const addPlayer = () => {
        const player = new Player(stageWidth, stageHeight, 30, xposition, yposition);
        setPlayerList(prevList => [...prevList, player]);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = stageWidth;
        canvas.height = stageHeight;

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
        console.log(playerList);

        return () => cancelAnimationFrame(animate);
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
                <div className = "createPlayerButton" onClick = {addPlayer}>
                    생성하기
                </div>
            </div>
        </div>
    );
}

export default Formation;