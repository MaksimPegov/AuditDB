import Grid from '@mui/material/Unstable_Grid2'
import { cn } from '@bem-react/classname'

import './AppFooter.scss'
import { Container, Link } from '@mui/material'
import { Instagram, Twitter, YouTube } from '@mui/icons-material'

const componentId = 'AppFooter'
const bem = cn(componentId)

export const AppFooter = () => {
  return (
    <div className={bem()}>
      <div className="wrapper">
        <Grid container spacing={1}>
          <Grid xs={12} className={bem('FirstLine')}>
            <div className={bem('Logo')}>
              <span className={bem('Title', { left: true })}>Audit</span>
              <span className={bem('Title', { right: true })}>DB</span>
            </div>

            <div className={bem('Icons')}>
              <Twitter className={bem('Icon')} />
              <YouTube className={bem('Icon')} />
              <Instagram className={bem('Icon')} />
            </div>
          </Grid>

          <Grid xs={6} className={bem('SecondLine')}>
            <Grid container>
              <Grid xs={12}>
                <Link href="#" underline="hover" className={bem('Link')}>
                  Product
                </Link>
              </Grid>

              <Grid xs={12}>
                <Link href="#" underline="hover" className={bem('Link')}>
                  About us
                </Link>
              </Grid>

              <Grid xs={12}>
                <Link href="#" underline="hover" className={bem('Link')}>
                  Community
                </Link>
              </Grid>
            </Grid>

            <Grid xs={24} className={bem('Rights')}>
              2022 All rights reserved.
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
