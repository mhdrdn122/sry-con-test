import React, { useEffect } from 'react'
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
} from "@mui/material"; 
import { useParams } from 'react-router-dom'
import { useShowUserContractsQuery } from '../../../redux/slice/super_admin/users/usersApi';
import { Spinner } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaDownload } from "react-icons/fa";
import Header from '../../../utils/Header';

const UserContracts = () => {
    const params=useParams();
    
       const {
            data: oneContract,
            isFetching,
            error,
            isLoading: loading,
            isSuccess: isSuccessShowOne,
        } = useShowUserContractsQuery(params.id, { skip: !params.id });
        
        const handleDownload = (contract) => {
            if (!contract?.url) {
                alert("No file URL available.");
                return;
            }
            const link = document.createElement("a");
            link.href = contract.url;
            link.download = contract.url.split('/').pop(); // Extract filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
  return (
    <div>
        <Header 
            heading={"كافة العقود"}
        />
        <div className="table-responsive table_container">
        <table className="table" dir="rtl">
          <thead>
            <tr>
              <th className="col"> رقم العقد </th>
              <th className="col"> نوع العقد </th>
              <th className="col"> تاريخ العقد </th>
              <th className="col-2">الحدث </th>
            </tr>
          </thead>
          {isFetching ? (
            <tbody>
              <tr>
                <td colSpan="6">
                  <div className="my-4 text-center">
                    <p className="mb-2">جار التحميل</p>
                    <Spinner
                      className="m-auto"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan="6">
                  <p className="my-5">{error.data?.message}</p>
                </td>
              </tr>
            </tbody>
          ) 
          : (
          <tbody>
              {oneContract && oneContract.data && oneContract.data.length > 0 ? (
                oneContract.data.map((contract, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: "center" }}>{contract.number|| '....'}</td>
                    <td style={{ textAlign: "center" }}>{contract.type || '....'} </td>
                    <td style={{ textAlign: "center" }}>
                      {( contract.date) || '....'}
                    </td>
                    <td className="">
                      {
                        <Tooltip placement='top-start' title="عرض">
                        <IconButton 
                          sx={{ color: "#000" }}
                          onClick={() => handleDownload(contract)}
                          disabled={isFetching || loading} // Disable while fetching data
                        >
                          <FaDownload  />
                        </IconButton>
                        </Tooltip>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <p className="my-5">لا توجد بيانات</p>
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
   )
}

export default UserContracts