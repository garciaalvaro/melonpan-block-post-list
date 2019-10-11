<?php

namespace MELONPANBLOCKPOSTLIST;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Block render function.
 *
 * @since 1.0.0
 */
add_action( 'init', __NAMESPACE__ . '\register_block' );
function register_block() {

    register_block_type(
		'melonpan-block/post-list',
		array(
			'editor_script'   => PLUGIN_NAME,
			'render_callback' => __NAMESPACE__ . '\render_callback',
		)
	);
}

/**
 * Build the HTML of the block based on the selected posts.
 *
 * @since 1.0.0
 */
function render_callback( $attributes,$b ) {

	$content = '';

	if ( empty( $attributes['posts_list'] ) ) {
		return $content;
	}

	foreach ( $attributes['posts_list'] as $key => $item ) {

		$post_id = $item['post_id'];

		if (
			empty( $post_id ) ||
			// Post is no longer available or isnt published.
			'publish' !== get_post_status( $post_id ) ||
			// Post type is no longer available.
			empty( get_post_type_object( $item['post_type'] ) )
			) {
			continue;
		}

		$content .= '<li>';
		$content .= '<a href="' . esc_url( get_permalink( $post_id ) ) . '">';
		$content .= esc_attr( get_the_title( $post_id ) );
		$content .= '</a>';
		$content .= '</li>';

	}

	$classes   = array();
	$classes[] = 'wp-block-melonpan-block-post-list';

	if ( ! empty( $attributes['className'] ) ) {
		$classes[] = $attributes['className'];
	}

	if ( ! empty( $attributes['align'] ) ) {
		$classes[] = 'align-' . $attributes['align'];
	}

	$content = '<ul class="' . esc_attr( join( ' ', $classes ) ) . '">' . $content . '</ul>';

    return $content;
}
