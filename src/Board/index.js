import Square from "../Square";
import Result from "../Result";
import { useEffect, useState } from "react";
import { winningPatterns } from "./patterns";
import { StyledBoard } from "./styled";

const Board = () => {

    const initialState = "";

    const [boardStatus, setBoardStatus] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [result, setResult] = useState(initialState);
    const [draw, setDraw] = useState(initialState);

    const chooseSquare = (selectedBoardIndex) => {

        setBoardStatus(
            boardStatus.map((value, index) => {
                if (index === selectedBoardIndex && value === null) {
                    return currentPlayer;
                } return value;
            })
        );

        if (boardStatus[selectedBoardIndex]) {
            return;
        };

        currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
    };

    useEffect(() => {
        for (const winningPattern of winningPatterns) {
            const [a, b, c] = winningPattern;
            if (boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c]) {
                setResult(boardStatus[a]);
            }
        };

        const isFilled = (selectedBoardIndex) => {
            return selectedBoardIndex !== null;
        };
    
        if (boardStatus.every(isFilled)){
            setDraw("draw");
        };
    }, [boardStatus]);

    const playAgain = () => {
        setBoardStatus(Array(9).fill(null));
        setCurrentPlayer("X")
        setResult(initialState)
        setDraw(initialState)
    };



    return (
        <>
            <StyledBoard >
                {boardStatus.map((selectedBoardIndex, index) => (
                    <Square
                        key={index}
                        onClick={() => chooseSquare(index)}
                        value={selectedBoardIndex}
                    />
                ))}
            </StyledBoard>
            <Result
                trigger={result}
                onClick={playAgain}
                title={"The winner: "}
            >
                {result}
            </Result>
            <Result
                trigger={draw}
                onClick={playAgain}
                title={"It is a "}
            >
                {draw}
            </Result>
        </>
    );
};

export default Board;