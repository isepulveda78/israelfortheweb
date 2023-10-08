<?php

    if (!isset($attributes['logoURL'])) {
    $attributes['logoURL'] = get_theme_file_uri('/assets/img/logo/isepulveda.png');
    }

?>


<nav class="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
                        <div class="container px-5">
                            <a class="navbar-brand text-dark logo" href="/">
                               <div class="d-inline-flex">
                                    <img src="<?php echo $attributes['logoURL'] ?>" class="mr-3 img-fluid" style="width: 5rem; height: 5rem;"/>&nbsp;
                                    <div class="align-self-center logo">
                                    <?php echo $content ?>
                                    </div>
                                </div>
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu"></i></button>             
                                <?php 
                                        wp_nav_menu( array(
                                            'theme_location'  => 'primary',
                                            'depth'           => 2, // 1 = no dropdowns, 2 = with dropdowns.
                                            'container'       => 'div',
                                            'container_class' => 'collapse navbar-collapse',
                                            'container_id'    => 'navbarSupportedContent',
                                            'menu_class'      => 'navbar-nav ms-auto me-lg-5',
                                            'fallback_cb'     => 'WP_Bootstrap_Navwalker::fallback',
                                            'walker'          => new WP_Bootstrap_Navwalker(),
                                        ) );
                                    ?>
                            </div>
                        </div>
                    </nav>