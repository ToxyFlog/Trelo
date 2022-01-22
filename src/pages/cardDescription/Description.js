import React, {useState} from "react";
import styled from "styled-components";

import {Container, SubTitle} from "./styles";

const DescriptionInput = styled.textarea`
  background: #f4f4f4;
  border: none;
  border-radius: 8px;
  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
  outline: none;
  width: 100%;
  min-height: 10rem;
  padding: .6rem 1.2rem;
  font-size: 1.8rem;
  resize: none;
`;

const Description = () => {
	const [description, setDescription] = useState("");

	const onChange = e => setDescription(e.target.value);

	return (
		<Container>
			<SubTitle>Description</SubTitle>
			<DescriptionInput onChange={onChange} value={description}/>
		</Container>
	);
};

export default Description;