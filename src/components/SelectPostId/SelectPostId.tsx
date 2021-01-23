import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useContext } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import ReactSelect, { ValueType } from "react-select";

import styles from "./SelectPostId.styl";
import { Context } from "@/context";
import { plugin_prefix } from "@/utils";

interface Post {
	id: number;
	title: { raw: string };
}

interface ReactSelectItem {
	value: number;
	label: string;
}

export const SelectPostId: FunctionComponent<Item> = props => {
	const { id, post_id, post_type } = props;

	const { posts_list, updatePostsList } = useContext(Context);

	const posts = useSelect<Post[] | null>(select =>
		select("core").getEntityRecords("postType", post_type, {
			per_page: 99, // TODO: pagination
		})
	);

	const [options, setOptions] = useState<ReactSelectItem[]>([]);

	const [selected, setSelected] = useState<ReactSelectItem | null>(null);

	const onChange = (selected: ValueType<ReactSelectItem, false>) => {
		if (!selected) return;

		setSelected(selected);

		const posts_list_updated = posts_list.map(item => {
			if (item.id !== id) return item;

			return { ...item, post_id: selected.value };
		});

		updatePostsList(posts_list_updated);
	};

	useEffect(() => {
		if (!options.length) return;

		const selected = options.find(({ value }) => value === post_id);

		if (selected) {
			setSelected(selected);
		} else if (post_id) {
			setSelected({
				value: post_id,
				label: __(`Post ${post_id} not found...`),
			});
		}
	}, [options]);

	// If post_type changed reset selected post
	useEffect(() => {
		if (post_id) return;

		setSelected(null);
	}, [post_type]);

	useEffect(() => {
		if (!posts) return;

		const options = posts.map(({ id, title }) => ({
			value: id,
			label: title.raw,
		}));

		setOptions(options);
	}, [posts]);

	return (
		<ReactSelect
			className={styles.container}
			classNamePrefix={plugin_prefix}
			options={options}
			placeholder={__("Select a Post")}
			value={selected}
			onChange={onChange}
		/>
	);
};
