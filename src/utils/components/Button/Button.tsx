import React, { FunctionComponent } from "react";

import styles from "./Button.styl";
import { className as classNameUtil } from "@/utils/tools";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

interface Props {
	type?: "text" | "icon";
	icon?: IconName;
	onClick: () => void;
	className?: string | (string | null | undefined)[];
	disabled?: boolean;
}

export const Button: FunctionComponent<Props> = props => {
	const { children, className, disabled, icon, type, onClick } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={classNameUtil([
				styles.button,
				type ? styles[type] : null,
				...(Array.isArray(className) ? className : [className]),
			])}
		>
			{icon && <Icon icon={icon} />}

			{children}
		</button>
	);
};
