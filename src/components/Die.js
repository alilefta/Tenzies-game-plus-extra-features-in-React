import { nanoid } from "nanoid";

export default function Die(props) {
	const styles = {
		background:
			props.started === false
				? "linear-gradient(to right, rgb(0, 0, 0), rgb(73 100 227)) rgb(255, 255, 255)"
				: props.isHeld
				? "#59e391"
				: "linear-gradient(to right, #dddddd, #ffffff)",
	};
	const center = { gridArea: "2/2/2/2" };
	const topLeft = { gridArea: "1/1/1/1" };
	const topRight = { gridArea: "1/3/1/3" };
	const bottomLeft = { gridArea: "3/1/3/1" };
	const bottomRight = { gridArea: "3/3/3/3" };
	const centerLeft = { gridArea: "2/1/2/1" };
	const centerRight = { gridArea: "2/3/2/3" };
	function dots(value) {
		let array = [];
		if (value === 1) {
			array.push(<span style={center} key={nanoid()} className="dot"></span>);
		} else if (value === 2) {
			array.push(<span className="dot" key={nanoid()} style={topLeft}></span>);
			array.push(
				<span className="dot" key={nanoid()} style={bottomRight}></span>
			);
		} else if (value === 3) {
			array.push(<span className="dot" key={nanoid()} style={topRight}></span>);
			array.push(<span className="dot" key={nanoid()} style={center}></span>);
			array.push(
				<span className="dot" key={nanoid()} style={bottomLeft}></span>
			);
		} else if (value === 4) {
			array.push(<span className="dot" key={nanoid()} style={topRight}></span>);
			array.push(<span className="dot" key={nanoid()} style={topLeft}></span>);
			array.push(
				<span className="dot" key={nanoid()} style={bottomLeft}></span>
			);
			array.push(
				<span className="dot" key={nanoid()} style={bottomRight}></span>
			);
		} else if (value === 5) {
			array.push(<span className="dot" key={nanoid()} style={topRight}></span>);
			array.push(<span className="dot" key={nanoid()} style={topLeft}></span>);
			array.push(<span className="dot" key={nanoid()} style={center}></span>);
			array.push(
				<span className="dot" key={nanoid()} style={bottomLeft}></span>
			);
			array.push(
				<span className="dot" key={nanoid()} style={bottomRight}></span>
			);
		} else if (value === 6) {
			array.push(<span className="dot" key={nanoid()} style={topRight}></span>);
			array.push(<span className="dot" key={nanoid()} style={topLeft}></span>);
			array.push(
				<span className="dot" key={nanoid()} style={centerLeft}></span>
			);
			array.push(
				<span className="dot" key={nanoid()} style={centerRight}></span>
			);
			array.push(
				<span className="dot" key={nanoid()} style={bottomLeft}></span>
			);
			array.push(
				<span className="dot" key={nanoid()} style={bottomRight}></span>
			);
		}

		return array;
	}
	return (
		<div style={styles} className="die--face" onClick={props.holdDie}>
			{props.started ? dots(props.value).map((e) => e) : ""}
		</div>
	);
}
