<?php

function theme_post_types() {
  // Campus Post Type
  register_post_type('service', array(
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'excerpt'),
    'rewrite' => array('slug' => 'Services'),
    'public' => true,
    'labels' => array(
      'name' => 'Services',
      'add_new_item' => 'Add New Service',
      'edit_item' => 'Edit Service',
      'all_items' => 'All Services',
      'singular_name' => 'Service'
    ),
    'menu_icon' => 'dashicons-businessman'
  ));
}

add_action('init', 'theme_post_types');