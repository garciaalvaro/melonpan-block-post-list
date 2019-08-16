import Popover, { ArrowContainer } from "react-tiny-popover";
import produce from "immer";

import { Icon, Button } from "utils/Components";
import { useToggle } from "utils/hooks";

const { remove } = lodash;
const { __ } = wp.i18n;
const { useCallback } = wp.element;

export const ItemButtonRemove: React.ComponentType<ItemProps> = props => {
	const { id, posts_list, updateList } = props;
	const { is_open, toggle, close } = useToggle(false);
	const onClick = useCallback(() => {
		close();

		const posts_list_updated = produce(posts_list, draft => {
			remove(draft, item => item.id === id);
		});

		updateList(posts_list_updated);
	}, []);

	return (
		<Popover
			containerStyle={{
				minWidth: "50px",
				zIndex: "999999"
			}}
			isOpen={is_open}
			onClickOutside={close}
			transitionDuration={0.01}
			content={({ position, targetRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={"#111"}
					arrowSize={6}
				>
					<Button className="button-remove" onClick={onClick}>
						{__("Remove")}
					</Button>
				</ArrowContainer>
			)}
		>
			<Button className={["button", "button-icon"]} onClick={toggle}>
				<Icon icon="delete" />
			</Button>
		</Popover>
	);
};
