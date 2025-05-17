import { FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

export const actionsAddReservationContainer = (handleShowRoadSign) =>  ([
  {
    label: 'عرض',
    icon: <FaEye />,
    color: '#289FBF',
    onClick: handleShowRoadSign
  }
]);


export const actionsAdminsContainer = (handleShowAdmin , handleShowEdit , handleShowDelete) => (
  [
        {
            label: 'View',
            icon: <FaEye />,
            color: '#289FBF',
            onClick: handleShowAdmin
        },
        {
            label: 'Edit',
            icon: <EditOutlinedIcon />,
            color: 'orange',
            onClick: handleShowEdit
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            color: 'red',
            onClick: (row) => handleShowDelete(row.id)
        }
    ]
 )