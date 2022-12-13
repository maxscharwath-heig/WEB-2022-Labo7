import {Toolbar, Box} from "@mui/material";

export default function Page({toolbar, children}) {
   return (
      <>
          {toolbar && <Toolbar children={toolbar}/>}
          <Box component="main" sx={{ px: 3, overflow: "auto", height: "100%" }}>
              {children}
          </Box>
      </>
   )
}
