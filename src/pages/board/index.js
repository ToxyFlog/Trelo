import React, {useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import List from "./List";
import NavBar from "./NavBar";
import {getBoard, getCards} from "../../redux/selectors";
import {DragDropContext} from "react-beautiful-dnd";
import {fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";
import {changeCard, reorderCards} from "../../redux/actionCreators/cardActionCreator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  background: #0179bf;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 2vw;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
    opacity: 0;
  }
`;


const Board = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));
	const cards = useSelector(getCards(boardId));

	const ref = useRef(document.body);

	useKeyboard({ref, key: "escape", cb: () => navigate("/")});
	useTitle(board && board.title ? board.title : "Board");


	useEffect(() => {
		if (board === null) dispatch(fetchBoard(boardId));
	}, []);

	if (!board || board.status === "LOADING") return <PageLoading/>;
	if (board.status === "ERROR") return <PageError>This board doesn't exist or you aren't a member of it!</PageError>;


	const onDragEnd = e => {
		const srcListId = e.source.droppableId;
		const srcInd = e.source.index;
		const dstListId = e.destination.droppableId;
		const dstInd = e.destination.index;
		const cardId = e.draggableId;

		console.log(e);
		const order = [];
		if (srcListId === dstListId) {
			if (srcInd === dstInd) return;
			cards.forEach(card => {
				if (card.listId === srcListId) {
					if (srcInd > dstInd && card.order >= dstInd && card.order < srcInd) order.push({id: card.id, order: card.order + 1});
					else if (card.order > srcInd && card.order <= dstInd) order.push({id: card.id, order: card.order - 1});
				}
			});
		} else {
			cards.forEach(card => {
				if (card.listId === srcListId && card.order > srcInd) order.push({id: card.id, order: card.order - 1});
				else if (card.listId === dstListId && card.order >= dstInd) order.push({id: card.id, order: card.order + 1});
			});
		}

		if (order.length !== 0) dispatch(reorderCards(boardId, order));
		if (srcListId === dstListId && srcInd === dstListId) return;
		dispatch(changeCard(boardId, {...cards.filter(cur => cur.id === cardId)[0], listId: dstListId, order: dstInd}));
	};


	return (
		<Container>
			<NavBar board={board}/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Lists>
					{board.lists.map(cur => <List boardId={boardId} key={cur.id} {...cur} cards={cards ? cards.filter(card => card.listId === cur.id) : []}/>)}
				</Lists>
			</DragDropContext>
		</Container>
	);
};

export default Board;