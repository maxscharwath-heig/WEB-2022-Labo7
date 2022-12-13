import {Toolbar, Box} from "@mui/material";

export default function Page({toolbar, children}) {
   return (
      <>
          {toolbar && <Toolbar children={toolbar}/>}
          <Box component="main" sx={{ p: 3, pt:0 }}>
              {children}
          </Box>
      </>
   )
}
