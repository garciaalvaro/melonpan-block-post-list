import React, { FunctionComponent } from "react";
import { useState } from "@wordpress/element";
import { v4 as uuid } from "uuid";

import { Context } from "./Context";

interface Props {
	items: ItemRaw[];
	setAttributes: EditProps["setAttributes"];
}

export const ContextProvider: FunctionComponent<Props> = props => {
	// Parallel array which holds the same values of attributes.posts_list
	// but with an id assigned to each item.
	const [posts_list, setPostsList] = useState<ContextProps["posts_list"]>(
		props.items.map(item => ({
			...item,
			id: uuid(),
		}))
	);

	const updatePostsList = (list: ContextProps["posts_list"]) => {
		setPostsList(list);

		props.setAttributes({
			posts_list: list.map(({ post_id, post_type }) => ({
				post_id,
				post_type,
			})),
		});
	};

	return (
		<Context.Provider
			value={{
				posts_list,
				updatePostsList,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
