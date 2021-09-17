import * as theme from '@styles/theme'

describe('Theme', () => {
  describe('Theme Global Overrides', () => {
    it('should global overrides be defined', () => {
      expect(theme.globalOverrides).toBeDefined()
    })

    it('should have valid `html` overrides', () => {
      const html = theme.globalOverrides.overrides.MuiCssBaseline['@global'].html
      expect(html).toBeDefined()
      expect(html.margin).toBe(0)
      expect(html.padding).toBe(0)
      expect(html.height).toBe('100%')
    })

    it('should have valid `body` overrides', () => {
      const body = theme.globalOverrides.overrides.MuiCssBaseline['@global'].body
      expect(body).toBeDefined()
      expect(body.margin).toBe(0)
      expect(body.padding).toBe(0)
      expect(body.height).toBe('100%')
      expect(body.fontSize).toBe('1rem')
      expect(body.backgroundColor).toBe('#fff')
    })
  })

  describe('Theme Typography', () => {
    it('should typography be defined', () => {
      expect(theme.typography).toBeDefined()
    })

    it('should have valid font family', () => {
      const typo = theme.typography.typography
      expect(typo.fontFamily).toBeDefined()
      expect(typo.fontFamily).toBe('Tamil Sangam MN,Oswald,Arial,sans-serif')
    })

    it('should have valid h3', () => {
      const typo = theme.typography.typography
      expect(typo.h3).toBeDefined()
      expect(typo.h3.fontWeight).toBe(700)
      expect(typo.h3.lineHeight).toBe(1)
      expect(typo.h3['@media (min-width: 1900px)'].fontSize).toBe('3.5rem')
    })

    it('should have valid h5', () => {
      const typo = theme.typography.typography
      expect(typo.h5).toBeDefined()
      expect(typo.h5.fontWeight).toBe(600)
      expect(typo.h5.lineHeight).toBe(1)
      expect(typo.h5['@media (min-width: 1900px)'].fontSize).toBe('2rem')
    })

    it('should have valid h6', () => {
      const typo = theme.typography.typography
      expect(typo.h6).toBeDefined()
      expect(typo.h6.fontWeight).toBe(600)
      expect(typo.h6.lineHeight).toBe(1)
      expect(typo.h6['@media (min-width: 1900px)'].fontSize).toBe('2rem')
    })

    it('should have valid body1', () => {
      const typo = theme.typography.typography
      expect(typo.body1).toBeDefined()
      expect(typo.body1.lineHeight).toBe(1)
      expect(typo.body1['@media (min-width: 1900px)'].fontSize).toBe('1.3rem')
    })

    it('should have valid body2', () => {
      const typo = theme.typography.typography
      expect(typo.body2).toBeDefined()
      expect(typo.body2.lineHeight).toBe(1)
      expect(typo.body2['@media (min-width: 1900px)'].fontSize).toBe('1.2rem')
    })

    it('should have valid button', () => {
      const typo = theme.typography.typography
      expect(typo.button).toBeDefined()
      expect(typo.button.fontSize).toBe('1rem')
      expect(typo.button.fontWeight).toBe(700)
    })
  })

  describe('Theme Default Theme', () => {
    it('should default theme be defined', () => {
      expect(theme.defaultTheme).toBeDefined()
    })

    it('should have valid palette', () => {
      const palette = theme.defaultTheme.palette.primary
      expect(palette).toBeDefined()
      expect(palette.light).toBe('#6FC5E0')
      expect(palette.main).toBe('#2286A5')
      expect(palette.dark).toBe('#164C5D')
      expect(palette.contrastText).toBe('#fff')
    })
  })
})
