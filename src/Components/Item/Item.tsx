import "./Item.styl";
import { Div } from "utils/Components";
import { SelectPostType } from "../SelectPost/SelectPostType";
import { SelectPostId } from "../SelectPost/SelectPostId";
import { ItemButtonRemove } from "./ItemButtonRemove";
import { ItemButtonMove } from "./ItemButtonMove";

export const Item: React.ComponentType<ItemProps> = props => {
	const { post_type } = props;

	return (
		<Div className="item">
			<Div className="item-buttons">
				<ItemButtonMove {...props} />
				<ItemButtonRemove {...props} />
			</Div>
			<SelectPostType {...props} />
			{post_type && <SelectPostId {...props} />}
		</Div>
	);
};
