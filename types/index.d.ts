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

interface ContextProps {
	posts_list: Item[];
	updatePostsList: (items: Item[]) => void;
}

interface EditProps {
	className: string;
	attributes: Attributes;
	setAttributes: (attributes: Attributes) => void;
}

// CSS modules
declare module "*.styl" {
	const styles: { [className: string]: string };
	export default styles;
}
