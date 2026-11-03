$(function () {
	const $contactForm = $(".contact-form");
	const $contactStatus = $(".contact-form-status");
	const $submitButton = $contactForm.find(".contact-form-submit");
	const $message = $contactForm.find("#contact-message");

	$contactForm.find(".contact-message-suggestion").on("click", function () {
		if (!$message.val()) {
			$message.val($message.attr("placeholder"));
		}

		$message.trigger("focus");
	});

	$contactForm.on("submit", async function (event) {
		event.preventDefault();
		$submitButton.prop("disabled", true);
		$contactStatus
			.prop("hidden", false)
			.attr("data-state", "sending")
			.text("Sending your message...");

		try {
			await $.ajax({
				url: this.action,
				method: this.method,
				data: new FormData(this),
				processData: false,
				contentType: false,
				dataType: "json",
				headers: { Accept: "application/json" }
			});

			this.reset();
			$contactStatus
				.attr("data-state", "success")
				.text("Thanks! Your message has been sent.");
		} catch (error) {
			const message = error.status
				? `The form service returned error ${error.status}. Please try again.`
				: "Unable to reach the form service. Please check your connection and try again.";

			$contactStatus
				.attr("data-state", "error")
				.text(`Your message couldn't be sent: ${message}`);
		} finally {
			$submitButton.prop("disabled", false);
		}
	});
});
