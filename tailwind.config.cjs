/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,svelte}'],
  prefix: 'gk-',
  theme: {
    extend: {
      colors: {
        gray: {
          1: '#F7F8FC',
          2: '#DFE4EE',
          3: '#ADB2C2',
          4: '#7B819C',
          5: '#242E59'
        },
        blue: {
          1: '#EDF2FC',
          2: '#3867F4',
          3: '#1248E9'
        },
        green: {
          1: '#E3FFF0',
          2: '#3DD97B',
          3: '#16CB79'
        },
        yellow: {
          1: '#FFFAE6',
          2: '#FFC449',
          3: '#FAA937'
        },
        red: {
          1: '#FFEBE6',
          2: '#FF688F',
          3: '#EC134B'
        }
      }
    }
  },
  plugins: []
};
