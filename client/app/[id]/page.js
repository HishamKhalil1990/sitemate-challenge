import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import { Stack, Button, Grid2, TextField, Box, Snackbar } from '@mui/material';
import * as apis from '@/apis/apis'

export default function IssueDetails(){

    const router = useRouter()
    const {id} = router.query

    const [issueTitle, setIssueTitle] = useState('')
    const [issueDescription, setIssueDescription] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [snackBarState, setsnackBarState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });

    useEffect(() => {
        if(id){
            fetchIssue(id)
        }
    },[id])

    const fetchIssue = async(id) =>{
        try{
          const data = await apis.getIssue()
          if(data.status == 'failed'){
            setMsg(data.errors)
            setOpen(true)
          }else{
            setData(data.result);
          }
        }catch(err){}
      }

      const update = async() => {
        try{
          const updated = await apis.updateIssue(id)
          if(updated.status == 'failed'){
            setMsg(updated.errors)
            setOpen(true)
          }else{
            setIssueTitle(updated.result.title)
            setIssueDescription(updated.result.description)
          }
        }catch(err){}
      }

    return(
        <Box >
            <Snackbar
                anchorOrigin={{ vertical:snackBarState.vertical, horizontal:snackBarState.horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
            />
            <Grid2 container siz={12} style={{display:'flex',justifyContent:'center'}}>
            <Stack>
          <Box sx={{p:5}}>
            <Stack spacing={2}>
              <TextField
                label="Issue Title"
                placeholder="Enter the issue title (between 2-30 char)"
                variant="outlined"
                value={issueTitle}
                onChange={e => setIssueTitle(e.target.value)}
              />
              <TextField
                label="Issue Description"
                placeholder="Enter the issue description (between 20-200 char)"
                variant="outlined"
                value={issueDescription}
                onChange={e => setIssueDescription(e.target.value)}
              />
              <Button 
                color='info'
                variant='contained'
                onClick={() => {
                  update()
               }}
              >
                Update
              </Button>
            </Stack>
          </Box>
          </Stack>
          </Grid2>
        </Box>
    )
}