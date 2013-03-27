$(function() {
	$("a.imgSubmit").click(function() {
		$(this).parents("form").submit();
	})
});
