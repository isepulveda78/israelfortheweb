<?php

    if (!isset($attributes['imgURL'])) {
    $attributes['imgURL'] = get_theme_file_uri('/assets/img/services/landing-portfolio.png');
    }

?>

<section class="bg-white py-10">
                        <div class="container px-5">
                            <div class="row gx-5 align-items-center justify-content-center">
                                <div class="col-md-9 col-lg-6 order-1 order-lg-0" data-aos="fade-right">
                                    <div class="content-skewed content-skewed-right"><img class="content-skewed-item img-fluid shadow-lg rounded-3" src="<?php echo $attributes['imgURL']; ?>" alt="Services" /></div>
                                </div>
                                <div class="col-lg-6 order-0 order-lg-1 mb-5 mb-lg-0" data-aos="fade-left">
                                    <div class="mb-5">
                                        <?php echo $content ?>
                                    </div>
                                    <div class="row gx-5">
                                    <?php 
                                        $services = new WP_Query(array(
                                            'posts_per_page' => 6,
                                            'post_type' => 'service',
                                        ));

                                        while($services->have_posts()){
                                            $services->the_post();
                                        
                                        ?>
                                        <div class="col-md-6 mb-4">
                                            <h6><?php the_title() ?></h6>
                                            <p class="mb-2 small"><?php echo wp_trim_words(get_the_content(), 24); ?></p>
                                            <a class="small text-arrow-icon" href="<?php the_permalink(); ?>">
                                                Learn More
                                                <i data-feather="arrow-right"></i>
                                            </a>
                                        </div>
                                        <?php  
                                    }  
                                    wp_reset_postdata();
                                    ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>