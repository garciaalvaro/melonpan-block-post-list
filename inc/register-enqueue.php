<?php

namespace MELONPANBLOCKPOSTLIST;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Enqueue the plugin styles and scripts in the front end.
 *
 * @since 1.0.0
 */
add_action( 'the_typography_after_customizer_enqueue', __NAMESPACE__ . '\enqueue' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );
function enqueue() {

	wp_enqueue_style(
		PLUGIN_NAME,
		BUILD_DIR . PLUGIN_NAME . '.css',
		array(),
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		PLUGIN_NAME,
		BUILD_DIR . PLUGIN_NAME . '.js',
		array(
			'lodash',
			'wp-blocks',
			'wp-data',
			'wp-element',
			'wp-i18n',
		),
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);
}
