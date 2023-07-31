import { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import tailwindScrollbarPlugin from 'tailwind-scrollbar'

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        neutral: colors.slate
      }
    }
  },
  plugins: [tailwindScrollbarPlugin]
} satisfies Partial<Config>
