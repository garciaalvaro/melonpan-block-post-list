import arrayMove from "array-move";

import { Button, Icon } from "utils/Components";

const { Fragment, useCallback } = wp.element;

export const ItemButtonMove: React.ComponentType<ItemProps> = props => {
	const { posts_list, updateList, index } = props;
	const moveUp = useCallback(
		() => updateList(arrayMove(posts_list, index, index - 1)),
		[posts_list, index]
	);
	const moveDown = useCallback(
		() => updateList(arrayMove(posts_list, index, index + 1)),
		[posts_list, index]
	);

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
