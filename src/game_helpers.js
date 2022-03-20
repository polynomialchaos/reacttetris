import { STAGE_HEIGHT, STAGE_WIDTH } from "./constants";

export const createCell = () => [0, true]; // second argument false if contains collided element
export const createStageRow = () => Array(STAGE_WIDTH).fill(createCell());
export const createStage = () => Array(STAGE_HEIGHT).fill(createStageRow())

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        var newY = y + player.pos.y + moveY;

        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            if (player.tetromino[y][x] !== 0) {
                var newX = x + player.pos.x + moveX;

                if (newY < 0 || newY > stage.length - 1)
                    return true;

                if (newX < 0 || newX > stage[y].length - 1)
                    return true;

                if (!stage[newY][newX][1])
                    return true;
            }
        }
    }

    return false;
}