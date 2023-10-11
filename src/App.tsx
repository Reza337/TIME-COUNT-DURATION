import { useState } from "react";
import "./App.css";

function App() {
	const [partyTime, setPartyTime] = useState(false);
	const [targetDate, setTargetDate] = useState("");
	const [targetTime, setTargetTime] = useState("");
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [countdownInterval, setCountdownInterval] =
		useState<NodeJS.Timeout | null>(null);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetDate(e.target.value);
		setPartyTime(false);
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetTime(e.target.value);
		setPartyTime(false);
	};

	const startCountdown = () => {
		if (countdownInterval) {
			clearInterval(countdownInterval);
		}
		const target = new Date(`${targetDate} ${targetTime}`);

		const interval = setInterval(() => {
			const now = new Date();
			const difference = target.getTime() - now.getTime();

			const Days = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(Days);

			const Hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			setHours(Hours);

			const Minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			setMinutes(Minutes);

			const Seconds = Math.floor((difference % (1000 * 60)) / 1000);
			setSeconds(Seconds);

			if (Days <= 0 && Hours <= 0 && Minutes <= 0 && Seconds <= 0) {
				setPartyTime(true);
				clearInterval(interval);
			}
		}, 1000);

		setCountdownInterval(interval);
	};

	const resetCountdown = () => {
		if (countdownInterval) {
			clearInterval(countdownInterval);
		}
		setDays(0);
		setHours(0);
		setMinutes(0);
		setSeconds(0);
		setPartyTime(false);
	};
	return (
		<>
			<div className="input-wrapper">
				<input
					className="input-date"
					type="date"
					value={targetDate}
					onChange={handleDateChange}
				/>
				<input
					className="input-time"
					type="time"
					value={targetTime}
					onChange={handleTimeChange}
				/>
				<button className="button-start" onClick={startCountdown}>
					Start Countdown
				</button>
				<button className="button-reset" onClick={resetCountdown}>
					Reset
				</button>
			</div>
			{partyTime ? (
				<h1>Count Ended</h1>
			) : (
				<div className="timer-wrapper">
					<div className="timer-inner">
						<div className="timer-segment">
							<span className="time">{days}</span>
							<span className="label">Days</span>
						</div>
						<div className="timer-segment">
							<span className="time">{hours}</span>
							<span className="label">Hours</span>
						</div>
						<div className="timer-segment">
							<span className="time">{minutes}</span>
							<span className="label">Minutes</span>
						</div>
						<div className="timer-segment">
							<span className="time">{seconds}</span>
							<span className="label">Seconds</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
