import { __ } from "@wordpress/i18n";
import uuid from "uuid/v4";

import { Button } from "@/utils/components";

export const ItemsButtonAdd: React.ComponentType<ItemsProps> = props => {
	const { posts_list, updateList } = props;
	const onClick = () =>
		updateList([
			...posts_list,
			{
				id: uuid(),
				post_id: 0,
				post_type: ""
			}
		]);

	return (
		<Button
			className={["button", "button-text", "button-add"]}
			onClick={onClick}
		>
			{__("Add Post")}
		</Button>
	);
};
