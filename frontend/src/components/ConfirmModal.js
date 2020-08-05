import React, { useState } from "react";
import "../styles/ConfirmModal.css";
import { Fade } from "react-awesome-reveal";
import { printWordWithBlankTiles, fillInBlankTiles } from "../utils/handleBlankTiles";

const ConfirmModal = ({
	message,
	handleResign,
	handlePass,
	handleConfirmMove,
	closeModal,
  turnWords,
  handleBlankTilefromConfirmModal
}) => {
	let confirmFunction;
	let word = [];
	let blankTiles = [];
  let [blankTilesValue, setBlankTilesValue] = useState([]);
  

	const handleBlankTileAsign = () => {
    if (blankTilesValue.length < blankTiles.length) return;
    //mamipulate the new word
    const completeWords = fillInBlankTiles(turnWords, blankTilesValue)
    handleBlankTilefromConfirmModal(completeWords)
	};
	switch (message.type) {
		case "resign":
			confirmFunction = handleResign;
			break;

		case "pass":
			confirmFunction = handlePass;
			break;

		case "confirm":
			confirmFunction = handleConfirmMove;
			break;

		case "blankTile":
			let words = printWordWithBlankTiles(turnWords);
			let noBlankTiles = words.noBlankTiles;
			word = words.word;
			for (var i = 0; i < noBlankTiles; i++) {
				blankTiles.push(
					<input
						maxLength="1"
						key={i}
						value={blankTilesValue[i]}
						onChange={(e) =>
							setBlankTilesValue([ ...blankTilesValue, (blankTilesValue[i] = e.target.value) ])}
						style={{ display: "block", marginTop: "10px" }}
					/>
				);
			}
			confirmFunction = handleBlankTileAsign;
			break;

		default:
			return;
	}

	return (
		<Fade triggerOnce className="confirmModal__wrapper">
			<div className="confirmModal__content">
				<p>{message.message}</p>
				{message.type === "blankTile" && (
					<div>
						{word}
						<br />
						{blankTiles}
					</div>
				)}
				<div className="confirmModal__buttons">
					<button className="button__confirm" onClick={confirmFunction}>
						Confirm
					</button>
					<button className="button__cancel" onClick={closeModal}>
						Cancel
					</button>
				</div>
			</div>
		</Fade>
	);
};

export default ConfirmModal;
