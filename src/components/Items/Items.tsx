import { useEffect, useState } from "@wordpress/element";
import uuid from "uuid/v4";

import "./Items.styl";
import { Div } from "@/utils/components";
import { Item } from "../Item/Item";
import { ItemsButtonAdd } from "./ItemsButtonAdd";

export const Items: React.ComponentType<EditProps> = props => {
	const { attributes, setAttributes, className } = props;
	const [posts_list, setPostsList] = useState<Item[]>([]);
	const updateList = (posts_list: Item[]) => {
		setPostsList(posts_list);
		setAttributes({
			posts_list: posts_list.map(({ post_type, post_id }) => ({
				post_type,
				post_id
			}))
		});
	};

	// We create a parallel array which holds the same values of attributes.posts_list
	// but with an id assigned to each element. This way we avoid saving the id
	// to the block attributes.
	useEffect(() => {
		setPostsList(
			attributes.posts_list.map(item => ({
				...item,
				id: uuid()
			}))
		);
	}, []);

	return (
		<Div className={["items", `!${className}`]}>
			{posts_list.map((item, index) => (
				<Item
					key={item.id}
					{...item}
					posts_list={posts_list}
					updateList={updateList}
					index={index}
				/>
			))}
			<ItemsButtonAdd
				{...props}
				posts_list={posts_list}
				updateList={updateList}
			/>
		</Div>
	);
};
