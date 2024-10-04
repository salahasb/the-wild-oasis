import styled, { css } from "styled-components";

const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 2.5rem;
			font-weight: 600;

			@media (min-width: 425px) {
				font-size: 3rem;
			}
		`}

	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}
    
    ${(props) =>
		props.as === "h3" &&
		css`
			font-size: 2rem;
			font-weight: 500;
			margin-bottom: 2rem;
		`}
    
    
		
    text-transform:capitalize;
	line-height: 1.4;
`;

Heading.defaultProps = {
	as: "h1",
};

export default Heading;
