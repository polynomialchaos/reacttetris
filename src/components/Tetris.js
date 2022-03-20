import React, { useState } from "react";
import { checkCollision, createStage } from "../game_helpers";
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
    const [drop_time, setDropTime] = useState(null);
    const [game_over, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, rows_cleared, setStage] = useStage(player, resetPlayer);
    const [score, rows, level, setScore, setRows, setLevel] = useGameStatus(rows_cleared);

    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 }))
            updatePlayerPos({ x: dir, y: 0, collided: false });
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                console.log('GAME OVER');
                setGameOver(true);
                setDropTime(null);
            }
            console.log('on bottom');
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = (key) => {
        if (!game_over) {
            if (key === "ArrowDown") {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const move = (key) => {
        if (!game_over) {
            switch (key) {
                case "ArrowLeft":
                    movePlayer(-1);
                    break;
                case "ArrowRight":
                    movePlayer(1);
                    break;
                case "ArrowDown":
                    dropPlayer();
                    break;
                case "ArrowUp":
                    rotatePlayer(stage, 1);
                    break;
            }
        }
    }

    useInterval(() => {
        drop()
    }, drop_time);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e.key)} onKeyUp={(e) => keyUp(e.key)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {
                        game_over ? (
                            <Display game_over={{ game_over }} text="Game over" />
                        ) : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                                <Display text={`Level: ${level}`} />
                            </div>
                        )
                    }
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;