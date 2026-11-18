<?php
/**
 * Preview theme: /news-and-community/ — the News & Community articles in the article library.
 *
 * Served by the preview's rewrite rule (inc/preview.php), not by a WordPress page.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_template_part( 'preview/library', null, array( 'news' => true ) );
