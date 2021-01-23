import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useContext } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import ReactSelect, { ValueType } from "react-select";

import { Context } from "@/context";
import { plugin_prefix } from "@/utils";

interface PostType {
	slug: string;
	name: string;
	viewable: boolean;
}

interface ReactSelectItem {
	value: string;
	label: string;
}

export const SelectPostType: FunctionComponent<Item> = props => {
	const { id, post_type } = props;

	const { posts_list, updatePostsList } = useContext(Context);

	const [options, setOptions] = useState<ReactSelectItem[]>([]);

	const [selected, setSelected] = useState<ReactSelectItem | null>(null);

	const post_types = useSelect<PostType[] | null>(select =>
		select("core").getPostTypes()
	);

	const onChange = (selected: ValueType<ReactSelectItem, false>) => {
		if (!selected) return;

		setSelected(selected);

		const posts_list_updated = posts_list.map(item => {
			if (item.id !== id) return item;

			return {
				...item,
				post_type: selected.value,
				post_id: 0,
			};
		});

		updatePostsList(posts_list_updated);
	};

	useEffect(() => {
		if (!post_types) return;

		const options = post_types
			.filter(({ slug, viewable }) => viewable && slug !== "attachment")
			.map(({ slug, name }) => ({ value: slug, label: name }));

		setOptions(options);
	}, [post_types]);

	useEffect(() => {
		if (!options.length) return;

		const selected = options.find(({ value }) => value === post_type);

		if (selected) {
			setSelected(selected);
		} else if (post_type) {
			setSelected({
				value: post_type,
				label: __(`Post type ${post_type} not found...`),
			});
		}
	}, [options]);

	return (
		<ReactSelect
			classNamePrefix={plugin_prefix}
			options={options}
			placeholder={__("Select a Post type")}
			value={selected}
			onChange={onChange}
		/>
	);
};
