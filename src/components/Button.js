import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1.8rem;
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid #000;
  border-radius: 5px;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    transform: translateY(1px);
  }

  ${props => props.primary ? `
	background: #4040ff;
	color: #fff;
	` : `
	background: #f0f0f0;
	color: #000;
  `}
`;

export default Button;