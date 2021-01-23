<?php
/**
 * Plugin Name: Melonpan Block - Post List
 * Plugin URI: https://wordpress.org/plugins/melonpan-block-post-list/
 * Description: Block that displays a list of selected Posts and Custom post types
 * Author: melonpan
 * Version: 1.1.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace MELONPANBLOCKPOSTLIST;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

define(__NAMESPACE__ . "\PLUGIN_NAME", "melonpan-block-post-list");
define(__NAMESPACE__ . "\PLUGIN_VERSION", "1.1.0");
define(__NAMESPACE__ . "\DIST_DIR", plugins_url("dist/", __FILE__));
define(__NAMESPACE__ . "\INC_DIR", plugin_dir_path(__FILE__) . "inc/");

require_once INC_DIR . "register-enqueue.php";
require_once INC_DIR . "register-block_render.php";
