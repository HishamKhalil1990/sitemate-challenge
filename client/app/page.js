'use client'
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import { Stack, Button, Grid2, TextField, Box, Snackbar } from '@mui/material';
import tableColoumns from '@/components/tableColoumns';
import IssueTable from '@/components/table';
import * as apis from '@/apis/apis'

export default function Home() {

  // const router = useRouter()

  const [data, setData] = useState([])
  const [issueTitle, setIssueTitle] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [msg, setMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [snackBarState, setsnackBarState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  useEffect(() => {
    fetchIssue()
  },[])

  const fetchIssue = async() =>{
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

  const deleteIssue = async(id) => {
    try{
      const result = await apis.deleteIssue(id)
      if(result.status == 'failed'){
        setMsg(result.errors)
        setOpen(true)
      }else{
        const newData = data.filter(issue => issue._id != id)
        setData(newData)
      }
    }catch(err){}
  }

  const submit = async() =>{
    try{
      const newIssue = {
        title:issueTitle,
        description:issueDescription
      }
      const newData = await apis.createIssue(newIssue)
      if(newData.status == 'failed'){
        setMsg(newData.errors)
        setOpen(true)
      }else{
        const newAllData = [...data]
        newAllData.push(newData.result)
        setData(newAllData)
      }
    }catch(err){}
  }

  const mapColoumns = (columns) => {
    return columns.map(col => {
      if(col.field == 'update'){
        return {
          field: col.field, 
          headerName: col.headerName, 
          flex: col.flex,
          renderCell: (params) => (
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <Button 
                color='warning'
                variant='contained'
                style={{borderRadius:200,padding: 0}}
                onClick={() => {
                  // router.push(`http://localhost:3001/issues/${params.row.id}`)
                }}
              >
                update
              </Button>
            </div>
          )
        }
      }else if(col.field == 'delete'){
        return {
          field: col.field, 
          headerName: col.headerName, 
          flex: col.flex,
          renderCell: (params) => (
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <Button 
                color='error'
                variant='contained'
                style={{borderRadius:200,padding: 0}}
                onClick={() => {
                   deleteIssue(params.row.id)
                }}
              >
                delete
              </Button>
            </div>
          )
        }
      }
      return col
    })
  }

  const handleClose = () => setOpen(false)

  return (
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
                  submit()
               }}
              >
                Add
              </Button>
            </Stack>
          </Box>
          <Box sx={{p:5}}>
            <IssueTable rows={data.map(issue => {
              return {
                id:issue._id,
                title:issue.title,
                description:issue.description
              }
            })} columns={mapColoumns(tableColoumns)}/>
          </Box>
        </Stack>
      </Grid2>
    </Box>
  );
}
