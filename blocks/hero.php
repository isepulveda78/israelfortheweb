<?php

    if (!isset($attributes['imgURL'])) {
    $attributes['imgURL'] = get_theme_file_uri('/assets/img/demo/avataaars.svg');
    }

?>

<header class="page-header-ui page-header-ui-light bg-white">
                        <div class="page-header-ui-content">
                            <div class="container px-5">
                                <div class="row gx-5 justify-content-center">
                                    <div class="col-xl-8 col-lg-10 text-center">
                                        <img class="mb-4" src="<?php echo $attributes['imgURL'] ?>" style="width: 15rem" />
                                        <?php echo $content; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
            <div class="svg-border-rounded text-light">
                    <!-- Rounded SVG Border-->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
            </div>
</header>