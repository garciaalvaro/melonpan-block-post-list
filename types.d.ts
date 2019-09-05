// Console log shortcut
declare const l: Function;

interface Object {
	[key: string]: any;
}

interface ComponentProps extends Object {
	children?: React.ReactNode;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
}

interface ItemRaw {
	post_type: string;
	post_id: number;
}

interface Item extends ItemRaw {
	id: string;
}

interface Attributes {
	posts_list: ItemRaw[];
}

interface EditProps {
	className: string;
	attributes: Attributes;
	setAttributes: Function;
}

interface ItemsProps {
	posts_list: Item[];
	updateList: Function;
}

interface ItemProps extends Item, ItemsProps {
	index: number;
}
