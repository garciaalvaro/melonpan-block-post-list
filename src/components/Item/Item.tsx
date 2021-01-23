import React, { FunctionComponent } from "react";

import styles from "./Item.styl";
import { SelectPostId } from "../SelectPostId";
import { SelectPostType } from "../SelectPostType";
import { ButtonRemove } from "../ButtonRemove";
import { ButtonMove } from "../ButtonMove";

interface Props extends Item {
	index: number;
}

export const Item: FunctionComponent<Props> = props => {
	const { id, post_id, post_type, index } = props;

	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<ButtonMove index={index} />
				<ButtonRemove id={id} />
			</div>

			<SelectPostType id={id} post_id={post_id} post_type={post_type} />

			{post_type && (
				<SelectPostId id={id} post_id={post_id} post_type={post_type} />
			)}
		</div>
	);
};
