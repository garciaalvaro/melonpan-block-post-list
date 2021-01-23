=== Melonpan Block - Post List ===
Contributors: melonpan
Tags: post, posts, cpt, block, block-editor, gutenberg
Requires at least: 5.6
Tested up to: 5.6
Stable tag: 2.0.0
Requires PHP: 7.1
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Block that displays a list of selected Posts and Custom post types.


== Description ==

[Documentation](https://melonpan.io/gutenberg-blocks/melonpan-block-post-list) - [GitHub](https://github.com/garciaalvaro/melonpan-block-post-list)

Block that displays a list of selected Posts and Custom post types. No stylesheets or scripts are added in the front-end.


== Usage ==

The block can be found inside the blocks inserter menu under the *Melonpan Blocks* category.
Once added in the post you can edit its settings on the Editor sidebar under the Block settings panel.
The block renders dynamically. This means it doesn't save any content in the Post content, it renders the content when the post loads.

== Installation ==

Installation from the WordPress admin.

1. Log in to the WordPress admin and navigate to *Plugins > Add New*.
2. Type *Melonpan Block - Post List* in the Search field.
3. In the results list *Melonpan Block - Post List* plugin should appear, click **Install Now** button.
4. Once it finished installing, click the *Activate* button.
5. That's it, now you can go to any post where Gutenberg is enabled and start using the block.


== Screenshots ==

1. Block in the editor


== Changelog ==

= 2.0.0 =
* Refactored code base
* Updated dependencies

= 1.1.0 =
* Added mbpl_content_to_render filter to modify the rendered output
* Minor bug fixes

= 1.0.0 =
* Initial release
