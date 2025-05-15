import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumbs }) => {
    const styledBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
        return breadcrumb.to ? (
          <Link to={breadcrumb.to}  key={index}>
            <Chip label={breadcrumb.label} style={{backgroundColor:"transparent" }} clickable />
          </Link>
        ) : (
          <Chip key={index} label={breadcrumb.label} style={{backgroundColor:"transparent" }} deleteIcon={breadcrumb.icon} />
        );
      });
      return (
        <Stack spacing={2}  direction={"row-reverse"}>
          <Breadcrumbs
            separator={<NavigateBeforeIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {styledBreadcrumbs}
          </Breadcrumbs>
        </Stack>
      );
}

export default Breadcrumb;
