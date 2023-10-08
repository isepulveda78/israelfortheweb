
<section class="bg-white py-10" id="get-started">
                        <div class="container px-5">
                            <div class="row gx-5 text-center">
                            <?php 
                                $services = new WP_Query(array(
                                    'posts_per_page' => 3,
                                    'post_type' => 'service',
                                ));

                                while($services->have_posts()){
                                    $services->the_post();
                                
                                ?>
                                <div class="col-lg-4 mb-5 mb-lg-0">
                                    <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4"><i data-feather="droplet"></i></div>
                                        <a href="<?php the_permalink(); ?>">
                                                <h2><?php the_title(); ?></h2>
                                        </a>
                                    <p class="mb-0"><?php echo wp_trim_words(get_the_content(), 18); ?></p>
                                </div>

                                <?php } 
                                wp_reset_postdata();
                                ?>
                            </div>
                        </div>
                        <div class="svg-border-rounded text-light">
                            <!-- Rounded SVG Border-->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
                        </div>
                    </section>