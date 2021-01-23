import React from "react";
import { registerBlockType } from "@wordpress/blocks";

import { ContextProvider } from "@/context";
import {
	Icon,
	block_name,
	block_title,
	block_description,
	block_category,
} from "@/utils";
import { Items } from "@/components/Items";

interface AttributesDefinition {
	posts_list: { type: string; default: Attributes["posts_list"] };
}

registerBlockType<AttributesDefinition>(block_name, {
	title: block_title,
	icon: <Icon icon="logo" />,
	category: block_category,
	description: block_description,
	supports: { align: true },
	// @ts-expect-error The type given is more strict than the definition
	edit: (props: EditProps) => (
		<ContextProvider
			items={props.attributes.posts_list}
			setAttributes={props.setAttributes}
		>
			<Items {...props} />
		</ContextProvider>
	),
	save: () => null,
	attributes: {
		posts_list: {
			type: "array",
			default: [],
		},
	},
});
