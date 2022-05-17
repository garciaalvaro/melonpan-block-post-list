import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { ArrowContainer, Popover } from "react-tiny-popover";

import styles from "./ButtonRemove.styl";
import { Button, useToggle } from "@/utils";
import { Context } from "@/context";

interface Props {
	id: Item["id"];
}

export const ButtonRemove: FunctionComponent<Props> = props => {
	const { id } = props;
	const { posts_list, updatePostsList } = useContext(Context);
	const { is_open, toggle, close } = useToggle(false);

	const remove = () => {
		close();

		const posts_list_updated = posts_list.filter(item => item.id !== id);

		updatePostsList(posts_list_updated);
	};

	return (
		<Popover
			containerClassName={styles.popover}
			isOpen={is_open}
			onClickOutside={close}
			containerStyle={{ transition: "none" }}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowSize={6}
					arrowColor={"#111"}
				>
					<Button className={styles.popover_button} onClick={remove}>
						{__("Remove")}
					</Button>
				</ArrowContainer>
			)}
		>
			<div>
				<Button
					icon="delete"
					className={styles.toggle_button}
					onClick={toggle}
				></Button>
			</div>
		</Popover>
	);
};
