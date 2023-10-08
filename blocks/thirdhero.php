<?php
$backgroundImage = 'bg-gradient-primary-to-secondary';
if (!isset($attributes['imgURL'])) {
  $attributes['imgURL'] = null;
}else{
    $attributes['imgURL'] ='style="background-image: url(' . $attributes['imgURL'] . '); background-repeat: no-repeat; background-size: cover;"';
    $backgroundImage = '';
}

?>

<header class="page-header-ui page-header-ui-dark overlay overlay-primary overlay-70 z-0 <?php echo $backgroundImage; ?>" <?php echo $attributes['imgURL']; ?>>
    <div class="page-header-ui-content">
        <div class="container px-5">
            <div class="row gx-5 justify-content-center">                          
                <div class="col-xl-8 col-lg-10 text-center">
                    <div class="z-1">
                        <?php echo $content ?>
                    </div>
                </div>                          
            </div>
        </div>
    </div>                                  
    <div class="svg-border-angled text-white">
    <!-- Angled SVG Border-->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon points="0,100 100,0 100,100"></polygon></svg>
    </div>
</header>