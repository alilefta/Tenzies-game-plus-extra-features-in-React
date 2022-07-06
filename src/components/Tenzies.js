import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
// import { useWindowSize } from "react-use";

export default function Tenzies() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [rollNum, setRollNum] = useState(0);
	const [timeRequired, setTimeRequired] = useState("00:00");
	const [bestTime, setBestTime] = useState(
		JSON.parse(localStorage.getItem("bestTime")) || []
	);
	const [start, setStart] = useState(false);
	const [showTime, setShowTime] = useState("");
	const [timeAtWinning, setTimeAtWinning] = useState("00:00");
	function allNewDice() {
		const dics = [];
		for (let i = 0; i < 10; i++) {
			dics.push(generateNewDie());
		}
		return dics;
	}

	useEffect(() => {
		const allDieTrue = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);

		if (allDieTrue && allSameValue) {
			setTenzies((prev) => !prev);
			setBestTime((prevTimes) => [timeRequired, ...prevTimes]);
			setTimeAtWinning(timeRequired);
		}
		showBestTime();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dice]);

	function clearTimer(id) {
		clearInterval(id);
	}

	useEffect(() => {
		setShowTime(showBestTime());
		let min = 0;
		let sec = 0;
		const id = setInterval(() => {
			sec++;
			if (sec % 60 === 0) {
				min++;
				sec = 0;
			}
			if (start) {
				setTimeRequired(
					(min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec)
				);
			}
		}, 1000);

		return () => clearTimer(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tenzies, start]);

	useEffect(() => {
		localStorage.setItem("bestTime", JSON.stringify(bestTime));
	}, [bestTime]);

	function generateNewDie() {
		return {
			isHeld: false,
			value: Math.ceil(Math.random() * 6),
			id: nanoid(),
		};
	}

	function showBestTime() {
		let items = bestTime;
		if (items.length > 0) {
			let bestTimeHere = items[0];

			for (let i = 1; i < items.length; i++) {
				if (
					Number(items[i].split(":")[0]) <=
						Number(bestTimeHere.split(":")[0]) &&
					Number(items[i].split(":")[1]) <= Number(bestTimeHere.split(":")[1])
				) {
					bestTimeHere = items[i];
				}
			}

			return bestTimeHere;
		} else {
			return "Didn't played yet!";
		}
	}
	function rollDice() {
		if (start) {
			if (tenzies) {
				setDice(allNewDice());
				setTenzies(false);
				setRollNum(0);
				setTimeRequired("00:00");
			} else {
				setDice((prevDice) =>
					prevDice.map((die) => {
						return die.isHeld ? die : generateNewDie();
					})
				);
				setRollNum((prev) => prev + 1);
			}
		} else {
			setStart((prev) => !prev);
		}
	}
	function holdDie(e, id) {
		if (start) {
			setDice((prevDie) =>
				prevDie.map((die) => {
					return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
				})
			);
		}
	}

	const diceElements = dice.map((e) => (
		<Die
			started={start}
			key={e.id}
			value={e.value}
			isHeld={e.isHeld}
			holdDie={(event) => holdDie(event, e.id)}
		/>
	));
	const { confettiWidth } = useWindowSize();

	return (
		<div className="tenzies--container">
			{tenzies ? <Confetti width={confettiWidth} height={740} /> : null}
			<h1>Tenzies</h1>
			<p className="best-time">Last Best Time: {showTime}</p>
			<p>
				Roll until all dice are the same. Click each dice to freeze it at its
				current value between rolls.
			</p>
			<div className="dices">{diceElements}</div>
			<div className="lower">
				<p className="rolls--num">Rolls {rollNum}</p>
				<button
					className="roll-dice"
					style={{
						backgroundColor: !start ? "#24be41" : "#5035ff",
					}}
					onClick={rollDice}
				>
					{start ? (tenzies ? "New Game" : "Roll") : "Start"}
				</button>
				<p className="timeRequired">
					Time {tenzies ? timeAtWinning : timeRequired}
				</p>
			</div>
		</div>
	);
}
