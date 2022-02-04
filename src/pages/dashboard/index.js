import React from "react";
import styled from "styled-components";
import Board from "./Board";
import NewBoard from "./NewBoard";
import {useSelector} from "react-redux";
import {getBoards} from "../../redux/selectors";

const Boards = styled.div`
  margin: 15px 2vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;


const Dashboard = () => {
	const boards = useSelector(getBoards());

	return (
		<Boards>
			{boards.filter(cur => cur.status === "READY").map(cur => <Board key={cur.id} title={cur.title} id={cur.id} isFavourite={cur.isFavourite}/>)}
			<NewBoard/>
		</Boards>
	);
};

export default Dashboard;