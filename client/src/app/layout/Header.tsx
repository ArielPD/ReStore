import {AppBar, Toolbar, Typography, Switch} from "@mui/material"

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


const Header = ({darkMode, handleThemeChange}: Props) => {

    return (
       <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    Re-Store
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}></Switch>
            </Toolbar>
       </AppBar>
    );
}

export default Header;