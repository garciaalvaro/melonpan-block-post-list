import arrayMove from "array-move";

import { Button, Icon } from "utils/Components";

const { Fragment } = wp.element;

export const ItemButtonMove: React.ComponentType<ItemProps> = props => {
	const { posts_list, updateList, index } = props;
	const moveUp = () => updateList(arrayMove(posts_list, index, index - 1));
	const moveDown = () => updateList(arrayMove(posts_list, index, index + 1));

	return (
		<Fragment>
			<Button
				className={["button", "button-icon", "button-move"]}
				disabled={index === 0}
				onClick={moveUp}
			>
				<Icon icon="arrow_up" />
			</Button>
			<Button
				className={["button", "button-icon", "button-move"]}
				disabled={index === posts_list.length - 1}
				onClick={moveDown}
			>
				<Icon icon="arrow_down" />
			</Button>
		</Fragment>
	);
};
