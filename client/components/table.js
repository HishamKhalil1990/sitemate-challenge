import { DataGrid,GridToolbar } from '@mui/x-data-grid';

export default function IssueTable({rows,columns}){

    return(
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                disableRowSelectionOnClick
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 25, 50, 100]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </div>
    )
}