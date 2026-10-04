<?php
/**
 * Last-resort template, required by WordPress. Every real view has its own template; this only
 * catches something unforeseen, and shows it as a plain article list rather than a blank page.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_template_part( 'archive' );
