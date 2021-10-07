import * as theme from '@styles/theme'

describe('Theme', () => {
  describe('Theme Typography', () => {
    it('should typography be defined', () => {
      expect(theme.typography).toBeDefined()
    })

    it('should have valid font family', () => {
      const typo = theme.typography.typography
      expect(typo.fontFamily).toBeDefined()
      expect(typo.fontFamily).toBe('\'Roboto\', sans-serif')
    })

    it('should have valid h3', () => {
      const typo = theme.typography.typography
      expect(typo.h3).toBeDefined()
      expect(typo.h3.fontWeight).toBe(600)
    })

    it('should have valid h5', () => {
      const typo = theme.typography.typography
      expect(typo.h5).toBeDefined()
      expect(typo.h5.fontWeight).toBe(500)
    })

    it('should have valid h6', () => {
      const typo = theme.typography.typography
      expect(typo.h6).toBeDefined()
      expect(typo.h6.fontWeight).toBe(500)
    })

    it('should have valid body1', () => {
      const typo = theme.typography.typography
      expect(typo.body1).toBeDefined()
    })

    it('should have valid body2', () => {
      const typo = theme.typography.typography
      expect(typo.body2).toBeDefined()
    })
  })

  describe('Theme Default Theme', () => {
    it('should default theme be defined', () => {
      expect(theme.defaultTheme).toBeDefined()
    })

    it('should have valid palette primary', () => {
      const palette = theme?.defaultTheme?.palette?.primary
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#2286A5')
    })

    it('should have valid palette secondary', () => {
      const palette = theme?.defaultTheme?.palette?.secondary
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#61A454')
    })

    it('should have valid palette warning', () => {
      const palette = theme?.defaultTheme?.palette?.warning
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#C79C36')
    })

    it('should have valid palette success', () => {
      const palette = theme?.defaultTheme?.palette?.success
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#3C763D')
    })

    it('should have valid palette error', () => {
      const palette = theme?.defaultTheme?.palette?.error
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#B53939')
    })

    it('should have valid palette background', () => {
      const palette = theme?.defaultTheme?.palette?.background.default
      expect(palette).toBeDefined()
      expect(palette).toBe('#ffffff')
    })

    it('should have valid palette background paper', () => {
      const palette = theme?.defaultTheme?.palette?.background.paper
      expect(palette).toBeDefined()
      expect(palette).toBe('#ffffff')
    })
  })

  describe('Theme Dark Theme', () => {
    it('should dark theme be defined', () => {
      expect(theme.darkTheme).toBeDefined()
    })

    it('should have dark theme valid palette primary', () => {
      const palette = theme?.darkTheme?.palette?.primary
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#ffffff')
    })

    it('should have dark theme valid palette secondary', () => {
      const palette = theme?.darkTheme?.palette?.secondary
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#61A454')
    })

    it('should have dark theme valid palette warning', () => {
      const palette = theme?.darkTheme?.palette?.warning
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#C79C36')
    })

    it('should have dark theme valid palette success', () => {
      const palette = theme?.darkTheme?.palette?.success
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#3C763D')
    })

    it('should have dark theme valid palette error', () => {
      const palette = theme?.darkTheme?.palette?.error
      expect(palette).toBeDefined()
      expect(palette.main).toBe('#B53939')
    })

    it('should have dark theme valid palette background', () => {
      const palette = theme?.darkTheme?.palette?.background.default
      expect(palette).toBeDefined()
      expect(palette).toBe('#121212')
    })

    it('should have dark theme valid palette background paper', () => {
      const palette = theme?.darkTheme?.palette?.background.paper
      expect(palette).toBeDefined()
      expect(palette).toBe('rgb(30 30 30)')
    })

    it('should have dark theme valid palette text primary', () => {
      const palette = theme?.darkTheme?.palette?.text.primary
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.8)')
    })

    it('should have dark theme valid palette text secondary', () => {
      const palette = theme?.darkTheme?.palette?.text.secondary
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.5)')
    })

    it('should have dark theme valid palette text disabled', () => {
      const palette = theme?.darkTheme?.palette?.text.disabled
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.5)')
    })

    it('should have dark theme valid palette text icon', () => {
      const palette = theme?.darkTheme?.palette?.text.icon
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.5)')
    })

    it('should have dark theme valid palette divider', () => {
      const palette = theme?.darkTheme?.palette?.divider
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.3)')
    })

    it('should have dark theme valid palette action active', () => {
      const palette = theme?.darkTheme?.palette?.action.active
      expect(palette).toBeDefined()
      expect(palette).toBe('#FFF')
    })

    it('should have dark theme valid palette action hover', () => {
      const palette = theme?.darkTheme?.palette?.action.hover
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.08)')
    })

    it('should have dark theme valid palette action hover opacity', () => {
      const palette = theme?.darkTheme?.palette?.action.hoverOpacity
      expect(palette).toBeDefined()
      expect(palette).toBe(0.08)
    })

    it('should have dark theme valid palette action selected', () => {
      const palette = theme?.darkTheme?.palette?.action.selected
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.16)')
    })

    it('should have dark theme valid palette action selected opacity', () => {
      const palette = theme?.darkTheme?.palette?.action.selectedOpacity
      expect(palette).toBeDefined()
      expect(palette).toBe(0.16)
    })

    it('should have dark theme valid palette action disabled', () => {
      const palette = theme?.darkTheme?.palette?.action.disabled
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.3)')
    })

    it('should have dark theme valid palette action disabled background', () => {
      const palette = theme?.darkTheme?.palette?.action.disabledBackground
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.12)')
    })

    it('should have dark theme valid palette action disabled opacity', () => {
      const palette = theme?.darkTheme?.palette?.action.disabledOpacity
      expect(palette).toBeDefined()
      expect(palette).toBe(0.38)
    })

    it('should have dark theme valid palette action focus', () => {
      const palette = theme?.darkTheme?.palette?.action.focus
      expect(palette).toBeDefined()
      expect(palette).toBe('rgba(255,255,255,0.12)')
    })

    it('should have dark theme valid palette action focus opacity', () => {
      const palette = theme?.darkTheme?.palette?.action.focusOpacity
      expect(palette).toBeDefined()
      expect(palette).toBe(0.12)
    })

    it('should have dark theme valid palette action activated opacity', () => {
      const palette = theme?.darkTheme?.palette?.action.activatedOpacity
      expect(palette).toBeDefined()
      expect(palette).toBe(0.24)
    })
  })
})
