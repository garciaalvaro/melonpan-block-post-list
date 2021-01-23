import { createContext } from "@wordpress/element";

export const initial_props: ContextProps = {
	posts_list: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	updatePostsList: () => {},
};

export const Context = createContext<ContextProps>(initial_props);
