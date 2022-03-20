import { STAGE_HEIGHT, STAGE_WIDTH } from "./constants";

export const createCell = () => [0, true]; // second argument false if contains collided element
export const createStageRow = () => Array(STAGE_WIDTH).fill(createCell());
export const createStage = () => Array(STAGE_HEIGHT).fill(createStageRow())

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; ++y) {
        for (let x = 0; x < player.tetromino[y].length; ++x) {
            if (player.tetromino[y][x] !== 0) {
                let newY = y + player.pos.y + moveY;
                let newX = x + player.pos.x + moveX;

                if (!stage[newY] ||
                    !stage[newY][newX] ||
                    !stage[newY][newX][1]
                ) {
                    return true;
                }

            }
        }
    }

    return false;
}