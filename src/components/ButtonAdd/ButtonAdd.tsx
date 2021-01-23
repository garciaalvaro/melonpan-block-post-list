import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { v4 as uuid } from "uuid";

import styles from "./ButtonAdd.styl";
import { Context } from "@/context";
import { Button } from "@/utils";

export const ButtonAdd: FunctionComponent = () => {
	const { posts_list, updatePostsList } = useContext(Context);

	const add = () =>
		updatePostsList([
			...posts_list,

			{
				id: uuid(),
				post_id: 0,
				post_type: "",
			},
		]);

	return (
		<Button type="text" className={styles.button} onClick={add}>
			{__("Add Post")}
		</Button>
	);
};
