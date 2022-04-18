// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import {
  Box,
  Grid,
  styled,
  Typography, BoxProps, darken, Container, TextField, Button, Link, Divider,
} from '@mui/material';

// PROJECT IMPORTS
import LogoWhite from '@assets/img/watchit_logo_white.svg';

// ===========================|| FOOTER ||=========================== //

const Footer: FC = (): JSX.Element => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container spacing={1} justifyContent='center' alignItems='center'>
          <Grid
            item xs={12} md={5} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            display='flex' justifyContent='center' alignItems='center' flexWrap='nowrap'
          >
            <FooterLogoWrapper sx={{ mb: { xs: 3, md: 0 } }}>
              <LogoWhite />
            </FooterLogoWrapper>
            <Grid container flexDirection='column' sx={{ mb: { xs: 3, md: 0 } }}>
              <Grid item>
                <Typography gutterBottom variant='h3' color='primary.light' sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
                  Get the latest watchit updates
                </Typography>
              </Grid>
              <Grid item>
                <FooterSubscriptionWrapper>
                  <TextField fullWidth label='Your e-mail' id='subscription_email' />
                  <Button variant='contained'>Subscribe</Button>
                </FooterSubscriptionWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
          <Grid item xs={12} md={5}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Grid container spacing={0.3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant='h3' color='primary.light'>
                      Company
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      About
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Mission and team
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Blog
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant='h3' color='primary.light'>
                      Comunity
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Suggest a feature
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Development
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom color='primary.light' variant='h3'>
                      Help
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      FAQ
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Support
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Privacy Policy
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href='https://www.google.com/' color='primary.light' variant='body2'>
                      Terms of service
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mt: 3, mb: 2, opacity: 0.4 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body1' color='primary.light' textAlign='center'
              fontWeight={400} width={1} sx={{ opacity: 0.6, marginBottom: 2 }}
            >
              © 2021 ZorrillosDev Comunity
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

export const FooterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(5),
  marginBottom: '-3rem',
  backgroundColor: Object.is(theme.palette.mode, 'light')
    ? darken(theme.palette.primary.dark, 0.6)
    : darken(theme.palette.background.default, 0.2),
  a: {
    opacity: 0.6,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const FooterLogoWrapper = styled(Box)<BoxProps>(() => ({
  width: '10rem',
  height: '5rem',
  position: 'relative',
  marginRight: '2rem',
  flexShrink: 0,
  svg: {
    position: 'absolute',
    top: '-2.5rem',
    left: 0,
    width: '100%',
    height: 'auto',
  },
}));

export const FooterSubscriptionWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  '.MuiOutlinedInput-root, fieldset, input': {
    borderRadius: '24px',
    backgroundColor: Object.is(theme.palette.mode, 'light')
      ? darken(theme.palette.primary.dark, 0.6)
      : darken(theme.palette.background.default, 0.2),
    borderColor: theme.palette.primary.light,
  },
  button: {
    position: 'absolute',
    top: '1px',
    right: '1px',
    height: 'calc(100% - 2px)',
    borderRadius: '4rem !important',
    boxShadow: 'none',
    backgroundColor: Object.is(theme.palette.mode, 'light')
      ? darken(theme.palette.primary.dark, 0.5)
      : darken(theme.palette.background.default, 0.3),
  },
}));
