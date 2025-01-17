/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"fade-in": "fadeIn 1s ease-in forwards",
				"fade-in-delay": "fadeIn 1s ease-in 0.5s forwards",
				"fade-in-delay-2": "fadeIn 1s ease-in 1s forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};
