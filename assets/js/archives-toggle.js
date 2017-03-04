$(document).ready(function() {

	$(".sidebar .inner").hide();
	$(".archives-toggle").attr("aria-expanded", false);
	
	$(".archives-toggle").click(function() {
		$(".sidebar .inner").toggle();

		if ( $(".archives-toggle").attr("aria-expanded") == "true" ) {
			$(".archives-toggle").attr("aria-expanded", false);
		} else {
			$(".archives-toggle").attr("aria-expanded", true);
		}

	})

})