import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const TopBar = ({isLargeScreen , toggleMode , buttonMode , setButtonMode , toggleDrawer }) => {
    const theme = useTheme()
    
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }} noWrap component="div">
            لوحة الإدارة
          </Typography>

          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                toggleMode()
                setButtonMode(buttonMode === 'light' ? 'dark' : 'light')
              }}
              edge="end"
              color='primary'
              sx={{ ml: 2, }}>
              {
                buttonMode === 'light' ?
                  <BrightnessHighIcon />

                  :
                  <BedtimeIcon />

              }

            </IconButton>
            {!isLargeScreen && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  edge="end"
                  sx={{ ml: 2 }}
                >
                  <MenuOutlinedIcon />
                </IconButton>

              </>
            )}


          </div>

        </Toolbar>
      </AppBar>
  )
}

export default TopBar
