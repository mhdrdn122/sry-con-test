import { Box, Skeleton } from "@mui/material";
import DynamicSkeleton from "./DynamicSkeleton";

/**
 * PageContentSkeleton component
 * Illustrates skeletons for page title, subtitle, and a responsive table.
 */
const PageContentSkeleton = () => (
  <Box p={2} sx={{direction:"rtl"}}>
    {/* Main Title */}
    <DynamicSkeleton variant="text" width="30%" height={40} count={1} />

    {/* Sub Title */}
    <Box mt={1}>
      <DynamicSkeleton variant="text" width="20%" height={28} count={1} />
    </Box>

     {/* Table Skeleton */}
    <Box  width="100%" mt={4} overflow="auto">
      <Box sx={{border:"none"}} component="table" width="100%" borderCollapse="collapse">
        {/* Table Header */}
        <Box component="thead" display="table-header-group">
          <Box component="tr" display="table-row">
            {[ 'Name', 'Email', 'Role', 'Status' ].map((_, i) => (
              <Box
                key={i}
                component="th"
                display="table-cell"
                px={2}
                py={1.5}
              >
                <Skeleton variant="text" width="80%" height={24} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Table Rows */}
        <Box component="tbody" display="table-row-group">
          {Array.from({ length: 5 }).map((_, row) => (
            <Box key={row} component="tr" display="table-row">
              {[0, 1, 2, 3].map((col) => (
                <Box
                  key={col}
                  component="td"
                  display="table-cell"
                  px={2}
                  py={1.2}
                >
                  <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      </Box>
  </Box>
);

export default PageContentSkeleton