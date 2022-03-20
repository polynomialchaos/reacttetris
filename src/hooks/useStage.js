import { useState, useEffect } from "react";
import { checkCollision, createCell, createStage, createStageRow } from "../game_helpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rows_cleared, setRowsCleared] = useState();

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(createStageRow());
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])

        const updateStage = prevStage => {
            const newStage = prevStage.map(row =>
                row.map(cell =>
                    (cell[1] ? createCell() : cell))
            );

            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            player.collided ? false : true
                        ];
                    }
                })
            });

            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage)
            }

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])

    return [stage, rows_cleared, setStage]
}