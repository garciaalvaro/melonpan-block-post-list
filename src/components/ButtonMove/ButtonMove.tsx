import React, { FunctionComponent } from "react";
import { Fragment, useContext } from "@wordpress/element";
import arrayMove from "array-move";

import { Button } from "@/utils";
import { Context } from "@/context";

interface Props {
	index: number;
}

export const ButtonMove: FunctionComponent<Props> = props => {
	const { index } = props;
	const { posts_list, updatePostsList } = useContext(Context);

	const moveUp = () =>
		updatePostsList(arrayMove(posts_list, index, index - 1));

	const moveDown = () =>
		updatePostsList(arrayMove(posts_list, index, index + 1));

	return (
		<Fragment>
			<Button disabled={index === 0} onClick={moveUp} icon="arrow_up" />

			<Button
				disabled={index === posts_list.length - 1}
				onClick={moveDown}
				icon="arrow_down"
			/>
		</Fragment>
	);
};
