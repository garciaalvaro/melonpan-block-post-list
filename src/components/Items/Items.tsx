import React, { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";

import styles from "./Items.styl";
import { Context } from "@/context";
import { className } from "@/utils";
import { Item } from "../Item";
import { ButtonAdd } from "../ButtonAdd";

export const Items: FunctionComponent<EditProps> = props => {
	const { posts_list } = useContext(Context);

	return (
		<div
			{...props}
			className={className([styles.container, props.className])}
		>
			<div>
				{posts_list.map((item, index) => (
					<Item {...item} key={item.id} index={index} />
				))}
			</div>

			<ButtonAdd />
		</div>
	);
};
