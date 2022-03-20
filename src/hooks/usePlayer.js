import { useCallback, useState } from "react";
import { STAGE_WIDTH } from "../constants";
import { checkCollision } from "../game_helpers";
import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided
        }))
    }

    const rotate = (matrix, direction) => {
        const rot_tetromino = matrix.map((_, index) => matrix.map(col => col[index]));

        if (direction > 0) return rot_tetromino.map(row => row.reverse());
        return rot_tetromino.reverse();
    }

    const rotatePlayer = (stage, direction) => {
        const new_player = JSON.parse(JSON.stringify(player));
        new_player.tetromino = rotate(new_player.tetromino, direction);

        const pos = new_player.pos.x;
        let offset = 1;
        while (checkCollision(new_player, stage, { x: 0, y: 0 })) {
            new_player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > new_player.tetromino[0].length) {
                rotate(new_player.tetromino, -direction);
                new_player.pos.x = pos;
                return;
            }
        }

        setPlayer(new_player);
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, rotatePlayer];
}