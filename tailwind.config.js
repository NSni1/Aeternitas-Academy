/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 1s ease-out forwards",
        "title-change": "title-change 500ms ease-out forwards",
        "title-back": "title-back 500ms ease-out forwards",
        "bg-in": "bg-in 500ms ease-out forwards",
        "desc-change": "desc-change 500ms ease-out forwards",
        "desc-back": "desc-back 500ms ease-out forwards"
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(100%)"
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)"
          }
        },
        "title-back": {
          "0%": {
            opacity: 0,
            fontSize: "8rem",
            top: "-10%"
          },
          "100%": {
            opacity: 1,
            fontSize: "8rem",
            top: "0%"
          }
        },
        "title-change": {
          "0%": {
            opacity: 0,
            fontSize: "6rem",
            top: "0%"
          },
          "100%": {
            opacity: 1,
            fontSize: "6rem",
            top: "-10%"
          }
        },
        "bg-in": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        "desc-change": {
          "0%": {
            opacity: 0,
            fontSize: "3rem",
            left: "90%",
            top: "0%"
          },
          "100%": {
            opacity: 1,
            fontSize: "3rem",
            left: "90%",
            top: "-10%"
          }
        },
        "desc-back": {
          "0%": {
            opacity: 0,
            fontSize: "4.5rem",
            left: "30%",
            top: "-10%"
          },
          "100%": {
            opacity: 1,
            fontSize: "4.5rem",
            left: "30%",
            top: "0%"
          }
        }
      }
    },
  },
  plugins: [],
}
