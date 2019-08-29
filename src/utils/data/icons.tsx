export type Icons = Record<
	"delete" | "logo" | "arrow_up" | "arrow_down",
	JSX.Element
>;

export const icons: Icons = {
	arrow_up: (
		/* https://material.io/tools/icons/?icon=keyboard_arrow_up */
		<svg width="24" height="24" viewBox="0 0 24 24">
			<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	arrow_down: (
		/* https://material.io/tools/icons/?icon=keyboard_arrow_down */
		<svg width="24" height="24" viewBox="0 0 24 24">
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
			<path fill="none" d="M0 0h24v24H0V0z" />
		</svg>
	),
	delete: (
		/* https://material.io/tools/icons/?icon=delete */
		<svg width="18" height="18" viewBox="0 0 24 24">
			<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	logo: (
		<svg width="18" height="18" viewBox="0 0 100 100">
			<rect width="40" height="15" x="5" y="10" />
			<rect width="40" height="15" x="5" y="43" />
			<rect width="12" height="40" x="33" y="10" />
			<rect width="12" height="80" x="5" y="10" />

			<rect width="12" height="80" x="55" y="10" />
			<rect width="40" height="15" x="55" y="75" />
		</svg>
	)
};
