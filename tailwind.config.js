/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'headerFirst': "#133f9e",
      'headerSecond': '#1b3f85' 
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        probaprolt: "Proba Pro Lt",
        probaprosmbdit: 'Proba Pro SmBdIt',
        probaproexlt: 'Proba Pro ExLt',
        probapro: 'Proba Pro',
        probapromd: 'Proba Pro Md',
        probaproth: 'Proba Pro Th',
        probaproexltit: 'Proba Pro ExLtIt',
        probaprosmbd: 'Proba Pro SmBd',
        probapromdit: 'Proba Pro MdIt',
        probaproit: 'Proba Pro It',
        probaproltit: 'Proba Pro Lt It',
        probaprothit: 'Proba Pro Th It',
        probaprobd: 'Proba Pro Bd',
        robotomono: 'RobotoMono'
      }
    },
  },
  plugins: [],
}
