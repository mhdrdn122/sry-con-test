import React from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

/**
 * DynamicSkeleton component
 * Props:
 *  - variant: 'text' | 'rectangular' | 'circular'
 *  - width: number|string
 *  - height: number|string
 *  - count: number (for multiple lines)
 *  - animation: 'pulse' | 'wave' | false
 *  - style: additional CSS styles
 */
const DynamicSkeleton = ({
  variant = 'text',
  width = '100%',
  height = '1rem',
  count = 1,
  animation = 'wave',
  style = {},
  ...rest
}) => {
  const theme = useTheme();
  const items = Array.from({ length: count });

  return (
    <Box display="flex" flexDirection="column" gap={1} {...rest}>
      {items.map((_, idx) => (
        <Skeleton
          key={idx}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          sx={{ backgroundColor: theme.palette.background.paper, ...style }}
        />
      ))}
    </Box>
  );
};


export default DynamicSkeleton;
