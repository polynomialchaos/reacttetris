import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ game_over, text }) => (
    <StyledDisplay game_over={game_over}>{text}</StyledDisplay>
)

export default Display;