import { STAGE_HEIGHT, STAGE_WIDTH } from "./constants";

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

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

                if (stage[newY][newX][1] !== 'clear')
                    return true;
            }
        }
    }

    return false;
}