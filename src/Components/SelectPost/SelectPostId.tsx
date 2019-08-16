import ReactSelect from "react-select";
import { ValueType } from "react-select/src/types";
import produce from "immer";

import { plugin_prefix } from "utils/data";
import { addPrefix } from "utils/tools";

interface Post {
	id: number;
	title: { raw: string };
}

interface WithSelectProps {
	posts: Post[] | null;
}

interface ReactSelectItem {
	value: number;
	label: string;
}

const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { useEffect, useState, useCallback } = wp.element;

export const SelectPostId: React.ComponentType<ItemProps> = withSelect<
	WithSelectProps,
	ItemProps
>((select, { post_type }) => ({
	posts: select("core").getEntityRecords("postType", post_type, {
		per_page: 99 // TODO: pagination
	})
}))(props => {
	const { id, post_id, posts, posts_list, updateList } = props;
	const [post_options, setPostOptions] = useState<ReactSelectItem[]>([]);
	const [post_option, setPostOption] = useState<ReactSelectItem | undefined>(
		undefined
	);
	const onSelect = useCallback(
		(selected: ValueType<ReactSelectItem>) => {
			if (!selected) {
				return;
			}

			selected = selected as ReactSelectItem;

			setPostOption(selected);

			const posts_list_updated = produce(posts_list, draft => {
				const item = draft.find(item => item.id === id);

				if (item) {
					// @ts-ignore
					item.post_id = selected.value;
				}
			});

			updateList(posts_list_updated);
		},
		[posts_list]
	);

	useEffect(() => {
		if (!post_options.length) {
			return;
		}

		const post_option_new = post_options.find(({ value }) => value === post_id);

		if (post_option_new) {
			setPostOption(post_option_new);
		} else if (post_id) {
			setPostOption({
				value: post_id,
				label: __(`Post ${post_id} not found...`)
			});
		}
	}, [post_options]);

	useEffect(() => {
		if (!posts) {
			return;
		}

		setPostOptions(
			posts.map(({ id, title }) => ({ value: id, label: title.raw }))
		);
	}, [posts]);

	return (
		<ReactSelect
			className={addPrefix("control-react_select")}
			classNamePrefix={plugin_prefix}
			options={post_options}
			placeholder={__("Select a Post")}
			value={post_option}
			onChange={onSelect}
		/>
	);
});
