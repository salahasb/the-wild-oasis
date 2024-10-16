import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button.styled";
import { MiniSpinner } from "./LoadingSpinners";

const StyledConfirmDelete = styled.div`
	width: 100%;
	max-width: 40rem;
	display: flex;
	flex-direction: column;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 2.4rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 2rem;
	}
`;

function ConfirmDelete({
	resource,
	onCloseModal,
	onDelete: handleDelete,
	isDeleting,
}) {
	return (
		<StyledConfirmDelete>
			<Heading as="h4">Delete {resource}</Heading>
			<p>
				Are you sure you want to delete this {resource} permanently? This action
				cannot be undone.
			</p>
			<div>
				<Button $variation="secondary" onClick={onCloseModal}>
					Cancel
				</Button>
				<Button
					$variation="danger"
					disabled={isDeleting}
					onClick={() => handleDelete(onCloseModal)}
				>
					{isDeleting ? <MiniSpinner /> : "Delete"}
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;
