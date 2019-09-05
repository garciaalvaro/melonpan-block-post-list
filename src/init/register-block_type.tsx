import { registerBlockType } from "@wordpress/blocks";

import { Icon } from "utils/Components";
import {
	block_name,
	block_title,
	block_description,
	block_category
} from "utils/data";
import { Items } from "Components/Items/Items";

interface AttributesDefinition extends Record<keyof Attributes, any> {}

registerBlockType<AttributesDefinition>(block_name, {
	title: block_title,
	icon: () => <Icon icon="logo" />,
	category: block_category,
	description: block_description,
	supports: { align: true },
	edit: (props: EditProps) => <Items {...props} />,
	save: () => null,
	attributes: {
		posts_list: {
			type: "array",
			default: []
		}
	}
});
