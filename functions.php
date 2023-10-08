<?php

require get_theme_file_path("/inc/post-types.php");

function theme_files(){
    wp_enqueue_script('bootstrap', '//cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js', NULL, '1.0', true);
    wp_enqueue_script('font-awesome', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js', NULL, '1.0', true);
    wp_enqueue_script('feather', '//cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js', NULL, '1.0', true);
    wp_enqueue_script('aos', '//unpkg.com/aos@next/dist/aos.js', NULL, '1.0', true);
    wp_enqueue_script('theme-scripts', get_theme_file_uri('/js/script.js'), NULL, '1.0', true);
    wp_enqueue_style('custom-styles', get_theme_file_uri('/css/custom.css'));
    wp_enqueue_style('theme-styles', get_theme_file_uri('/css/styles.css'));


    wp_localize_script('theme', 'theme_data', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
      ));
}

add_action('wp_enqueue_scripts', 'theme_files');

function theme_features(){
    add_theme_support('title-tag');
    add_theme_support('editor-styles');
    add_editor_style(array('css/styles.css', 'css/custom.css'));
}

add_action('after_setup_theme', 'theme_features');

function register_navwalker(){
    if ( ! file_exists( get_template_directory() . '/inc/class-wp-bootstrap-navwalker.php' ) ) {
        // File does not exist... return an error.
        return new WP_Error( 'class-wp-bootstrap-navwalker-missing', __( 'It appears the class-wp-bootstrap-navwalker.php file may be missing.', 'wp-bootstrap-navwalker' ) );
    } else {
        // File exists... require it.
        require_once get_template_directory() . '/inc/class-wp-bootstrap-navwalker.php';
    }

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'theme' ),
    ) );
}

add_action( 'after_setup_theme', 'register_navwalker' );

add_filter( 'nav_menu_link_attributes', 'bootstrap5_dropdown_fix' );

function bootstrap5_dropdown_fix( $atts ) {
     if ( array_key_exists( 'data-toggle', $atts ) ) {
         unset( $atts['data-toggle'] );
         $atts['data-bs-toggle'] = 'dropdown';
     }
     return $atts;
}

class Block {
    function __construct($name){
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function callBack($attributes, $content){
        ob_start();
        require get_theme_file_path("/blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit(){
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        register_block_type("blocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'callBack']
        ));
    }
}
new Block("services");

class JSXBlock {
  function __construct($name, $renderCallback = null, $data = null) {
    $this->name = $name;
    $this->data = $data;
    $this->renderCallback = $renderCallback;
    add_action('init', [$this, 'onInit']);
  }

  function ourRenderCallback($attributes, $content) {
    ob_start();
    require get_theme_file_path("/blocks/{$this->name}.php");
    return ob_get_clean();
  }

  function onInit() {
    wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));
    
    if ($this->data) {
      wp_localize_script($this->name, $this->name, $this->data);
    }

    $ourArgs = array(
      'editor_script' => $this->name
    );

    if ($this->renderCallback) {
      $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
    }

    register_block_type("blocktheme/{$this->name}", $ourArgs);
  }
}

  new JSXBlock('genericheading');
  new JSXBlock('genericbutton');
  new JSXBlock('serviceheading');
  new JSXBlock('hero', true, ['fallbackimage' => get_theme_file_uri('/assets/img/demo/avataaars.svg')]);
  new JSXBlock("navbar", true, ['fallbacklogo' => get_theme_file_uri('/assets/img/logo/isepulveda.png')]);
  new JSXBlock('logoname');
  new JSXBlock('navlink');
  new JSXBlock('secondhero', true, ['fallbackheroimage' => get_theme_file_uri('/assets/img/hero/hero.png')]);
  new JSXBlock('thirdhero', true,);
  new JSXBlock("secondservice", true, ["fallbackserviceimage" => get_theme_file_uri('/assets/img/services/landing-portfolio.png')]);
  new JSXBlock('socialbuttonlink');
  new JSXBlock('footer', true);

  // Return formatted top-nav menu
function top_nav_menu() {
  $menu = wp_get_nav_menu_items('navbar');
  return $menu;
  exit();
}
// add endpoint
add_action( 'rest_api_init', function() {
  // top-nav menu
  register_rest_route( 'wp/v2', 'navbar', array(
      'methods' => 'GET',
      'callback' => 'top_nav_menu',
  ) );
});