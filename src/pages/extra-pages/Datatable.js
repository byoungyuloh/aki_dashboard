import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    {
        field: 'patno',
        headerName: 'patno',
        width: 200,
        editable: false,
      },
        {
        field: 'name',
        headerName: 'name',
        width: 200,
        editable: false,
      },
      {
        field: 'age',
        headerName: 'age',
        width: 200,
        editable: false,
      },
      {
        field: 'sex',
        headerName: 'sex',
        width: 200,
        editable: false,
      },
      {
        field: 'meddate',
        headerName: 'meddate',
        width: 200,
        editable: false,
      },
    //   {
    //     field: 'sbp',
    //     headerName: 'sbp',
    //     width: 90,
    //     editable: false,
    //   },
    //   {
    //     field: 'dbp',
    //     headerName: 'dbp',
    //     width: 90,
    //     editable: false,
    //   },
    //   {
    //     field: 'RR',
    //     headerName: 'RR',
    //     width: 90,
    //     editable: false,
    //   },
    //   {
    //     field: 'BT',
    //     headerName: 'BT',
    //     width: 90,
    //     editable: false,
    //   },
    //   {
    //     field: 'CRP',
    //     headerName: 'CRP',
    //     width: 90,
    //     editable: false,
    //   },
    //   {
    //     field: 'CL_GCS',
    //     headerName: 'CL_GCS',
    //     width: 90,
    //     editable: false,
    //   },
];

const rows = [
    // {'id':0,'name':"김철수",'patno':16753,'age':35,'sex':'M','meddate':'2010-01-01'},
    // {'id':1,'name':"김영희",'patno':45561,'age':45,'sex':'F','meddate':'2010-02-03'},
    {'id':2,'name':"홍길동",'patno':11775,'age':55,'sex':'M','meddate':'2010-03-05'},
    // {"id":0,"in_time":"2012-01-27 17:23:00","ou_time":"2012-02-24 22:59:53","inno":5,"death_dt":"2012-02-24 22:01:00","total_treat_days":29,"duration_days":29,"treatment_day1":"ANTI_B","treatment_day10":"ANTI_B Albumin ANTI_B","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":"O","30day":null,"60day":null},
    // {"id":1,"in_time":"2012-08-30 16:08:00","ou_time":"2012-11-04 14:04:00","inno":18,"death_dt":"2012-11-04 04:17:00","total_treat_days":66,"duration_days":66,"treatment_day1":"No treatment found on the specified date","treatment_day10":"ANTI_B Albumin ANTI_B Fluid Albumin Fluid ANTI_B VASO ANTI_B Analgesics Fluid Sedative","treatment_day30":"Sedative Analgesics ANTI_B Albumin ANTI_B","treatment_day60":"Fluid ANTI_B Fluid Analgesics ANTI_B","1day":"O","10day":"O","30day":"O","60day":"O"},
    // {"id":2,"in_time":"2017-08-09 16:32:00","ou_time":"2017-08-26 09:42:53","inno":23,"death_dt":"2017-08-26 08:36:00","total_treat_days":18,"duration_days":17,"treatment_day1":"Fluid ANTI_B","treatment_day10":"ANTI_B NM_Blocker ANTI_B Albumin Fluid ANTI_B","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":"O","30day":null,"60day":null},
    // {"id":3,"in_time":"2011-03-23 16:33:00","ou_time":"2011-04-14 09:20:54","inno":62,"death_dt":"2011-04-14 01:20:00","total_treat_days":19,"duration_days":22,"treatment_day1":"No treatment found on the specified date","treatment_day10":"Trans ANTI_B Analgesics Fluid Trans Albumin Analgesics ANTI_B Trans Albumin Trans Analgesics ANTI_B Analgesics","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":"O","30day":null,"60day":null},
    // {"id":4,"in_time":"2010-06-24 15:03:00","ou_time":"2010-07-05 13:36:50","inno":6526,"death_dt":"2010-07-05 10:45:00","total_treat_days":12,"duration_days":11,"treatment_day1":"ANTI_B","treatment_day10":"ANTI_B Steroid ANTI_B Trans ANTI_B VASO","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":"O","30day":null,"60day":null},
    // {"id":5,"in_time":"2010-04-18 16:21:00","ou_time":"2010-05-13 12:30:26","inno":67,"death_dt":"2010-05-13 10:45:00","total_treat_days":24,"duration_days":25,"treatment_day1":"No treatment found on the specified date","treatment_day10":"ANTI_B Fluid","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":"O","30day":null,"60day":null},
    // {"id":6,"in_time":"2015-07-15 19:42:00","ou_time":"2015-07-22 08:30:18","inno":6628,"death_dt":"2015-07-22 08:30:00","total_treat_days":8,"duration_days":7,"treatment_day1":"Steroid","treatment_day10":"No treatment found on the specified date","treatment_day30":"No treatment found on the specified date","treatment_day60":"No treatment found on the specified date","1day":"O","10day":null,"30day":null,"60day":null},
];

const DataTable = ({selectRow}) => {
    const handleRowClick = (params) => {
        selectRow(params.row); // 선택된 행 데이터를 부모 컴포넌트로 전달
    };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowClick={handleRowClick}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}

export default DataTable;
