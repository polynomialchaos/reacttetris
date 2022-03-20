import { useCallback, useEffect, useState } from "react";

export const useGameStatus = rows_cleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const line_points = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        if (rows_cleared > 0) {
            setScore(prev => prev + line_points[rows_cleared - 1] * (level + 1));
            setRows(prev => prev + rows_cleared);
        }
    }, [level, line_points, rows_cleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rows_cleared, score]);

    return [score, rows, level, setScore, setRows, setLevel]
}