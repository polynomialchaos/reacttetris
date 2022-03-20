import React, { useState } from "react";
import { checkCollision, createStage } from "../game_helpers";
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
    const [drop_time, setDropTime] = useState(0);
    const [game_over, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 }))
            updatePlayerPos({ x: dir, y: 0, collided: false });
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                console.log('game ver');
                setGameOver(true);
                setDropTime(null);
            }
            console.log('on bottom');
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const dropPlayer = () => {
        drop();
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
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e.key)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {
                        game_over ? (
                            <Display game_over={{ game_over }} text="Game over" />
                        ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
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