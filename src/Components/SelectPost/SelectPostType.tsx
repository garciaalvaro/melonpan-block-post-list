import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import ReactSelect from "react-select";
import { ValueType } from "react-select/src/types";
import produce from "immer";

import { plugin_prefix } from "utils/data";
import { addPrefix } from "utils/tools";

interface PostType {
	slug: string;
	name: string;
	viewable: boolean;
}

interface WithSelectProps {
	post_types: PostType[] | null;
}

interface ReactSelectItem {
	value: string;
	label: string;
}

export const SelectPostType: React.ComponentType<ItemProps> = withSelect<
	WithSelectProps,
	ItemProps
>(select => ({
	post_types: select("core").getPostTypes()
}))(props => {
	const { id, post_type, post_types, posts_list, updateList } = props;
	const [post_type_options, setPostTypeOptions] = useState<ReactSelectItem[]>(
		[]
	);
	const [post_type_option, setPostTypeOption] = useState<
		ValueType<ReactSelectItem>
	>(undefined);
	const onSelect = (selected: ValueType<ReactSelectItem>) => {
		if (!selected) {
			return;
		}

		selected = selected as ReactSelectItem;

		setPostTypeOption(selected);

		const posts_list_updated = produce(posts_list, draft => {
			const item = draft.find(item => item.id === id);

			if (item) {
				// @ts-ignore
				item.post_type = selected.value;
				item.post_id = 0;
			}
		});

		updateList(posts_list_updated);
	};

	useEffect(() => {
		if (!post_type_options.length) {
			return;
		}

		const post_type_option_new = post_type_options.find(
			({ value }) => value === post_type
		);

		if (post_type_option_new) {
			setPostTypeOption(post_type_option_new);
		} else if (post_type) {
			setPostTypeOption({
				value: post_type,
				label: __(`Post type ${post_type} not found...`)
			});
		}
	}, [post_type_options]);

	useEffect(() => {
		if (!post_types) {
			return;
		}

		setPostTypeOptions(
			post_types
				.filter(({ slug, viewable }) => viewable && slug !== "attachment")
				.map(({ slug, name }) => ({ value: slug, label: name }))
		);
	}, [post_types]);

	return (
		<ReactSelect
			className={addPrefix("control-react_select")}
			classNamePrefix={plugin_prefix}
			options={post_type_options}
			placeholder={__("Select a Post type")}
			value={post_type_option}
			onChange={onSelect}
		/>
	);
});
