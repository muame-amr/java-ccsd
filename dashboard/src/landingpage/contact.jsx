import React, { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = ({ data }) => {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await emailjs.sendForm(
				"YOUR_SERVICE_ID",
				"YOUR_TEMPLATE_ID",
				e.target,
				"YOUR_PUBLIC_KEY"
			);
			setStatus({ type: "success", message: "Message sent successfully!" });
			setFormState({ name: "", email: "", message: "" });
		} catch (error) {
			setStatus({
				type: "error",
				message: "Failed to send message. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-20 bg-gray-900">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<div>
							<div className="mb-12">
								<h2 className="text-3xl font-bold text-white mb-4">
									Get In Touch
								</h2>
								<div className="w-24 h-1 bg-indigo-600 rounded-full mb-6" />
								<p className="text-white">
									Fill out the form and we'll get back to you soon.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 gap-6">
									<input
										type="text"
										name="name"
										value={formState.name}
										onChange={(e) =>
											setFormState({ ...formState, name: e.target.value })
										}
										placeholder="Your Name"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
										required
									/>
									<input
										type="email"
										name="email"
										value={formState.email}
										onChange={(e) =>
											setFormState({ ...formState, email: e.target.value })
										}
										placeholder="Your Email"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
										required
									/>
									<textarea
										name="message"
										value={formState.message}
										onChange={(e) =>
											setFormState({ ...formState, message: e.target.value })
										}
										placeholder="Your Message"
										rows="4"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
										required
									/>
								</div>

								{status.message && (
									<div
										className={`p-4 rounded-lg ${
											status.type === "success"
												? "bg-green-50 text-green-800"
												: "bg-red-50 text-red-800"
										}`}
									>
										{status.message}
									</div>
								)}

								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all
                    ${
											isSubmitting
												? "bg-gray-400 cursor-not-allowed"
												: "bg-indigo-600 hover:bg-indigo-700"
										}`}
								>
									{isSubmitting ? "Sending..." : "Send Message"}
								</button>
							</form>
						</div>

						{/* Contact Info */}
						<div className="bg-white rounded-2xl shadow-lg p-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-6">
								Contact Information
							</h3>
							<div className="space-y-6">
								<div className="flex items-start">
									<svg
										className="w-6 h-6 text-indigo-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<div className="ml-4">
										<p className="text-gray-600">
											{data?.address || "Loading address..."}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<svg
										className="w-6 h-6 text-indigo-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/>
									</svg>
									<div className="ml-4">
										<p className="text-gray-600">
											{data?.phone || "Loading phone..."}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<svg
										className="w-6 h-6 text-indigo-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
									<div className="ml-4">
										<p className="text-gray-600">
											{data?.email || "Loading email..."}
										</p>
									</div>
								</div>

								<div className="pt-6 border-t border-gray-200">
									<div className="flex space-x-4">
										{data?.facebook && (
											<a
												href={data.facebook}
												className="text-gray-400 hover:text-indigo-600 transition-colors"
											>
												<span className="sr-only">Facebook</span>
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
												</svg>
											</a>
										)}
										{data?.twitter && (
											<a
												href={data.twitter}
												className="text-gray-400 hover:text-indigo-600 transition-colors"
											>
												<span className="sr-only">Twitter</span>
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
												</svg>
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
